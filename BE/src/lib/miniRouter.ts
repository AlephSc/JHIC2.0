import { config, defaultProviders, type ProviderDef } from '../config';

/** Token-bucket sederhana per provider (in-memory, cukup untuk prototype). */
const buckets = new Map<string, number[]>();

function prune(id: string, windowMs: number): number[] {
  const now = Date.now();
  const arr = (buckets.get(id) ?? []).filter((t) => now - t < windowMs);
  buckets.set(id, arr);
  return arr;
}

export function providerAvailable(p: ProviderDef): boolean {
  if (!p.apiKey) return false;
  const arr = prune(p.id, 60_000);
  return arr.length < p.rpm;
}

export function markUse(p: ProviderDef): void {
  const arr = buckets.get(p.id) ?? [];
  arr.push(Date.now());
  buckets.set(p.id, arr);
}

export function routerStatus(): Array<{ id: string; model: string; rpm: number; used_min: number; active: boolean }> {
  return defaultProviders().map((p) => {
    const used = prune(p.id, 60_000).length;
    return { id: p.id, model: p.model, rpm: p.rpm, used_min: used, active: !!p.apiKey && used < p.rpm };
  });
}

export type ChatMsg = { role: 'system' | 'user' | 'assistant'; content: string };

export type RouteResult = { reply: string; provider: string; model: string; fallback: boolean };

async function callOpenAICompatible(p: ProviderDef, messages: ChatMsg[], timeoutMs = 25_000): Promise<string> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${p.apiKey}`,
    };
    if (p.id === 'openrouter') {
      headers['HTTP-Referer'] = config.app.url;
      headers['X-Title'] = config.app.title;
    }
    const res = await fetch(`${p.baseUrl.replace(/\/$/, '')}/chat/completions`, {
      method: 'POST',
      headers,
      signal: ctrl.signal,
      body: JSON.stringify({ model: p.model, messages, temperature: 0.3, max_tokens: 400 }),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      const err = new Error(`provider ${p.id} ${res.status}: ${text.slice(0, 200)}`) as Error & { status?: number };
      err.status = res.status;
      throw err;
    }
    const json = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
    const content = json.choices?.[0]?.message?.content?.trim();
    if (!content) throw new Error(`provider ${p.id}: empty reply`);
    return content;
  } finally {
    clearTimeout(t);
  }
}

/**
 * Auto-fallback: coba provider sesuai prioritas.
 * Skip yang tanpa key atau sudah penuh RPM-nya (tanpa menunggu 429).
 */
export async function routeChat(messages: ChatMsg[]): Promise<RouteResult> {
  const chain = defaultProviders();
  let tried = 0;
  const errors: string[] = [];
  for (const p of chain) {
    if (!p.apiKey) {
      errors.push(`${p.id}: no-key`);
      continue;
    }
    if (!providerAvailable(p)) {
      errors.push(`${p.id}: rpm-full`);
      continue;
    }
    tried++;
    try {
      markUse(p);
      const reply = await callOpenAICompatible(p, messages);
      return { reply, provider: p.id, model: p.model, fallback: tried > 1 };
    } catch (e) {
      errors.push(`${p.id}: ${(e as Error).message.slice(0, 120)}`);
      continue;
    }
  }
  throw new Error(`all-providers-failed: ${errors.join(' | ') || 'no providers configured'}`);
}
