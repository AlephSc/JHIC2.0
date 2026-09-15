import { useState } from 'react';
import { beBaseUrl, clearRuntimeOverride, loadConfig, setRuntimeOverride } from '../lib/config';
import { checkHealth, lastHealth } from '../lib/api';

// Halaman untuk ganti IP/port BE tanpa rebuild + tes koneksi.
// BE dan FE bisa beda device: edit config.js ATAU isi form ini (sementara, memory).
// Style mengikuti Example: Lexend, navy judul, tombol navy pill, input gray-100 rounded.
const inp = 'mt-1.5 w-full bg-gray-100 rounded-xl px-3.5 py-2.5 text-sm font-normal outline-none focus:ring-2 ring-brand/30 border-0';

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
    <div className="space-y-5 max-w-2xl">
      <h1 className="text-3xl font-extrabold text-navy">Kesehatan & Konfigurasi</h1>
      <p className="text-sm text-body-text/80">BASE aktif: <code className="bg-gray-100 px-1.5 py-0.5 rounded">{beBaseUrl(cfg)}</code></p>
      <div className="rounded-3xl border border-line-soft p-6 grid gap-4 text-sm">
        <div className="grid grid-cols-2 gap-4">
          <label className="text-xs font-bold">Protokol
            <select value={cfg.beProtocol} onChange={(e) => save({ beProtocol: e.target.value as 'http' | 'https' })} className={inp}>
              <option value="http">http</option>
              <option value="https">https</option>
            </select>
          </label>
          <label className="text-xs font-bold">Base path
            <input value={cfg.beBasePath} onChange={(e) => save({ beBasePath: e.target.value })} className={inp} />
          </label>
        </div>
        <label className="text-xs font-bold">IP / Host BE (terpisah)
          <input value={cfg.beHost} onChange={(e) => save({ beHost: e.target.value })} placeholder="localhost / 192.168.1.10 / domain" className={inp} />
        </label>
        <label className="text-xs font-bold">Port BE (terpisah, kosongkan untuk https/443)
          <input value={cfg.bePort} onChange={(e) => save({ bePort: e.target.value })} placeholder="3000" className={inp} />
        </label>
        <label className="text-xs font-bold">CDN base (opsional)
          <input value={cfg.cdnBaseUrl} onChange={(e) => save({ cdnBaseUrl: e.target.value })} placeholder="https://..." className={inp} />
        </label>
        <div className="flex gap-3">
          <button onClick={test} disabled={busy} className="bg-navy hover:bg-brand-hover text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors disabled:opacity-60">{busy ? 'Mengetes...' : 'Tes GET /health'}</button>
          <button onClick={() => setCfg(clearRuntimeOverride())} className="border-[1.5px] border-link text-link px-6 py-2.5 rounded-full text-sm font-semibold">Reset override</button>
        </div>
        <p className="text-xs text-body-text/70">Permanen: edit <code>FE/public/config.js</code> di host (Vercel/CF/GH) lalu reload. Sementara: form ini (hilang saat refresh bila tidak disimpan ke config.js).</p>
      </div>
      <div className="rounded-3xl border border-line-soft p-6 text-sm">
        <p className="font-head font-bold text-navy">Hasil terakhir</p>
        {!health ? <p className="text-body-text/70 mt-2">Belum dites.</p> : (
          <p className="mt-2">{health.ok ? '✅ BE terjangkau' : '⚠️ BE tidak terjangkau — FE masuk mode antre/cache'} • {health.at} {health.faqCount != null && `• faq ${health.faqCount}`}</p>
        )}
      </div>
    </div>
  );
}
