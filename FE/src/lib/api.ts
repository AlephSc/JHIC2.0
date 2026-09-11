// API client resilient: timeout + klasifikasi down vs validasi.
// down = network/timeout/5xx/health fail → antre/cache, jangan tampilkan "backend down".
// bukan down = 400/409/422/429 → tampilkan pesan form normal.

import { beBaseUrl, loadConfig } from './config';

export type ApiError = {
  httpStatus: number;
  code: string;
  message: string;
  retryAfter?: number;
  isDown: boolean; // true → masuk jalur fallback (cache/antre)
};

async function fetchWithTimeout(url: string, init: RequestInit, ms = 8000): Promise<Response> {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, { ...init, signal: ctrl.signal });
  } finally {
    clearTimeout(t);
  }
}

function toApiError(status: number, body: unknown, e?: unknown): ApiError {
  const err = (body as { error?: { code?: string; message?: string; retry_after?: number } })?.error;
  if (status === 0) {
    return {
      httpStatus: 0,
      code: 'NETWORK_DOWN',
      message: 'Koneksi ke pusat data lambat. Data kamu aman, coba lagi otomatis.',
      isDown: true,
    };
  }
  if (status >= 500) {
    return {
      httpStatus: status,
      code: err?.code ?? 'SERVER_BUSY',
      message: 'Pusat data sedang sibuk. Menampilkan data terakhir / menyimpan antrean.',
      isDown: true,
    };
  }
  return {
    httpStatus: status,
    code: err?.code ?? 'REQUEST_FAILED',
    message: err?.message ?? (e instanceof Error ? e.message : 'Permintaan gagal.'),
    retryAfter: err?.retry_after,
    isDown: false,
  };
}

export async function apiPost<T>(path: string, body: unknown, opts?: { timeoutMs?: number; idempotencyKey?: string; userId?: string }): Promise<T> {
  const base = beBaseUrl();
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (opts?.idempotencyKey) headers['Idempotency-Key'] = opts.idempotencyKey;
  if (opts?.userId) headers['X-User-Id'] = opts.userId;
  let res: Response;
  try {
    res = await fetchWithTimeout(`${base}${path}`, { method: 'POST', headers, body: JSON.stringify(body) }, opts?.timeoutMs ?? 8000);
  } catch {
    throw toApiError(0, null);
  }
  const json = await res.json().catch(() => null);
  if (!res.ok) throw toApiError(res.status, json);
  return json as T;
}

export async function apiGet<T>(path: string, query?: Record<string, string>, timeoutMs = 6000): Promise<T> {
  const base = beBaseUrl();
  const qs = query ? `?${new URLSearchParams(query).toString()}` : '';
  let res: Response;
  try {
    res = await fetchWithTimeout(`${base}${path}`, { method: 'GET' }, timeoutMs);
  } catch {
    throw toApiError(0, null);
  }
  const json = await res.json().catch(() => null);
  if (!res.ok) throw toApiError(res.status, json);
  return json as T;
}

export type HealthSnapshot = {
  ok: boolean;
  at: string;
  faqCount?: number;
  checkedBase: string;
};

const HEALTH_KEY = 'jhic2.health.last';

export async function checkHealth(): Promise<HealthSnapshot> {
  const cfg = loadConfig();
  try {
    const json = await apiGet<{ data: { status: string; faq_count?: number } }>('/health', undefined, 5000);
    const snap: HealthSnapshot = { ok: json?.data?.status === 'ok', at: new Date().toISOString(), faqCount: json?.data?.faq_count, checkedBase: beBaseUrl(cfg) };
    try {
      localStorage.setItem(HEALTH_KEY, JSON.stringify(snap));
    } catch { /* abaikan */ }
    return snap;
  } catch {
    const snap: HealthSnapshot = { ok: false, at: new Date().toISOString(), checkedBase: beBaseUrl(cfg) };
    try {
      localStorage.setItem(HEALTH_KEY, JSON.stringify(snap));
    } catch { /* abaikan */ }
    return snap;
  }
}

export function lastHealth(): HealthSnapshot | null {
  try {
    const raw = localStorage.getItem(HEALTH_KEY);
    return raw ? (JSON.parse(raw) as HealthSnapshot) : null;
  } catch {
    return null;
  }
}
