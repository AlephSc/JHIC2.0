import CdnImage from '../components/CdnImage';

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-slate-900 text-white p-8 grid gap-6 md:grid-cols-2 overflow-hidden">
        <div>
          <p className="text-xs tracking-widest text-sky-300">SMK TELEKOMUNIKASI DARUL ULUM</p>
          <h1 className="text-3xl font-extrabold mt-2">SMK Telekomunikasi Darul Ulum</h1>
          <p className="mt-2 text-sm opacity-80">Pendidikan teknologi, karakter Islami, siap industri. Lihat Figma: Landing Page.png</p>
          <div className="mt-4 flex gap-2">
            <a href="#/ppdb" className="bg-sky-600 px-4 py-2 rounded-full text-sm font-bold">Daftar PPDB 2026</a>
            <a href="#/jurusan" className="border px-4 py-2 rounded-full text-sm">Jelajahi Jurusan</a>
          </div>
        </div>
        <CdnImage src="/img/hero-sekolah.webp" alt="Gedung sekolah" className="rounded-2xl w-full h-56 object-cover bg-slate-700" eager widths={[480, 768, 1200]} />
      </section>

      <section className="grid gap-3 sm:grid-cols-4 text-sm">
        {[['1.200+', 'Siswa aktif'], ['85', 'Guru & tendik'], ['5.000+', 'Alumni'], ['150+', 'Mitra industri']].map(([n, l]) => (
          <div key={l} className="rounded-2xl border p-4 text-center">
            <p className="text-xl font-extrabold">{n}</p>
            <p className="text-xs text-slate-500">{l}</p>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border p-4 text-xs text-slate-600">
        <p className="font-bold text-slate-900">Ketahanan (resilient)</p>
        <p>Halaman ini statis + gambar CDN dengan fallback lokal. Jika BE mati, halaman tetap tampil (jalur L1). Cek di halaman Kesehatan.</p>
      </section>
    </div>
  );
}
