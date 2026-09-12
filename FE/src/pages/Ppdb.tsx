import { BtnPrimer, Photo } from '../components/ui';

// Replika PPDB Page.png (landing) — hero + info pendaftaran.
export default function Ppdb() {
  return (
    <div className="space-y-10">
      <section className="grid gap-6 md:grid-cols-2 items-center">
        <div>
          <p className="text-[11px] font-bold text-sky-700 tracking-widest">PENERIMAAN PESERTA DIDIK BARU</p>
          <h1 className="text-4xl font-extrabold leading-tight">Mulai langkahmu bersama <span className="text-sky-700">PPDB 2026/2027</span></h1>
          <p className="text-sm text-slate-600 mt-3">Bergabunglah dengan SMK Telekomunikasi Darul Ulum untuk menjadi generasi yang kompeten, berkarakter, dan siap menghadapi dunia industri digital.</p>
          <div className="mt-4 flex gap-2">
            <BtnPrimer to="/ppdb/daftar">Mulai Pendaftaran →</BtnPrimer>
            <a href="#/ppdb" className="border text-sm font-bold px-5 py-2.5 rounded-full">Lihat Persyaratan</a>
          </div>
        </div>
        <Photo label="Foto siswa memegang logo sekolah" ratio="h-80" className="rounded-3xl" tone={0} />
      </section>
      <section className="bg-sky-50 rounded-3xl p-6 text-center">
        <h2 className="font-extrabold text-lg">Informasi Pendaftaran</h2>
        <p className="text-xs text-slate-500">Detail penting mengenai proses penerimaan peserta didik baru tahun ini.</p>
        <div className="grid sm:grid-cols-4 gap-3 mt-4 text-xs">
          {[['Jalur Prestasi', 'Rapor + sertifikat'], ['Jalur Reguler', 'Tes + wawancara'], ['Beasiswa', 'Yatim & berprestasi'], ['Kuota', '4 jurusan × 2 kelas']].map(([t, d]) => (
            <div key={t} className="bg-white rounded-2xl border p-4"><p className="font-bold">{t}</p><p className="text-slate-500 mt-1">{d}</p></div>
          ))}
        </div>
        <div className="mt-4 flex justify-center gap-2 text-sm">
          <a href="#/login" className="border rounded-full px-4 py-2 font-bold">Masuk Akun</a>
          <a href="#/ppdb/dashboard" className="border rounded-full px-4 py-2 font-bold">Cek Status →</a>
        </div>
      </section>
    </div>
  );
}
