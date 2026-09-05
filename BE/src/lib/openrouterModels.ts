import fs from 'node:fs';
import path from 'node:path';
import { config } from '../config';

export type FreeModel = { id: string; context_length: number };
export type SwitchEvent = {
  at: string;
  from: string | null;
  to: string | null;
  reason: string;
  http_status: number | null;
  strike: number;
  cooldown_until: string | null;
};

const COOLDOWN_FIRST_MS = 10 * 60 * 1000; // strike ke-1: 10 menit
const COOLDOWN_SECOND_MS = 6 * 60 * 60 * 1000; // strike ke-2: 6 jam
const FETCH_TIMEOUT_MS = 20_000;
const RING_MAX = 50;

type CooldownEntry = { strikes: number; cooldownUntil: number; reason: string; updatedAt: number };

const cooldowns = new Map<string, CooldownEntry>();
const switches: SwitchEvent[] = [];
let freeList: FreeModel[] = [];
let fetchedAt: string | null = null;
let expiresAtMs = 0;
let stale = true;
let activeModelId: string | null = null;
let inflight: Promise<void> | null = null;
let timer: NodeJS.Timeout | null = null;

function cacheDir(): string {
  // src/lib -> BE/.cache  |  dist/lib -> BE/.cache
  return path.join(__dirname, '..', '..', '.cache');
}
function cacheFile(): string {
  return path.join(cacheDir(), 'openrouter-models.json');
}
function logFile(): string {
  return path.join(cacheDir(), 'model-switches.log');
}

function ttlMs(): number {
  return config.openrouter.modelsTtlH * 3600 * 1000;
}

export function preferTokens(): string[] {
  return config.openrouter.prefer;
}

function rankOf(id: string): number {
  const low = id.toLowerCase();
  const toks = preferTokens();
  for (let i = 0; i < toks.length; i++) {
    if (toks[i] && low.includes(toks[i])) return i;
  }
  return Number.MAX_SAFE_INTEGER;
}

function sortFree(list: FreeModel[]): FreeModel[] {
  return [...list].sort((a, b) => {
    const r = rankOf(a.id) - rankOf(b.id);
    if (r !== 0) return r;
    const c = (b.context_length || 0) - (a.context_length || 0);
    if (c !== 0) return c;
    return a.id.localeCompare(b.id);
  });
}

/** FREE-ONLY: harga 0/0 ATAU suffix :free / -free. */
export function isFreeModel(id: string, pricing?: { prompt?: string; completion?: string }): boolean {
  const p = pricing?.prompt === '0' || pricing?.prompt === '0.0';
  const c = pricing?.completion === '0' || pricing?.completion === '0.0';
  if (pricing && p && c) return true;
  return /:free$/i.test(id) || /-free/i.test(id);
}

function recordSwitch(ev: Omit<SwitchEvent, 'at'>): void {
  const full: SwitchEvent = { ...ev, at: new Date().toISOString() };
  switches.unshift(full);
  while (switches.length > RING_MAX) switches.pop();
  try {
    fs.mkdirSync(cacheDir(), { recursive: true });
    fs.appendFileSync(logFile(), JSON.stringify(full) + '\n', 'utf8');
  } catch {
    // log file best-effort: jangan pernah menggagalkan chat
  }
}

export function isCooling(id: string, now = Date.now()): boolean {
  const e = cooldowns.get(id);
  return !!e && now < e.cooldownUntil;
}

function setActive(id: string | null, reason: string, extra?: Partial<SwitchEvent>): void {
  if (id === activeModelId) return;
  const from = activeModelId;
  activeModelId = id;
  recordSwitch({
    from,
    to: id,
    reason,
    http_status: extra?.http_status ?? null,
    strike: extra?.strike ?? 0,
    cooldown_until: extra?.cooldown_until ?? null,
  });
}

/** Pilih free terbaik yang tidak sedang cooldown. */
export function pickBestFree(exclude?: Set<string>): FreeModel | null {
  const now = Date.now();
  for (const m of sortFree(freeList)) {
    if (exclude?.has(m.id)) continue;
    if (isCooling(m.id, now)) continue;
    return m;
  }
  return null;
}

/** Model aktif kaki OpenRouter (free-only). Fallback ke env default bila list kosong. */
export function getActiveOpenRouterModel(): string | null {
  const now = Date.now();
  if (activeModelId && !isCooling(activeModelId, now)) {
    if (freeList.length === 0) return activeModelId;
    if (freeList.some((m) => m.id === activeModelId)) return activeModelId;
  }
  const best = pickBestFree();
  if (best) {
    setActive(best.id, activeModelId ? 'auto-reselect' : 'startup-pick');
    return best.id;
  }
  return activeModelId ?? config.openrouter.model ?? null;
}

export function reportModelSuccess(modelId: string): void {
  if (cooldowns.delete(modelId)) {
    // sukses me-reset strike
  }
  if (!activeModelId) setActive(modelId, 'first-success');
}

export type FailureKind = 'not-found' | 'quota' | 'other';

export function classifyModelError(status?: number, text = ''): FailureKind {
  const t = `${status ?? ''} ${text}`.toLowerCase();
  if (
    status === 404 ||
    /no endpoints/i.test(t) ||
    /model not found/i.test(t) ||
    /decommissioned/i.test(t) ||
    /invalid model/i.test(t) ||
    /model .*not (available|supported)/i.test(t)
  ) {
    return 'not-found';
  }
  if (
    status === 402 ||
    status === 429 ||
    /quota/i.test(t) ||
    /rate.?limit/i.test(t) ||
    /insufficient/i.test(t) ||
    /credit/i.test(t)
  ) {
    return 'quota';
  }
  return 'other';
}

/**
 * Catat kegagalan satu model OpenRouter.
 * - not-found: eksklusi permanen sampai fetch berikut + picu refetch background.
 * - quota: strike 1 -> cooldown 10 mnt, strike 2 -> 6 jam. Ganti aktif + log switch.
 */
export function reportModelFailure(
  modelId: string,
  status?: number,
  text = '',
): { kind: FailureKind; strike: number; cooldownUntil: string | null; switchedTo: string | null } {
  const kind = classifyModelError(status, text);
  const now = Date.now();

  if (kind === 'not-found') {
    freeList = freeList.filter((m) => m.id !== modelId);
    cooldowns.delete(modelId);
    const next = pickBestFree();
    setActive(next ? next.id : null, 'model-gone-refetch', { http_status: status ?? null, strike: 0 });
    void refreshModelsNow('model-gone').catch(() => undefined);
    return { kind, strike: 0, cooldownUntil: null, switchedTo: next ? next.id : null };
  }

  if (kind === 'quota') {
    const prev = cooldowns.get(modelId);
    const strike = (prev?.strikes ?? 0) + 1;
    const ms = strike >= 2 ? COOLDOWN_SECOND_MS : COOLDOWN_FIRST_MS;
    const until = now + ms;
    cooldowns.set(modelId, { strikes: strike, cooldownUntil: until, reason: `quota:${status ?? '?'}`, updatedAt: now });
    let switchedTo: string | null = null;
    if (activeModelId === modelId) {
      const next = pickBestFree();
      switchedTo = next ? next.id : null;
      setActive(switchedTo, 'quota-cooldown-switch', {
        http_status: status ?? null,
        strike,
        cooldown_until: new Date(until).toISOString(),
      });
    }
    return { kind, strike, cooldownUntil: new Date(until).toISOString(), switchedTo };
  }

  return { kind, strike: 0, cooldownUntil: null, switchedTo: null };
}

type RawModel = {
  id: string;
  context_length?: number;
  pricing?: { prompt?: string; completion?: string };
};

async function fetchModels(): Promise<FreeModel[]> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(`${config.openrouter.baseUrl.replace(/\/$/, '')}/models`, {
      signal: ctrl.signal,
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) throw new Error(`models ${res.status}`);
    const json = (await res.json()) as { data?: RawModel[] };
    const arr = Array.isArray(json.data) ? json.data : [];
    return arr
      .filter((m) => m && typeof m.id === 'string' && isFreeModel(m.id, m.pricing))
      .map((m) => ({ id: m.id, context_length: Number(m.context_length) || 0 }));
  } finally {
    clearTimeout(t);
  }
}

function persistCache(): void {
  try {
    fs.mkdirSync(cacheDir(), { recursive: true });
    fs.writeFileSync(
      cacheFile(),
      JSON.stringify({ fetched_at: fetchedAt, free: freeList }, null, 2),
      'utf8',
    );
  } catch {
    // best-effort
  }
}

function loadCacheFile(): boolean {
  try {
    if (!fs.existsSync(cacheFile())) return false;
    const raw = JSON.parse(fs.readFileSync(cacheFile(), 'utf8')) as { fetched_at?: string; free?: FreeModel[] };
    if (!Array.isArray(raw.free) || raw.free.length === 0) return false;
    freeList = raw.free.filter((m) => m && typeof m.id === 'string');
    fetchedAt = raw.fetched_at ?? null;
    stale = true;
    return true;
  } catch {
    return false;
  }
}

/** Fetch + simpan (memory + file). Strike di-reset, cooldownUntil yang masih hidup dipertahankan. */
export async function refreshModelsNow(reason = 'manual'): Promise<{ count: number; active: string | null }> {
  if (inflight) {
    await inflight;
    return { count: freeList.length, active: activeModelId };
  }
  inflight = (async () => {
    const list = await fetchModels();
    const now = Date.now();
    // reset strike, pertahankan cooldown yang belum kedaluwarsa
    for (const [id, e] of cooldowns) {
      if (now >= e.cooldownUntil) cooldowns.delete(id);
      else cooldowns.set(id, { ...e, strikes: 0 });
    }
    freeList = list;
    fetchedAt = new Date().toISOString();
    expiresAtMs = now + ttlMs();
    stale = false;
    persistCache();
    const best = pickBestFree();
    if (best && best.id !== activeModelId) {
      setActive(best.id, reason === 'manual' ? 'manual-refresh' : `refresh-${reason}`, { strike: 0 });
    } else if (!best) {
      setActive(null, `refresh-empty-${reason}`, { strike: 0 });
    }
  })();
  try {
    await inflight;
  } finally {
    inflight = null;
  }
  return { count: freeList.length, active: activeModelId };
}

/** Pastikan ada data: memory -> file -> fetch bila kedaluwarsa. Tak pernah throw. */
export async function ensureModelsLoaded(): Promise<void> {
  if (freeList.length > 0 && Date.now() < expiresAtMs) return;
  if (freeList.length === 0) {
    if (loadCacheFile()) {
      if (fetchedAt) {
        const age = Date.now() - Date.parse(fetchedAt);
        if (Number.isFinite(age) && age < ttlMs()) {
          expiresAtMs = Date.parse(fetchedAt) + ttlMs();
          stale = false;
          const best = pickBestFree();
          if (best && !activeModelId) setActive(best.id, 'cache-pick');
          return;
        }
      }
    }
  }
  if (inflight) {
    await inflight.catch(() => undefined);
    return;
  }
  await refreshModelsNow('stale-or-empty').catch(() => undefined);
  if (freeList.length === 0 && !activeModelId && config.openrouter.model) {
    setActive(config.openrouter.model, 'env-fallback');
  }
}

export function startModelsAutoRefresh(): void {
  if (timer) return;
  void ensureModelsLoaded().catch(() => undefined);
  timer = setInterval(() => {
    void refreshModelsNow('scheduled-12h').catch(() => undefined);
  }, ttlMs());
  if (typeof timer.unref === 'function') timer.unref();
}

export function getModelsSnapshot(limit = 50): {
  active: string | null;
  free_count: number;
  fetched_at: string | null;
  expires_in_sec: number;
  stale: boolean;
  model_status: 'ok' | 'stale' | 'no-free' | 'all-cooldown';
  models: FreeModel[];
  cooldowns: Array<{ id: string; strikes: number; cooldown_until: string; reason: string }>;
  recent_switches: SwitchEvent[];
} {
  const now = Date.now();
  const liveCooldowns = [...cooldowns.entries()]
    .filter(([, e]) => now < e.cooldownUntil)
    .map(([id, e]) => ({ id, strikes: e.strikes, cooldown_until: new Date(e.cooldownUntil).toISOString(), reason: e.reason }));
  const status =
    freeList.length === 0 ? 'no-free' : liveCooldowns.length >= freeList.length ? 'all-cooldown' : stale ? 'stale' : 'ok';
  return {
    active: activeModelId,
    free_count: freeList.length,
    fetched_at: fetchedAt,
    expires_in_sec: Math.max(0, Math.round((expiresAtMs - now) / 1000)),
    stale,
    model_status: status,
    models: sortFree(freeList).slice(0, Math.max(1, Math.min(limit, 200))),
    cooldowns: liveCooldowns,
    recent_switches: switches.slice(0, 20),
  };
}

export function getRecentSwitches(): SwitchEvent[] {
  return [...switches];
}
