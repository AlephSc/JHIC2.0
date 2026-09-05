import { config, defaultProviders, type ProviderDef } from '../config';
import {
  ensureModelsLoaded,
  getActiveOpenRouterModel,
  getModelsSnapshot,
  reportModelFailure,
  reportModelSuccess,
} from './openrouterModels';

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
  const snap = getModelsSnapshot(1);
  return defaultProviders().map((p) => {
    const used = prune(p.id, 60_000).length;
    const model = p.id === 'openrouter' ? (snap.active ?? p.model) : p.model;
    return { id: p.id, model, rpm: p.rpm, used_min: used, active: !!p.apiKey && used < p.rpm };
  });
}

export type ChatMsg = { role: 'system' | 'user' | 'assistant'; content: string };

export type RouteResult = { reply: string; provider: string; model: string; fallback: boolean };

async function callOpenAICompatible(
  p: ProviderDef,
  messages: ChatMsg[],
  timeoutMs = 25_000,
  modelOverride?: string,
): Promise<string> {
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
    const model = modelOverride ?? p.model;
    const res = await fetch(`${p.baseUrl.replace(/\/$/, '')}/chat/completions`, {
      method: 'POST',
      headers,
      signal: ctrl.signal,
      body: JSON.stringify({ model, messages, temperature: 0.3, max_tokens: 400 }),
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

/** Kaki OpenRouter: free-only + auto-switch + cooldown (maks 2 percobaan per chat). */
async function tryOpenRouter(p: ProviderDef, messages: ChatMsg[]): Promise<{ reply: string; model: string } | null> {
  await ensureModelsLoaded().catch(() => undefined);
  let model = getActiveOpenRouterModel() ?? p.model;
  for (let attempt = 0; attempt < 2; attempt++) {
    markUse(p);
    try {
      const reply = await callOpenAICompatible(p, messages, 25_000, model);
      reportModelSuccess(model);
      return { reply, model };
    } catch (e) {
      const status = (e as Error & { status?: number }).status;
      const info = reportModelFailure(model, status, (e as Error).message);
      if (info.kind === 'not-found' && info.switchedTo) {
        // model hilang -> refetch sudah dipicu di reportModelFailure, coba model baru sekali
        model = info.switchedTo;
        continue;
      }
      if (info.kind === 'quota' && info.switchedTo && attempt === 0) {
        // rate-limit/kuota -> cooldown + switch, coba model free berikut sekali
        model = info.switchedTo;
        continue;
      }
      return null;
    }
  }
  return null;
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
    if (p.id === 'openrouter') {
      const hit = await tryOpenRouter(p, messages);
      if (hit) return { reply: hit.reply, provider: p.id, model: hit.model, fallback: tried > 1 };
      errors.push(`${p.id}: free-models-exhausted`);
      continue;
    }
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
