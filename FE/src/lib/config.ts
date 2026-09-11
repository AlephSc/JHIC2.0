// Runtime config IP/port terpisah untuk FE.
// Prioritas: window.__APP_CONFIG__ (public/config.js, tanpa rebuild)
//         > import.meta.env (Vercel/CF dashboard, saat build)
//         > default localhost.
// BE bisa beda device: cukup edit config.js di host statis.

export interface AppConfig {
  beProtocol: 'http' | 'https';
  beHost: string;
  bePort: string; // "" = kosongkan untuk https/443 via domain
  beBasePath: string; // "/api/v1"
  cdnBaseUrl: string; // "" = pakai path lokal + fallback.svg
  waNumber: string; // nomor panitia darurat, cth "085649400339"
  waEmail: string;
  appVersion: string;
}

declare global {
  interface Window {
    __APP_CONFIG__?: Partial<AppConfig>;
    __APP_CONFIG_OVERRIDE__?: Partial<AppConfig>; // override sementara dari /kesehatan (memory)
  }
}

function env(name: string, fallback = ''): string {
  const v = (import.meta as unknown as { env: Record<string, string> }).env?.[name];
  return typeof v === 'string' && v.length > 0 ? v : fallback;
}

export function loadConfig(): AppConfig {
  const w = window.__APP_CONFIG__ ?? {};
  const o = window.__APP_CONFIG_OVERRIDE__ ?? {};
  const pick = (...vals: Array<string | undefined>): string => {
    for (const v of vals) if (typeof v === 'string' && v.length > 0) return v;
    return '';
  };
  const protocol = pick(o.beProtocol, w.beProtocol, env('VITE_BE_PROTOCOL'), 'http') as AppConfig['beProtocol'];
  const cfg: AppConfig = {
    beProtocol: protocol === 'https' ? 'https' : 'http',
    beHost: pick(o.beHost, w.beHost, env('VITE_BE_HOST'), 'localhost'),
    bePort: pick(o.bePort, w.bePort, env('VITE_BE_PORT'), '3000'),
    beBasePath: pick(o.beBasePath, w.beBasePath, env('VITE_BE_BASE_PATH'), '/api/v1'),
    cdnBaseUrl: pick(o.cdnBaseUrl, w.cdnBaseUrl, env('VITE_CDN_BASE_URL'), ''),
    waNumber: pick(o.waNumber, w.waNumber, env('VITE_WA_NUMBER'), '085649400339'),
    waEmail: pick(o.waEmail, w.waEmail, env('VITE_WA_EMAIL'), 'smktelkomdujbg@gmail.com'),
    appVersion: pick(o.appVersion, w.appVersion, env('VITE_APP_VERSION'), 'L0-full'),
  };
  if (!cfg.beBasePath.startsWith('/')) cfg.beBasePath = `/${cfg.beBasePath}`;
  return cfg;
}

/** http://host:port/base | https://domain/base (port kosong). */
export function beBaseUrl(cfg: AppConfig = loadConfig()): string {
  const host = cfg.beHost.trim();
  const port = cfg.bePort.trim();
  const base = cfg.beBasePath.replace(/\/$/, '');
  const withPort = port ? `:${port}` : '';
  return `${cfg.beProtocol}://${host}${withPort}${base}`;
}

export function setRuntimeOverride(patch: Partial<AppConfig>): AppConfig {
  window.__APP_CONFIG_OVERRIDE__ = { ...(window.__APP_CONFIG_OVERRIDE__ ?? {}), ...patch };
  return loadConfig();
}

export function clearRuntimeOverride(): AppConfig {
  window.__APP_CONFIG_OVERRIDE__ = {};
  return loadConfig();
}
