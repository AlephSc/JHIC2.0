import { useState } from 'react';
import { Card, Stepper } from '../components/ui';
import { JURUSAN } from '../data';
import { apiPost } from '../lib/api';
import { enqueuePpdb } from '../lib/outbox';

// Wizard replika: PPDB Data Siswa → Data Orang Tua → Upload Berkas → Review.
const STEPS = ['Data Siswa', 'Orang Tua', 'Berkas', 'Review'];
const BERKAS = [
  { id: 'kk', t: 'Kartu Keluarga', f: 'Format: PDF/JPG. Max: 5MB' },
  { id: 'akta', t: 'Akta Kelahiran', f: 'Format: PDF/JPG. Max: 5MB' },
  { id: 'ktp', t: 'KTP Orang Tua/Wali', f: 'Format: JPG/PNG. Max: 5MB' },
  { id: 'ijazah', t: 'Ijazah / SKL', f: 'Format: PDF/JPG. Max: 5MB' },
  { id: 'foto', t: 'Pas Foto (3x4)', f: 'Format: JPG/PNG. Max: 2MB. Background Merah.' },
];

export default function PpdbDaftar() {
  const [step, setStep] = useState(1);
  const [f, setF] = useState<Record<string, string>>({ nama: 'Budi Santoso', tahun: '2024', jurusan: 'RPL' });
  const [files, setFiles] = useState<Record<string, string>>({ kk: 'kartu_keluarga.pdf' });
  const [setuju, setSetuju] = useState(false);
  const [info, setInfo] = useState<string | null>(null);
  const set = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));
  const inp = 'mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 text-sm';

  const kirim = async () => {
    if (!setuju) { setInfo('Centang pernyataan kebenaran data dulu.'); return; }
    setInfo(null);
    try {
      await apiPost('/ppdb/pendaftaran', f, { idempotencyKey: crypto.randomUUID(), timeoutMs: 6000 });
      window.location.hash = '#/ppdb/tiket';
      return;
    } catch (e) {
      const err = e as { isDown?: boolean; message?: string };
      if (!err?.isDown) { setInfo(err?.message ?? 'Periksa isian.'); return; }
    }
    const item = enqueuePpdb(f, Object.values(files));
    setInfo(`Koneksi lambat — diamankan sebagai ${item.antreId}. Buka halaman tiket untuk detail + jalur WA.`);
    setTimeout(() => { window.location.hash = '#/ppdb/tiket'; }, 1200);
  };

  return (
    <div>
      <h1 className="text-center text-2xl font-extrabold">{step === 1 ? 'Data Pribadi Siswa' : step === 2 ? 'Data Orang Tua / Wali' : step === 3 ? 'Upload Berkas Pendaftaran' : 'Periksa Data Pendaftaran'}</h1>
      <p className="text-center text-xs text-slate-500">{step < 4 ? 'Masukkan informasi yang dapat dihubungi oleh pihak sekolah.' : 'Pastikan seluruh data dan dokumen sudah benar sebelum dikirim.'}</p>
      <Stepper steps={STEPS} active={step - 1} />

      {step === 1 && (
        <Card className="p-6 space-y-5">
          <div><p className="font-bold">Data Pribadi</p><hr className="mt-2" />
            <div className="grid sm:grid-cols-2 gap-3 mt-3 text-xs">
              <label className="sm:col-span-2">Nama Lengkap (Sesuai ijazah)*<input value={f.nama ?? ''} onChange={(e) => set('nama', e.target.value)} placeholder="Masukkan nama lengkap" className={inp} /></label>
              <label>NIK*<input value={f.nik ?? ''} onChange={(e) => set('nik', e.target.value)} placeholder="16 Digit NIK" className={inp} /></label>
              <label>NISN*<input value={f.nisn ?? ''} onChange={(e) => set('nisn', e.target.value)} placeholder="10 Digit NISN" className={inp} /></label>
              <label>Tempat Lahir*<input placeholder="Kota/Kabupaten" className={inp} /></label>
              <label>Tanggal Lahir*<input type="date" className={inp} /></label>
              <label>Jenis Kelamin*<select className={inp}><option>Pilih Jenis Kelamin</option><option>Laki-laki</option><option>Perempuan</option></select></label>
              <label>No. WhatsApp Aktif*<input placeholder="08x x xxx xxxx" className={inp} /></label>
              <label className="sm:col-span-2">Alamat Lengkap*<input placeholder="Nama Jalan, RT/RW, Desa/Kelurahan" className={inp} /></label>
            </div>
          </div>
          <div><p className="font-bold">Data Sekolah Asal</p><hr className="mt-2" />
            <div className="grid sm:grid-cols-2 gap-3 mt-3 text-xs">
              <label>Nama SMP/MTs Asal*<input placeholder="Contoh: SMPN 1 Contoh" className={inp} /></label>
              <label>Tahun Lulus*<select value={f.tahun} onChange={(e) => set('tahun', e.target.value)} className={inp}><option>2024</option><option>2025</option><option>2026</option></select></label>
            </div>
          </div>
          <div><p className="font-bold">Pilihan Jurusan</p><hr className="mt-2" />
            <div className="grid sm:grid-cols-2 gap-3 mt-3">
              {JURUSAN.map((j) => (
                <button key={j.kode} onClick={() => set('jurusan', j.kode)} className={`text-left rounded-2xl border p-4 text-xs ${f.jurusan === j.kode ? 'bg-sky-700 text-white' : ''}`}>
                  <p className="font-bold">{j.nama}</p><p className={`mt-1 ${f.jurusan === j.kode ? 'opacity-80' : 'text-slate-500'}`}>{j.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </Card>
      )}

      {step === 2 && (
        <Card className="p-6 space-y-5">
          {[['Ayah Kandung', 'Wiraswasta'], ['Ibu Kandung', 'Ibu Rumah Tangga']].map(([t, ph]) => (
            <div key={t}><p className="font-bold">Data {t}</p><hr className="mt-2" />
              <div className="grid sm:grid-cols-2 gap-3 mt-3 text-xs">
                <label>Nama Lengkap<input placeholder="Sesuai KTP" className={inp} /></label>
                <label>NIK (Nomor Induk Kependudukan)<input placeholder="16 Digit NIK" className={inp} /></label>
                <label>Pekerjaan<input placeholder={`Contoh: ${ph}`} className={inp} /></label>
                <label>Penghasilan Per Bulan<select className={inp}><option>Pilih Rentang Penghasilan</option><option>&lt; 2 jt</option><option>2–5 jt</option><option>&gt; 5 jt</option></select></label>
                <label>Nomor Telepon / WhatsApp<input placeholder="08x x xxx xxxx" className={inp} /></label>
              </div>
            </div>
          ))}
          <label className="flex gap-2 bg-stone-100 rounded-xl p-4 text-xs"><input type="checkbox" className="mt-1" /><span><b>Gunakan Data Wali</b><br />Centang jika calon siswa tinggal bersama wali (bukan orang tua kandung).</span></label>
        </Card>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div><h2 className="text-xl font-extrabold">Upload Berkas Pendaftaran</h2><p className="text-xs text-slate-500">Lengkapi dokumen persyaratan di bawah ini untuk melanjutkan pendaftaran Anda.</p></div>
          <p className="bg-red-100 text-red-800 text-xs rounded-xl p-3">⚠ Pastikan semua dokumen dapat dibaca dengan jelas. Berkas yang buram atau terpotong dapat memperlambat proses verifikasi.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {BERKAS.map((b) => (
              <Card key={b.id} className={`p-4 ${files[b.id] ? 'border-sky-600' : ''}`}>
                <div className="flex justify-between items-center"><p className="font-bold text-sm">{b.t}</p><span>{files[b.id] ? '✓' : '⇪'}</span></div>
                <p className="text-[11px] text-slate-500">{b.f}</p>
                {files[b.id] ? (
                  <p className="mt-2 bg-stone-100 rounded-lg px-3 py-2 text-xs flex justify-between">📄 {files[b.id]} <button onClick={() => setFiles((p) => { const n = { ...p }; delete n[b.id]; return n; })} className="text-red-600">🗑</button></p>
                ) : (
                  <label className="mt-2 block bg-stone-100 border-dashed border rounded-lg text-center py-4 text-xs font-bold cursor-pointer">☁ Pilih File<input type="file" className="hidden" onChange={(e) => e.target.files?.[0] && setFiles((p) => ({ ...p, [b.id]: e.target.files![0].name }))} /></label>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            <Card className="p-5 text-sm">
              <div className="flex justify-between"><p className="font-extrabold text-base">Data Calon Siswa</p><span className="text-sky-700 text-xs font-bold">✎ Edit</span></div><hr className="my-2" />
              <div className="grid grid-cols-2 gap-2 text-xs">
                <p><span className="text-slate-500">Nama Lengkap</span><br /><b>{f.nama || '-'}</b></p>
                <p><span className="text-slate-500">NISN</span><br /><b>{f.nisn || '1234567890'}</b></p>
                <p><span className="text-slate-500">Tempat, Tanggal Lahir</span><br /><b>Jakarta, 15 Agustus 2008</b></p>
                <p><span className="text-slate-500">Jenis Kelamin</span><br /><b>Laki-laki</b></p>
              </div>
            </Card>
            <Card className="p-5 text-sm">
              <div className="flex justify-between"><p className="font-extrabold text-base">Data Orang Tua</p><span className="text-sky-700 text-xs font-bold">✎ Edit</span></div><hr className="my-2" />
              <div className="grid grid-cols-2 gap-2 text-xs">
                <p><span className="text-slate-500">Nama Ayah</span><br /><b>Agus Santoso</b></p>
                <p><span className="text-slate-500">Pekerjaan Ayah</span><br /><b>Karyawan Swasta</b></p>
                <p><span className="text-slate-500">Nama Ibu</span><br /><b>Siti Rahmawati</b></p>
                <p><span className="text-slate-500">Nomor Telepon Wali</span><br /><b>081234567890</b></p>
              </div>
            </Card>
            <label className="flex gap-2 bg-stone-100 rounded-xl p-4 text-xs"><input type="checkbox" checked={setuju} onChange={(e) => setSetuju(e.target.checked)} className="mt-1" /><span>Saya menyatakan data benar, sesuai dengan kondisi aslinya, dan siap menerima konsekuensi apabila dikemudian hari ditemukan ketidaksesuaian data.</span></label>
            {info && <p className="bg-amber-50 border border-amber-200 text-xs rounded-xl p-3">{info}</p>}
            <div className="flex gap-2">
              <button onClick={kirim} className="flex-1 bg-black text-white rounded-lg py-3 text-sm font-bold">Kirim Pendaftaran</button>
              <button onClick={() => setStep(3)} className="border border-sky-700 text-sky-700 rounded-lg px-6 text-sm font-bold">Kembali</button>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-slate-950 text-white rounded-2xl p-5 text-sm">
              <p className="font-extrabold text-base">Pilihan Jurusan</p>
              <p className="text-[11px] opacity-60 mt-2">Pilihan 1 (Utama)</p><p className="font-bold">{JURUSAN.find((j) => j.kode === f.jurusan)?.nama}</p>
              <p className="text-[11px] opacity-60 mt-2">Pilihan 2 (Alternatif)</p><p>Rekayasa Perangkat Lunak</p>
            </div>
            <Card className="p-5 text-sm">
              <p className="font-extrabold text-base">Dokumen Upload</p><hr className="my-2" />
              {['Pas Foto 3x4', 'Scan Kartu Keluarga', 'Scan Akta Kelahiran', 'Ijazah / SKHU Sementara'].map((d) => <p key={d} className="py-1.5 text-xs border-b last:border-0">✓ {d} <span className="float-right">👁</span></p>)}
            </Card>
          </div>
        </div>
      )}

      {step < 4 && (
        <div className="flex justify-between mt-6">
          <button onClick={() => (step === 1 ? (window.location.hash = '#/ppdb') : setStep(step - 1))} className="border border-sky-700 text-sky-700 rounded-lg px-5 py-2.5 text-sm font-bold">← Kembali</button>
          <button onClick={() => setStep(step + 1)} className="bg-slate-900 text-white rounded-lg px-6 py-2.5 text-sm font-bold">Lanjutkan →</button>
        </div>
      )}
    </div>
  );
}
