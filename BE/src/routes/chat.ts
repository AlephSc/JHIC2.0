import type { FastifyInstance, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { createHash, randomUUID } from 'node:crypto';
import { config } from '../config';
import { retrieve } from '../lib/retriever';
import { buildOfflineReply, buildSystemPrompt, checkInjection, FALLBACK_REPLY, matchSmalltalk } from '../lib/guard';
import { routeChat, type ChatMsg } from '../lib/miniRouter';
import { checkRate } from '../lib/rateLimit';
import { history, pushMsg } from '../lib/sessions';

const Body = z.object({
  session_id: z
    .string()
    .min(1)
    .max(64)
    .regex(/^[A-Za-z0-9_-]+$/, 'session_id hanya boleh huruf/angka/_/-'),
  message: z.string().min(1).max(1000),
});
type Body = z.infer<typeof Body>;

// Idempotency-Key: same key + same body -> replay, same key + diff body -> 409
const idem = new Map<string, { hash: string; res: unknown }>();

function bodyHash(b: Body): string {
  return createHash('sha256').update(JSON.stringify(b)).digest('hex');
}

function clientKey(req: FastifyRequest, body: Body): string {
  const uid = (req.headers['x-user-id'] as string | undefined)?.trim();
  if (uid) return `u:${uid}`;
  return `s:${req.ip}:${body.session_id}`;
}

async function handleChat(app: FastifyInstance, req: FastifyRequest, reply: unknown) {
  const r = reply as { code: (n: number) => { send: (b: unknown) => unknown }; send: (b: unknown) => unknown };
  const parsed = Body.safeParse((req as { body: unknown }).body);
  if (!parsed.success) {
    return r.code(400).send({
      error: { code: 'BAD_REQUEST', message: 'session_id/message tidak valid.', details: parsed.error.flatten() },
    });
  }
  const body = parsed.data;

  // Idempotency
  const idemKey = req.headers['idempotency-key'] as string | undefined;
  if (idemKey) {
    const prev = idem.get(`${clientKey(req, body)}:${idemKey}`);
    if (prev) {
      if (prev.hash === bodyHash(body)) return r.send(prev.res);
      return r.code(409).send({ error: { code: 'IDEMPOTENCY_CONFLICT', message: 'Idempotency-Key sudah dipakai dengan body berbeda.' } });
    }
  }

  // Rate limit 15/menit/user + global
  const lim = checkRate(clientKey(req, body));
  if (!lim.ok) {
    return r.code(429).send({
      error: {
        code: 'RATE_LIMITED',
        message:
          lim.scope === 'global_min'
            ? 'Server sedang padat. Coba lagi beberapa detik.'
            : 'Terlalu banyak chat. Tunggu sebentar ya.',
        retry_after: lim.retry_after,
        scope: lim.scope,
      },
    });
  }

  const now = new Date().toISOString();
  const finish = (payload: Record<string, unknown>) => {
    if (idemKey) idem.set(`${clientKey(req, body)}:${idemKey}`, { hash: bodyHash(body), res: payload });
    return r.send(payload);
  };

  // 1. Prompt injection -> abaikan perintah, anggap OOT
  if (checkInjection(body.message)) {
    pushMsg(body.session_id, { role: 'user', content: body.message, at: now });
    pushMsg(body.session_id, { role: 'assistant', content: FALLBACK_REPLY, at: now });
    return finish({
      data: {
        id: `msg_${randomUUID().slice(0, 8)}`,
        session_id: body.session_id,
        reply: FALLBACK_REPLY,
        sources: [],
        provider: 'local-guard',
        model: 'none',
        fallback: true,
        at: now,
      },
    });
  }

  // 2. Semi-lentur: salam prioritas sebelum retrieval
  const small = matchSmalltalk(body.message);
  if (small) {
    pushMsg(body.session_id, { role: 'user', content: body.message, at: now });
    pushMsg(body.session_id, { role: 'assistant', content: small, at: now });
    return finish({
      data: {
        id: `msg_${randomUUID().slice(0, 8)}`,
        session_id: body.session_id,
        reply: small,
        sources: [],
        provider: 'local-smalltalk',
        model: 'none',
        fallback: false,
        at: now,
      },
    });
  }

  // 3. Retrieval top-K + threshold gate (hemat quota LLM)
  const hits = retrieve(body.message, config.retrieval.topK).filter((h) => h.score >= config.retrieval.threshold);
  if (hits.length === 0) {
    pushMsg(body.session_id, { role: 'user', content: body.message, at: now });
    pushMsg(body.session_id, { role: 'assistant', content: FALLBACK_REPLY, at: now });
    return finish({
      data: {
        id: `msg_${randomUUID().slice(0, 8)}`,
        session_id: body.session_id,
        reply: FALLBACK_REPLY,
        sources: [],
        provider: 'local-fallback',
        model: 'none',
        fallback: true,
        at: now,
      },
    });
  }

  const context = hits.map((h, i) => `[${h.id} | skor ${h.score}] Q: ${h.item.q}\nA: ${h.item.a}`).join('\n\n');
  const messages: ChatMsg[] = [
    { role: 'system', content: buildSystemPrompt(context) },
    ...history(body.session_id)
      .slice(-6)
      .map((m) => ({ role: m.role, content: m.content }) as ChatMsg),
    { role: 'user', content: `Pertanyaan: ${body.message}\nJawab hanya dari konteks di atas.` },
  ];

  // 4. Mini-router auto-fallback, offline template bila semua mati
  try {
    const routed = await routeChat(messages);
    pushMsg(body.session_id, { role: 'user', content: body.message, at: now });
    pushMsg(body.session_id, { role: 'assistant', content: routed.reply, at: now });
    return finish({
      data: {
        id: `msg_${randomUUID().slice(0, 8)}`,
        session_id: body.session_id,
        reply: routed.reply,
        sources: hits.map((h) => ({ id: h.id, score: h.score })),
        provider: routed.provider,
        model: routed.model,
        fallback: routed.fallback,
        at: now,
      },
    });
  } catch {
    if (!config.offlineFallback) {
      return r.code(502).send({ error: { code: 'LLM_UNAVAILABLE', message: 'Semua provider LLM gagal. Coba lagi 20 detik.' } });
    }
    const offline = buildOfflineReply(hits);
    pushMsg(body.session_id, { role: 'user', content: body.message, at: now });
    pushMsg(body.session_id, { role: 'assistant', content: offline, at: now });
    return finish({
      data: {
        id: `msg_${randomUUID().slice(0, 8)}`,
        session_id: body.session_id,
        reply: offline,
        sources: hits.map((h) => ({ id: h.id, score: h.score })),
        provider: 'local-offline',
        model: 'none',
        fallback: true,
        at: now,
      },
    });
  }
}

export async function chatRoutes(app: FastifyInstance): Promise<void> {
  // Kanonis resource-oriented: POST /conversations/:id/messages
  app.post('/conversations/:id/messages', async (req, reply) => {
    const params = req.params as { id?: string };
    if (params.id) {
      if (typeof req.body !== 'object' || req.body === null) (req as { body: unknown }).body = {};
      (req.body as Record<string, unknown>).session_id = params.id;
    }
    return handleChat(app, req, reply);
  });
  // Alias simpel untuk FE teman + web tester: POST /chat
  app.post('/chat', async (req, reply) => handleChat(app, req, reply));
}
