import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { config } from '../config';
import { ensureModelsLoaded, getModelsSnapshot, refreshModelsNow } from '../lib/openrouterModels';

const ListQuery = z.object({
  limit: z.coerce.number().int().min(1).max(200).optional().default(50),
  cursor: z.string().max(200).optional().default(''),
  q: z.string().max(200).optional().default(''),
});

function decodeCursor(cursor: string): number {
  if (!cursor) return 0;
  try {
    const n = Number(Buffer.from(cursor, 'base64url').toString('utf8'));
    return Number.isFinite(n) && n >= 0 ? Math.floor(n) : 0;
  } catch {
    return 0;
  }
}
function encodeCursor(offset: number): string {
  return Buffer.from(String(offset), 'utf8').toString('base64url');
}

/**
 * GET /api/v1/models — daftar model GRATIS OpenRouter (free-only) + status + cooldown + log switch.
 * Paginated dari hari pertama (cursor opaque).
 * POST /api/v1/admin/models/refresh — paksa fetch ulang (butuh X-Admin-Token, naturally idempotent).
 */
export async function modelsRoutes(app: FastifyInstance): Promise<void> {
  app.get('/models', async (req, reply) => {
    const parsed = ListQuery.safeParse(req.query);
    if (!parsed.success) {
      return reply.code(400).send({ error: { code: 'BAD_QUERY', message: 'Parameter q/limit/cursor tidak valid.' } });
    }
    await ensureModelsLoaded().catch(() => undefined);
    const snap = getModelsSnapshot(200);
    const needle = parsed.data.q.trim().toLowerCase();
    const filtered = needle ? snap.models.filter((m) => m.id.toLowerCase().includes(needle)) : snap.models;
    const offset = decodeCursor(parsed.data.cursor);
    const page = filtered.slice(offset, offset + parsed.data.limit);
    const next = offset + parsed.data.limit;
    return {
      data: page,
      paging: {
        has_more: next < filtered.length,
        next_cursor: next < filtered.length ? encodeCursor(next) : null,
        total: filtered.length,
      },
      meta: {
        active: snap.active,
        free_count: snap.free_count,
        fetched_at: snap.fetched_at,
        expires_in_sec: snap.expires_in_sec,
        stale: snap.stale,
        model_status: snap.model_status,
        cooldowns: snap.cooldowns,
        recent_switches: snap.recent_switches,
      },
    };
  });

  app.post('/admin/models/refresh', async (req, reply) => {
    if (!config.adminToken) {
      return reply.code(403).send({
        error: { code: 'ADMIN_DISABLED', message: 'Refresh manual nonaktif: ADMIN_TOKEN belum diisi di .env.' },
      });
    }
    const token = (req.headers['x-admin-token'] as string | undefined) ?? '';
    if (token !== config.adminToken) {
      return reply.code(401).send({ error: { code: 'UNAUTHORIZED', message: 'X-Admin-Token salah.' } });
    }
    const snap = await refreshModelsNow('manual').catch(() => null);
    if (!snap) {
      return reply.code(502).send({ error: { code: 'REFRESH_FAILED', message: 'Fetch /models gagal, cache lama tetap dipakai.' } });
    }
    const full = getModelsSnapshot(5);
    return { data: { refreshed: true, ...snap, model_status: full.model_status, recent_switches: full.recent_switches } };
  });
}
