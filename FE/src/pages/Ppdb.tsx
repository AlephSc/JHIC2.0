import { useState } from 'react';
import { apiPost } from '../lib/api';
import { loadConfig } from '../lib/config';
import { enqueuePpdb, loadOutbox, waDaftarLink } from '../lib/outbox';

// Alur: Data Siswa (nama/NIK 16/NISN 10/WA) → kirim.
// BE PPDB penuh belum ada → sukses = simpan antrean ANTRE- + auto-coba kirim + WA manual.
// Tidak pernah tampilkan "backend down".
export default function Ppdb() {
  const [nama, setNama] = useState('Budi Santoso');
  const [nik, setNik] = useState('');
  const [nisn, setNisn] = useState('');
  const [info, setInfo] = useState<string | null>(null);
  const [lastAntre, setLastAntre] = useState<string | null>(null);
  const cfg = loadConfig();
  const outbox = loadOutbox();

  const submit = async () => {
    setInfo(null);
    if (nama.trim().length < 3) { setInfo('Isi nama lengkap dulu.'); return; }
    if (nik && !/^\d{16}$/.test(nik)) { setInfo('NIK harus 16 digit angka.'); return; }
    if (nisn && !/^\d{10}$/.test(nisn)) { setInfo('NISN harus 10 digit angka.'); return; }

    const payload = { nama, nik, nisn, jurusan: 'TKJ' };
    // Coba kirim langsung (idempoten). Gagal-down → antre.
    try {
      await apiPost('/ppdb/pendaftaran', payload, { idempotencyKey: crypto.randomUUID(), timeoutMs: 6000 });
      setInfo('Pendaftaran terkirim ke panitia (live). Simpan nomor tiket resmi.');
      return;
    } catch (e) {
      const err = e as { isDown?: boolean; message?: string };
      if (!err?.isDown) { setInfo(err?.message ?? 'Gagal, periksa isian.'); return; }
    }
    const item = enqueuePpdb(payload, []);
    setLastAntre(item.antreId);
    setInfo(`Koneksi lambat — pendaftaran diamankan sebagai ${item.antreId} (bukan nomor resmi). Akan dikirim otomatis + bisa daftar via WA.`);
  };

  return (
    <div className="space-y-4 max-w-2xl">
      <h1 className="text-2xl font-extrabold">Mulai Langkahmu Bersama PPDB 2026/2027</h1>
      <p className="text-sm text-slate-600">Sumber: PPDB Page/Data Siswa/Upload/Review/Status/Tiket. Mode antre aktif saat BE down.</p>
      <div className="rounded-2xl border p-4 space-y-3">
        <label className="block text-sm">Nama Lengkap (sesuai ijazah)*
          <input value={nama} onChange={(e) => setNama(e.target.value)} className="mt-1 w-full border rounded-lg px-3 py-2" />
        </label>
        <div className="grid sm:grid-cols-2 gap-3">
          <label className="block text-sm">NIK (16 digit)*
            <input value={nik} onChange={(e) => setNik(e.target.value)} placeholder="16 Digit NIK" className="mt-1 w-full border rounded-lg px-3 py-2" />
          </label>
          <label className="block text-sm">NISN (10 digit)*
            <input value={nisn} onChange={(e) => setNisn(e.target.value)} placeholder="10 Digit NISN" className="mt-1 w-full border rounded-lg px-3 py-2" />
          </label>
        </div>
        <button onClick={submit} className="bg-sky-700 text-white text-sm font-bold px-4 py-2 rounded-full">Kirim Pendaftaran</button>
        {info && <p className="text-sm bg-amber-50 border border-amber-200 rounded-xl p-3">{info}</p>}
        {lastAntre && (
          <div className="text-sm space-y-2">
            <p>Nomor antrean: <b>{lastAntre}</b> — screenshot / salin nomor ini.</p>
            <a className="inline-block border rounded-full px-4 py-2" href={waDaftarLink(cfg.waNumber, { antreId: lastAntre, idempotencyKey: '', createdAt: new Date().toISOString(), attempts: 0, payload: {}, fileNames: [], status: 'pending' }, nama)} target="_blank" rel="noreferrer">
              Daftar via WA {cfg.waNumber}
            </a>
          </div>
        )}
      </div>
      <div className="rounded-2xl border p-4 text-sm">
        <p className="font-bold">Antrean perangkat ini ({outbox.length})</p>
        {outbox.length === 0 ? <p className="text-slate-500">Belum ada antrean.</p> : outbox.slice(0, 5).map((o) => (
          <p key={o.antreId} className="text-xs">• {o.antreId} — {o.status} — {o.createdAt}</p>
        ))}
        <p className="text-xs text-slate-500 mt-2">Tutorial darurat: 1) screenshot antrean 2) WA panitia + Email {cfg.waEmail} 3) bawa KK/Akta/KTP/Ijazah/Foto saat verifikasi.</p>
      </div>
    </div>
  );
}
