import Fuse from 'fuse.js';
import faq from '../data/faq.json';

export type FaqItem = { id: string; q: string; a: string; tags: string[] };
export type Hit = { id: string; score: number; item: FaqItem };

const items = faq as FaqItem[];

const fuse = new Fuse(items, {
  includeScore: true,
  threshold: 0.55,
  ignoreLocation: true,
  keys: [
    { name: 'q', weight: 0.6 },
    { name: 'a', weight: 0.25 },
    { name: 'tags', weight: 0.15 },
  ],
});

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\u00C0-\u024F\u1E00-\u1EFF ]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

function tokenOverlap(query: string, doc: string): number {
  const q = new Set(norm(query).split(' ').filter((w) => w.length > 2));
  if (q.size === 0) return 0;
  const d = new Set(norm(doc).split(' '));
  let hit = 0;
  for (const w of q) if (d.has(w)) hit++;
  return hit / q.size;
}

/** Retrieval top-K + threshold. Skor gabungan Fuse + overlap kata. */
export function retrieve(query: string, topK = 3): Hit[] {
  const q = query.trim();
  if (!q) return [];
  const raw = fuse.search(q, { limit: Math.max(topK * 3, topK) });
  const scored: Hit[] = raw.map((r) => {
    const fuseScore = 1 - (r.score ?? 1); // 0..1, makin besar makin mirip
    const overlap = tokenOverlap(q, `${r.item.q} ${r.item.a} ${r.item.tags.join(' ')}`);
    const score = 0.65 * fuseScore + 0.35 * overlap;
    return { id: r.item.id, score: round3(score), item: r.item };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK);
}

export function getById(id: string): FaqItem | undefined {
  return items.find((f) => f.id === id);
}

export function countFaq(): number {
  return items.length;
}

function round3(n: number): number {
  return Math.round(n * 1000) / 1000;
}
