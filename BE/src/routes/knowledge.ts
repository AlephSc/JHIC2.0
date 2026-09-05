import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import faq from '../data/faq.json';

const Item = z.object({
  id: z.string(),
  q: z.string(),
  a: z.string(),
  tags: z.array(z.string()),
});
type Item = z.infer<typeof Item>;
const items = faq as Item[];

const Query = z.object({
  q: z.string().max(200).optional().default(''),
  limit: z.coerce.number().int().min(1).max(50).optional().default(10),
  cursor: z.string().max(200).optional().default(''),
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
 * GET /api/v1/knowledge — list endpoint sudah paginated dari hari pertama
 * (cursor opaque, bukan offset mentah — sesuai skill awesome-api-design).
 */
export async function knowledgeRoutes(app: FastifyInstance): Promise<void> {
  app.get('/knowledge', async (req, reply) => {
    const parsed = Query.safeParse(req.query);
    if (!parsed.success) {
      return reply.code(400).send({
        error: { code: 'BAD_QUERY', message: 'Parameter q/limit/cursor tidak valid.' },
      });
    }
    const { q, limit, cursor } = parsed.data;
    const needle = q.trim().toLowerCase();
    const filtered = needle
      ? items.filter((f) => `${f.q} ${f.a} ${f.tags.join(' ')}`.toLowerCase().includes(needle))
      : items;
    const offset = decodeCursor(cursor);
    const page = filtered.slice(offset, offset + limit);
    const next = offset + limit;
    return {
      data: page,
      paging: {
        has_more: next < filtered.length,
        next_cursor: next < filtered.length ? encodeCursor(next) : null,
        total: filtered.length,
      },
    };
  });
}
