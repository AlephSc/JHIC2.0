import { useState } from 'react';
import { Card, Stepper } from '../components/ui';
import { JURUSAN } from '../data';
import { apiPost } from '../lib/api';
import { enqueuePpdb } from '../lib/outbox';

// SMKT_Style wizard PPDB: stepper biru, field terkontrol + validasi, upload 5 berkas, review live.
const STEPS = ['Data Siswa', 'Orang Tua', 'Berkas', 'Review'];
const BERKAS = [
  { id: 'kk', t: 'Kartu Keluarga', f: 'Format: PDF/JPG. Max: 5MB', max: 5 },
  { id: 'akta', t: 'Akta Kelahiran', f: 'Format: PDF/JPG. Max: 5MB', max: 5 },
  { id: 'ktp', t: 'KTP Orang Tua/Wali', f: 'Format: JPG/PNG. Max: 5MB', max: 5 },
  { id: 'ijazah', t: 'Ijazah / SKL', f: 'Format: PDF/JPG. Max: 5MB', max: 5 },
  { id: 'foto', t: 'Pas Foto (3x4)', f: 'Format: JPG/PNG. Max: 2MB. Background Merah.', max: 2 },
];
const inp = 'mt-1.5 w-full bg-gray-100 rounded-xl px-3.5 py-2.5 text-sm font-normal outline-none focus:ring-2 ring-brand/30';

export default function PpdbDaftar() {
  const [step, setStep] = useState(1);
  const [f, setF] = useState<Record<string, string>>({ nama: '', jurusan: 'RPL' });
  const [files, setFiles] = useState<Record<string, string>>({});
  const [wali, setWali] = useState(false);
  const [setuju, setSetuju] = useState(false);
  const [info, setInfo] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const set = (k: string, v: string) => setF((p) => ({ ...p, [k]: v }));

  const cekStep1 = (): string | null => {
    if ((f.nama ?? '').trim().length < 3) return 'Nama lengkap minimal 3 karakter.';
    if (!/^\d{16}$/.test(f.nik ?? '')) return 'NIK harus 16 digit angka.';
    if (!/^\d{10}$/.test(f.nisn ?? '')) return 'NISN harus 10 digit angka.';
    if (!f.tempatLahir) return 'Tempat lahir wajib diisi.';
    if (!f.tglLahir) return 'Tanggal lahir wajib diisi.';
    if (!f.jk) return 'Pilih jenis kelamin.';
    if (!/^08\d{8,12}$/.test((f.wa ?? '').replace(/[\s-]/g, ''))) return 'Nomor WhatsApp tidak valid (contoh: 081234567890).';
    if (!f.alamat) return 'Alamat lengkap wajib diisi.';
    if (!f.smp) return 'Nama SMP/MTs asal wajib diisi.';
    if (!f.tahun) return 'Pilih tahun lulus.';
    return null;
  };
  const cekStep2 = (): string | null => {
    for (const p of ['ayah', 'ibu'] as const) {
      if (!f[`${p}Nama`]) return `Nama ${p === 'ayah' ? 'ayah' : 'ibu'} wajib diisi.`;
      if (f[`${p}Nik`] && !/^\d{16}$/.test(f[`${p}Nik`])) return `NIK ${p} harus 16 digit.`;
    }
    return null;
  };
  const cekStep3 = (): string | null => {
    if (Object.keys(files).length < BERKAS.length) {
      const kurang = BERKAS.filter((b) => !files[b.id]).map((b) => b.t).join(', ');
      return `Berkas belum lengkap: ${kurang}`;
    }
    return null;
  };

  const lanjut = () => {
    setErr(null);
    const e = step === 1 ? cekStep1() : step === 2 ? cekStep2() : step === 3 ? cekStep3() : null;
    if (e) { setErr(e); return; }
    setStep(step + 1);
  };

  const kirim = async () => {
    if (!setuju) { setInfo('Centang pernyataan kebenaran data dulu.'); return; }
    setInfo(null);
    try {
      await apiPost('/ppdb/pendaftaran', { ...f, files: Object.keys(files) }, { idempotencyKey: crypto.randomUUID(), timeoutMs: 6000 });
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

  const onFile = (id: string, maxMb: number, file: File | undefined) => {
    if (!file) return;
    if (file.size > maxMb * 1024 * 1024) { setErr(`${file.name} melebihi ${maxMb}MB.`); return; }
    setErr(null);
    setFiles((p) => ({ ...p, [id]: file.name }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-center text-3xl font-extrabold">{step === 1 ? 'Data Pribadi Siswa' : step === 2 ? 'Data Orang Tua / Wali' : step === 3 ? 'Upload Berkas Pendaftaran' : 'Periksa Data Pendaftaran'}</h1>
      <p className="text-center text-sm text-muted mt-2">{step < 4 ? 'Masukkan informasi yang dapat dihubungi oleh pihak sekolah.' : 'Pastikan seluruh data dan dokumen sudah benar sebelum dikirim.'}</p>
      <Stepper steps={STEPS} active={step - 1} />
      {err && <p className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl p-3 mb-4">{err}</p>}

      {step === 1 && (
        <Card className="p-8 space-y-6">
          <div><p className="font-head font-bold">Data Pribadi</p><hr className="mt-2 border-line" />
            <div className="grid sm:grid-cols-2 gap-4 mt-4 text-xs font-bold">
              <label className="sm:col-span-2">Nama Lengkap (Sesuai ijazah)*<input value={f.nama ?? ''} onChange={(e) => set('nama', e.target.value)} placeholder="Masukkan nama lengkap" className={inp} /></label>
              <label>NIK*<input value={f.nik ?? ''} onChange={(e) => set('nik', e.target.value.replace(/\D/g, '').slice(0, 16))} inputMode="numeric" placeholder="16 Digit NIK" className={inp} /></label>
              <label>NISN*<input value={f.nisn ?? ''} onChange={(e) => set('nisn', e.target.value.replace(/\D/g, '').slice(0, 10))} inputMode="numeric" placeholder="10 Digit NISN" className={inp} /></label>
              <label>Tempat Lahir*<input value={f.tempatLahir ?? ''} onChange={(e) => set('tempatLahir', e.target.value)} placeholder="Kota/Kabupaten" className={inp} /></label>
              <label>Tanggal Lahir*<input type="date" value={f.tglLahir ?? ''} onChange={(e) => set('tglLahir', e.target.value)} className={inp} /></label>
              <label>Jenis Kelamin*<select value={f.jk ?? ''} onChange={(e) => set('jk', e.target.value)} className={inp}><option value="">Pilih Jenis Kelamin</option><option>Laki-laki</option><option>Perempuan</option></select></label>
              <label>No. WhatsApp Aktif*<input value={f.wa ?? ''} onChange={(e) => set('wa', e.target.value)} placeholder="0812 3456 7890" className={inp} /></label>
              <label className="sm:col-span-2">Alamat Lengkap*<input value={f.alamat ?? ''} onChange={(e) => set('alamat', e.target.value)} placeholder="Nama Jalan, RT/RW, Desa/Kelurahan" className={inp} /></label>
            </div>
          </div>
          <div><p className="font-head font-bold">Data Sekolah Asal</p><hr className="mt-2 border-line" />
            <div className="grid sm:grid-cols-2 gap-4 mt-4 text-xs font-bold">
              <label>Nama SMP/MTs Asal*<input value={f.smp ?? ''} onChange={(e) => set('smp', e.target.value)} placeholder="Contoh: SMPN 1 Contoh" className={inp} /></label>
              <label>Tahun Lulus*<select value={f.tahun ?? ''} onChange={(e) => set('tahun', e.target.value)} className={inp}><option value="">Pilih Tahun</option><option>2025</option><option>2026</option></select></label>
            </div>
          </div>
          <div><p className="font-head font-bold">Pilihan Jurusan</p><hr className="mt-2 border-line" />
            <div className="grid sm:grid-cols-2 gap-3 mt-4">
              {JURUSAN.map((j) => (
                <button key={j.kode} onClick={() => set('jurusan', j.kode)} className={`text-left rounded-2xl p-4 text-xs transition-colors ${f.jurusan === j.kode ? 'bg-navy-950 text-white' : 'border border-line bg-white hover:border-brand'}`}>
                  <p className="font-bold">{j.nama}</p><p className={`mt-1 leading-relaxed ${f.jurusan === j.kode ? 'text-white/60' : 'text-muted'}`}>{j.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </Card>
      )}

      {step === 2 && (
        <Card className="p-8 space-y-6">
          {[['ayah', 'Ayah Kandung', 'Wiraswasta'], ['ibu', 'Ibu Kandung', 'Ibu Rumah Tangga']].map(([key, t, ph]) => (
            <div key={key}><p className="font-head font-bold">Data {t}</p><hr className="mt-2 border-line" />
              <div className="grid sm:grid-cols-2 gap-4 mt-4 text-xs font-bold">
                <label>Nama Lengkap<input value={f[`${key}Nama`] ?? ''} onChange={(e) => set(`${key}Nama`, e.target.value)} placeholder="Sesuai KTP" className={inp} /></label>
                <label>NIK (Nomor Induk Kependudukan)<input value={f[`${key}Nik`] ?? ''} onChange={(e) => set(`${key}Nik`, e.target.value.replace(/\D/g, '').slice(0, 16))} inputMode="numeric" placeholder="16 Digit NIK" className={inp} /></label>
                <label>Pekerjaan<input value={f[`${key}Kerja`] ?? ''} onChange={(e) => set(`${key}Kerja`, e.target.value)} placeholder={`Contoh: ${ph}`} className={inp} /></label>
                <label>Penghasilan Per Bulan<select value={f[`${key}Gaji`] ?? ''} onChange={(e) => set(`${key}Gaji`, e.target.value)} className={inp}><option value="">Pilih Rentang Penghasilan</option><option>&lt; 2 jt</option><option>2–5 jt</option><option>&gt; 5 jt</option></select></label>
                <label className="sm:col-span-2">Nomor Telepon / WhatsApp<input value={f[`${key}Wa`] ?? ''} onChange={(e) => set(`${key}Wa`, e.target.value)} placeholder="08x x xxx xxxx" className={inp} /></label>
              </div>
            </div>
          ))}
          <label className="flex gap-3 bg-gray-100 rounded-2xl p-4 text-xs cursor-pointer">
            <input type="checkbox" checked={wali} onChange={(e) => setWali(e.target.checked)} className="mt-0.5" />
            <span><b>Gunakan Data Wali</b><br />Centang jika calon siswa tinggal bersama wali (bukan orang tua kandung).</span>
          </label>
          {wali && (
            <div><p className="font-head font-bold">Data Wali</p><hr className="mt-2 border-line" />
              <div className="grid sm:grid-cols-2 gap-4 mt-4 text-xs font-bold">
                <label>Nama Wali<input value={f.waliNama ?? ''} onChange={(e) => set('waliNama', e.target.value)} placeholder="Sesuai KTP" className={inp} /></label>
                <label>Nomor Telepon Wali<input value={f.waliWa ?? ''} onChange={(e) => set('waliWa', e.target.value)} placeholder="08x x xxx xxxx" className={inp} /></label>
              </div>
            </div>
          )}
        </Card>
      )}

      {step === 3 && (
        <div className="space-y-4">
          <div><h2 className="text-xl font-extrabold">Upload Berkas Pendaftaran</h2><p className="text-xs text-muted mt-1">Lengkapi dokumen persyaratan di bawah ini untuk melanjutkan pendaftaran Anda.</p></div>
          <p className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl p-3">⚠ Pastikan semua dokumen dapat dibaca dengan jelas. Berkas yang buram atau terpotong dapat memperlambat proses verifikasi.</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {BERKAS.map((b) => (
              <Card key={b.id} className={`p-4 ${files[b.id] ? 'ring-2 ring-brand' : ''}`}>
                <div className="flex justify-between items-center"><p className="font-head font-bold text-sm">{b.t}</p><span className={files[b.id] ? 'text-brand' : 'text-gray-400'}>{files[b.id] ? '✓' : '⇪'}</span></div>
                <p className="text-[11px] text-muted mt-1">{b.f}</p>
                {files[b.id] ? (
                  <p className="mt-2 bg-gray-100 rounded-xl px-3 py-2.5 text-xs flex justify-between items-center">📄 {files[b.id]} <button onClick={() => setFiles((p) => { const n = { ...p }; delete n[b.id]; return n; })} className="text-red-600 font-bold">🗑</button></p>
                ) : (
                  <label className="mt-2 block bg-gray-100 border-dashed border-[1.5px] border-line rounded-xl text-center py-4 text-xs font-bold cursor-pointer hover:border-brand">
                    ☁ Pilih File<input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => onFile(b.id, b.max, e.target.files?.[0])} />
                  </label>
                )}
              </Card>
            ))}
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
          <div className="space-y-4">
            <Card className="p-6 text-sm">
              <div className="flex justify-between items-center"><p className="font-head font-extrabold">Data Calon Siswa</p><button onClick={() => setStep(1)} className="text-brand text-xs font-bold">✎ Edit</button></div><hr className="my-3 border-line" />
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <p><span className="text-muted">Nama Lengkap</span><br /><b>{f.nama || '-'}</b></p>
                <p><span className="text-muted">NISN</span><br /><b>{f.nisn || '-'}</b></p>
                <p><span className="text-muted">Tempat, Tanggal Lahir</span><br /><b>{f.tempatLahir || '-'}, {f.tglLahir || '-'}</b></p>
                <p><span className="text-muted">Jenis Kelamin</span><br /><b>{f.jk || '-'}</b></p>
                <p><span className="text-muted">SMP Asal</span><br /><b>{f.smp || '-'}</b></p>
                <p><span className="text-muted">WhatsApp</span><br /><b>{f.wa || '-'}</b></p>
              </div>
            </Card>
            <Card className="p-6 text-sm">
              <div className="flex justify-between items-center"><p className="font-head font-extrabold">Data Orang Tua</p><button onClick={() => setStep(2)} className="text-brand text-xs font-bold">✎ Edit</button></div><hr className="my-3 border-line" />
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <p><span className="text-muted">Nama Ayah</span><br /><b>{f.ayahNama || '-'}</b></p>
                <p><span className="text-muted">Pekerjaan Ayah</span><br /><b>{f.ayahKerja || '-'}</b></p>
                <p><span className="text-muted">Nama Ibu</span><br /><b>{f.ibuNama || '-'}</b></p>
                <p><span className="text-muted">Telepon {wali ? 'Wali' : 'Orang Tua'}</span><br /><b>{wali ? f.waliWa || '-' : f.ayahWa || f.ibuWa || '-'}</b></p>
              </div>
            </Card>
            <label className="flex gap-3 bg-gray-100 rounded-2xl p-4 text-xs cursor-pointer">
              <input type="checkbox" checked={setuju} onChange={(e) => setSetuju(e.target.checked)} className="mt-0.5" />
              <span>Saya menyatakan data benar, sesuai dengan kondisi aslinya, dan siap menerima konsekuensi apabila dikemudian hari ditemukan ketidaksesuaian data.</span>
            </label>
            {info && <p className="bg-amber-50 border border-amber-200 text-xs rounded-xl p-3">{info}</p>}
            <div className="flex gap-3">
              <button onClick={kirim} className="flex-1 bg-navy-950 hover:bg-navy-900 text-white rounded-xl py-3.5 text-sm font-bold transition-colors">Kirim Pendaftaran →</button>
              <button onClick={() => setStep(3)} className="border-[1.5px] border-brand text-brand rounded-xl px-6 text-sm font-bold">Kembali</button>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-navy-950 text-white rounded-3xl p-6 text-sm">
              <p className="font-head font-extrabold">Pilihan Jurusan</p>
              <p className="text-[11px] text-white/50 mt-3">Pilihan 1 (Utama)</p><p className="font-bold">{JURUSAN.find((j) => j.kode === f.jurusan)?.nama}</p>
              <p className="text-[11px] text-white/50 mt-3">Pilihan 2 (Alternatif)</p><p>{JURUSAN.find((j) => j.kode !== f.jurusan)?.nama}</p>
            </div>
            <Card className="p-6 text-sm">
              <p className="font-head font-extrabold">Dokumen Upload</p><hr className="my-3 border-line" />
              {BERKAS.map((b) => (
                <p key={b.id} className="py-2 text-xs border-b border-line last:border-0 flex justify-between"><span className={files[b.id] ? 'text-brand font-bold' : 'text-gray-400'}>{files[b.id] ? '✓' : '○'} {b.t}</span>{files[b.id] && <span className="text-gray-400">👁</span>}</p>
              ))}
            </Card>
          </div>
        </div>
      )}

      {step < 4 && (
        <div className="flex justify-between mt-8">
          <button onClick={() => (step === 1 ? (window.location.hash = '#/ppdb') : setStep(step - 1))} className="border-[1.5px] border-brand text-brand rounded-xl px-6 py-3 text-sm font-bold">← Kembali</button>
          <button onClick={lanjut} className="bg-brand hover:bg-brand-hover text-white rounded-xl px-8 py-3 text-sm font-bold transition-colors">Lanjutkan →</button>
        </div>
      )}
    </div>
  );
}
