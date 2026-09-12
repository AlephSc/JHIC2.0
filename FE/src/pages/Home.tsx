import { useState } from 'react';
import { BtnPrimer, Card, Photo, Tag } from '../components/ui';
import { BERITA, JURUSAN, LOGO_MITRA, TESTIMONI } from '../data';

// Replika Landing Page.png: hero navy → kepala sekolah → video → program
// → statistik → mitra → berita → alumni.
export default function Home() {
  const [tab, setTab] = useState('PF');
  return (
    <div className="space-y-14 -mt-2">
      {/* HERO */}
      <section className="bg-slate-900 text-white rounded-b-[2.5rem] px-6 py-10 grid gap-6 md:grid-cols-2 items-center overflow-hidden">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight">SMK TELEKOMUNIKASI<br /><span className="text-sky-400">Darul Ulum</span></h1>
          <p className="mt-3 text-sm opacity-80">Mempercepat generasi unggul melalui pendidikan berbasis teknologi, kompetensi, berkarakter mulia, serta siap menghadapi tantangan dunia digital.</p>
          <div className="mt-5"><BtnPrimer to="/ppdb">DAFTAR SEKARANG</BtnPrimer></div>
        </div>
        <Photo label="Foto siswa berseragam" ratio="h-64" className="rounded-3xl" tone={0} />
      </section>

      {/* KEPALA SEKOLAH */}
      <section className="grid gap-6 md:grid-cols-[220px_1fr] items-center">
        <Photo label="Foto Kepala Sekolah" ratio="h-64" className="rounded-2xl" tone={1} />
        <div>
          <p className="text-xs text-slate-500">Sambutan</p>
          <h2 className="font-extrabold">KEPALA SEKOLAH<br />SMK TELEKOMUNIKASI DARUL ULUM</h2>
          <p className="mt-2 text-xs text-slate-600 leading-relaxed">"Selamat datang di SMK Telekomunikasi Darul Ulum. Kami berkomitmen menciptakan lulusan yang unggul, kreatif, inovatif, dan berdaya saing menghadapi dunia kerja. Semoga menjadi pendidikan yang mencetak generasi yang siap menghadapi masa depan."</p>
        </div>
      </section>

      {/* VIDEO PROFIL */}
      <section className="grid gap-6 md:grid-cols-2 items-center">
        <div>
          <Tag>VIDEO PROFIL SEKOLAH</Tag>
          <h2 className="font-extrabold mt-2">Lihat Lebih Dekat Kehidupan di SMK Telekomunikasi Darul Ulum</h2>
          <p className="text-xs text-slate-600 mt-2">Jelajahi lingkungan belajar interaktif, fasilitas modern, dan berbagai aktivitas yang membentuk karakter serta kompetensi siswa kami.</p>
        </div>
        <div className="relative">
          <Photo label="Video profil kampus" ratio="h-52" className="rounded-2xl" tone={2} />
          <span className="absolute inset-0 flex items-center justify-center"><span className="w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold">▶</span></span>
        </div>
      </section>

      {/* PROGRAM */}
      <section className="bg-sky-50/60 rounded-3xl p-6 grid gap-6 md:grid-cols-2 items-center">
        <div>
          <Tag>PROGRAM KEAHLIAN</Tag>
          <h2 className="text-xl font-extrabold mt-2">Membentuk Kompetensi Nyata, Siap untuk Dunia Industri</h2>
          <p className="text-xs text-slate-600 mt-2">Program keahlian kami dirancang sesuai standar industri untuk mencetak lulusan yang kompeten, inovatif, dan siap terjun ke dunia wirausaha.</p>
          <div className="flex gap-2 mt-3 text-[11px]">
            {['PF', 'TKJ', 'RPL', 'DKV'].map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`px-3 py-1 rounded-full font-bold ${tab === t ? 'bg-sky-700 text-white' : 'bg-white border'}`}>{t}</button>
            ))}
          </div>
          <Card className="p-4 mt-3">
            <p className="font-bold text-sm">{tab === 'PF' ? 'Perfilman' : JURUSAN.find((j) => j.kode === tab)?.nama}</p>
            <p className="text-xs text-slate-600 mt-1">{JURUSAN.find((j) => j.kode === tab)?.desc ?? 'Produksi film dan konten kreatif standar industri.'}</p>
            <div className="mt-3"><BtnPrimer to="/jurusan">Lihat Detail →</BtnPrimer></div>
          </Card>
        </div>
        <Photo label="Foto siswi memegang kamera" ratio="h-72" className="rounded-3xl" tone={3} />
      </section>

      {/* STATISTIK */}
      <section className="grid gap-6 md:grid-cols-[1fr_2fr] items-start">
        <div>
          <h2 className="font-extrabold">Bersama Ribuan Siswa, Membangun Masa Depan yang Gemilang</h2>
          <p className="text-xs text-slate-600 mt-2">Kami berkomitmen mencetak ribuan lulusan yang kompeten, berkarakter, dan siap bersaing di tingkat nasional maupun global.</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[['1.200+', 'Siswa Aktif'], ['85', 'Guru & Tendik'], ['5.000+', 'Alumni'], ['150+', 'Mitra Industri']].map(([n, l]) => (
            <Card key={l} className="p-4 text-center"><p className="font-extrabold">{n}</p><p className="text-[11px] text-slate-500">{l}</p></Card>
          ))}
        </div>
      </section>

      {/* MITRA */}
      <section className="text-center">
        <h2 className="font-extrabold">Trusted by Industry Leaders</h2>
        <p className="text-[11px] text-slate-500">Kurikulum kami didukung mitra agar lulusan siap kerja.</p>
        <div className="mt-4 bg-slate-50 rounded-2xl p-6 grid grid-cols-3 sm:grid-cols-4 gap-4 text-xs font-bold text-slate-500">
          {LOGO_MITRA.map((l) => <span key={l} className="bg-white rounded-lg py-3 border">{l}</span>)}
        </div>
      </section>

      {/* BERITA */}
      <section>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] text-slate-500">BERITA & INFORMASI</p>
            <h2 className="font-extrabold text-lg">Informasi Terbaru dari Sekolah</h2>
          </div>
          <a href="#/berita" className="text-xs border rounded-full px-3 py-1.5">Lihat Semua Berita →</a>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-[2fr_1fr]">
          <Card className="overflow-hidden grid md:grid-cols-2">
            <Photo label="Foto prestasi robotik" ratio="h-full min-h-56" tone={0} />
            <div className="p-4">
              <Tag>PRESTASI • 12 Agustus 2026</Tag>
              <p className="font-extrabold mt-2 text-sm">Siswa SMK Telekomunikasi Darul Ulum Raih Juara Kompetisi Teknologi Nasional</p>
              <p className="text-xs text-slate-600 mt-2">Prestasi membanggakan kembali diraih tim robotika sekolah tingkat nasional…</p>
              <div className="mt-3"><BtnPrimer to="/berita/pensla-fest">Baca Selengkapnya</BtnPrimer></div>
            </div>
          </Card>
          <div className="grid gap-4">
            {BERITA.slice(5, 7).map((b, i) => (
              <Card key={b.id} className="overflow-hidden">
                <Photo label={b.judul} ratio="h-24" tone={i + 1} />
                <div className="p-3"><p className="text-xs font-bold">{b.judul}</p><p className="text-[11px] text-slate-500">Baca Selengkapnya →</p></div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ALUMNI */}
      <section className="bg-sky-50/60 rounded-3xl p-6 text-center">
        <p className="text-[11px] text-slate-500">TESTIMONI ALUMNI</p>
        <h2 className="font-extrabold text-lg">Apa Kata Alumni Kami?</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3 text-left">
          {TESTIMONI.map((t, i) => (
            <Card key={t.nama} className="p-4">
              <Photo label={`Foto ${t.nama}`} ratio="h-20 w-20" className="rounded-full mx-auto" tone={i} />
              <p className="font-bold text-sm mt-2 text-center">{t.nama}</p>
              <p className="text-[11px] text-sky-700 text-center">{t.peran}</p>
              <p className="text-xs text-slate-600 mt-2">"{t.teks}"</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
