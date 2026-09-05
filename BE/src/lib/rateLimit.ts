import { config } from '../config';

type Stamps = number[];
const perMin = new Map<string, Stamps>();
const perHour = new Map<string, Stamps>();
let global: Stamps = [];

function prune(arr: Stamps, windowMs: number): Stamps {
  const now = Date.now();
  return arr.filter((t) => now - t < windowMs);
}

export type LimitOk = { ok: true };
export type LimitHit = { ok: false; retry_after: number; scope: 'user_min' | 'user_hour' | 'global_min' };
export function checkRate(key: string): LimitOk | LimitHit {
  const now = Date.now();
  global = prune(global, 60_000);
  if (global.length >= config.rate.globalPerMin) {
    const oldest = global[0] ?? now;
    return { ok: false, retry_after: Math.ceil((oldest + 60_000 - now) / 1000), scope: 'global_min' };
  }
  const m = prune(perMin.get(key) ?? [], 60_000);
  if (m.length >= config.rate.userPerMin) {
    const oldest = m[0] ?? now;
    return { ok: false, retry_after: Math.ceil((oldest + 60_000 - now) / 1000), scope: 'user_min' };
  }
  const h = prune(perHour.get(key) ?? [], 3_600_000);
  if (h.length >= config.rate.userPerHour) {
    const oldest = h[0] ?? now;
    return { ok: false, retry_after: Math.ceil((oldest + 3_600_000 - now) / 1000), scope: 'user_hour' };
  }
  m.push(now);
  h.push(now);
  global.push(now);
  perMin.set(key, m);
  perHour.set(key, h);
  return { ok: true };
}
