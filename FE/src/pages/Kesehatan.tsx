import { useState } from 'react';
import { beBaseUrl, clearRuntimeOverride, loadConfig, setRuntimeOverride } from '../lib/config';
import { checkHealth, lastHealth } from '../lib/api';

// Halaman untuk ganti IP/port BE tanpa rebuild + tes koneksi.
// BE dan FE bisa beda device: edit config.js ATAU isi form ini (sementara, memory).
export default function Kesehatan() {
  const [cfg, setCfg] = useState(loadConfig());
  const [health, setHealth] = useState(() => lastHealth());
  const [busy, setBusy] = useState(false);

  const save = (patch: Partial<ReturnType<typeof loadConfig>>) => setCfg(setRuntimeOverride(patch));

  const test = async () => {
    setBusy(true);
    setHealth(await checkHealth());
    setBusy(false);
  };

  return (
    <div className="space-y-4 max-w-2xl">
      <h1 className="text-2xl font-extrabold">Kesehatan & Konfigurasi</h1>
      <p className="text-sm text-slate-600">BASE aktif: <code className="bg-slate-100 px-1 rounded">{beBaseUrl(cfg)}</code></p>
      <div className="rounded-2xl border p-4 grid gap-3 text-sm">
        <div className="grid grid-cols-2 gap-3">
          <label>Protokol
            <select value={cfg.beProtocol} onChange={(e) => save({ beProtocol: e.target.value as 'http' | 'https' })} className="mt-1 w-full border rounded-lg px-2 py-2">
              <option value="http">http</option>
              <option value="https">https</option>
            </select>
          </label>
          <label>Base path
            <input value={cfg.beBasePath} onChange={(e) => save({ beBasePath: e.target.value })} className="mt-1 w-full border rounded-lg px-2 py-2" />
          </label>
        </div>
        <label>IP / Host BE (terpisah)
          <input value={cfg.beHost} onChange={(e) => save({ beHost: e.target.value })} placeholder="localhost / 192.168.1.10 / domain" className="mt-1 w-full border rounded-lg px-3 py-2" />
        </label>
        <label>Port BE (terpisah, kosongkan untuk https/443)
          <input value={cfg.bePort} onChange={(e) => save({ bePort: e.target.value })} placeholder="3000" className="mt-1 w-full border rounded-lg px-3 py-2" />
        </label>
        <label>CDN base (opsional)
          <input value={cfg.cdnBaseUrl} onChange={(e) => save({ cdnBaseUrl: e.target.value })} placeholder="https://..." className="mt-1 w-full border rounded-lg px-3 py-2" />
        </label>
        <div className="flex gap-2">
          <button onClick={test} disabled={busy} className="bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-bold">{busy ? 'Mengetes...' : 'Tes GET /health'}</button>
          <button onClick={() => setCfg(clearRuntimeOverride())} className="border px-4 py-2 rounded-full text-sm">Reset override</button>
        </div>
        <p className="text-xs text-slate-500">Permanen: edit <code>FE/public/config.js</code> di host (Vercel/CF/GH) lalu reload. Sementara: form ini (hilang saat refresh bila tidak disimpan ke config.js).</p>
      </div>
      <div className="rounded-2xl border p-4 text-sm">
        <p className="font-bold">Hasil terakhir</p>
        {!health ? <p className="text-slate-500">Belum dites.</p> : (
          <p>{health.ok ? '✅ BE terjangkau' : '⚠️ BE tidak terjangkau — FE masuk mode antre/cache'} • {health.at} {health.faqCount != null && `• faq ${health.faqCount}`}</p>
        )}
      </div>
    </div>
  );
}
