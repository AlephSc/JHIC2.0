import { useState } from 'react';
import { BtnOutline, BtnPrimer, Card, Photo, PhotoBlob, StatCard, Tag } from '../components/ui';
import { BERITA, LOGO_MITRA, TESTIMONI } from '../data';

// SMKT_Style Landing: ritme krem → navy → putih → biru muda → navy CTA → footer putih.
// Hero 2 kolom 45/55, blob dekoratif, judul rata kiri, section CTA center.
export default function Home() {
  const [tab, setTab] = useState('PF');
  const tabDesc: Record<string, string> = {
    PF: 'Seni penyutradaraan, sinematografi, penulisan skenario, dan pasca-produksi video standar industri.',
    TKJ: 'Infrastruktur jaringan, server, keamanan siber, dan administrasi sistem.',
    RPL: 'Pemrograman, web development, database, mobile, dan API.',
    DKV: 'Desain grafis, ilustrasi, branding, dan media kreatif.',
  };
  return (
    <div className="space-y-20 -mt-2">
      {/* HERO — navy + blob + foto */}
      <section className="relative bg-navy-950 text-white px-8 pt-16 pb-20 grid gap-8 md:grid-cols-[45fr_55fr] items-center overflow-hidden">
        <div className="blob w-96 h-96 -left-24 -top-24 opacity-20" />
        <div className="blob w-72 h-72 right-1/3 -bottom-20 opacity-15" />
        <div className="relative z-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-sky-300">SMK Telekomunikasi Darul Ulum</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-[1.1] mt-3">Mempercepat Generasi<br />Ungul Berbasis<br /><span className="text-sky-400">Teknologi</span></h1>
          <p className="mt-4 text-sm text-white/70 leading-relaxed max-w-md">Membangun kompetensi nyata, karakter mulia, dan kesiapan menghadapi tantangan dunia digital bersama kurikulum standar industri.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <BtnPrimer to="/ppdb">DAFTAR SEKARANG →</BtnPrimer>
            <BtnOutline light to="/jurusan">Jelajahi Jurusan</BtnOutline>
          </div>
        </div>
        <PhotoBlob label="Foto siswa berseragam" ratio="h-72" tone={0} className="relative z-10" />
      </section>

      {/* KEPALA SEKOLAH — krem */}
      <section className="grid gap-8 md:grid-cols-[240px_1fr] items-center">
        <div className="relative">
          <div className="blob w-52 h-52 -left-4 -top-4" />
          <Photo label="Foto Kepala Sekolah" ratio="h-64" tone={1} className="relative z-10 w-full border-4 border-blue-soft" />
        </div>
        <div>
          <Tag>SAMBUTAN</Tag>
          <h2 className="text-2xl font-extrabold mt-3">KEPALA SEKOLAH<br /><span className="text-brand">SMK TELEKOMUNIKASI DARUL ULUM</span></h2>
          <p className="mt-4 text-sm text-muted leading-relaxed">"Selamat datang di SMK Telekomunikasi Darul Ulum. Kami berkomitmen menciptakan lulusan yang unggul, kreatif, inovatif, dan berdaya saing menghadapi dunia kerja. Semoga menjadi pendidikan yang mencetak generasi yang siap menghadapi masa depan."</p>
        </div>
      </section>

      {/* VIDEO PROFIL */}
      <section className="grid gap-8 md:grid-cols-2 items-center">
        <div>
          <Tag>VIDEO PROFIL SEKOLAH</Tag>
          <h2 className="text-3xl font-extrabold mt-3">Lihat Lebih Dekat Kehidupan di SMK Telekomunikasi Darul Ulum</h2>
          <p className="text-sm text-muted mt-3 leading-relaxed">Jelajahi lingkungan belajar interaktif, fasilitas modern, dan berbagai aktivitas yang membentuk karakter serta kompetensi siswa kami.</p>
        </div>
        <div className="relative">
          <div className="blob w-64 h-64 -right-8 -bottom-8" />
          <div className="relative z-10 img-frame">
            <Photo label="Video profil kampus" ratio="h-56 w-full" tone={2} className="rounded-none" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-14 h-14 bg-white shadow-xl rounded-full flex items-center justify-center text-brand text-xl pl-1">▶</span>
            </span>
          </div>
        </div>
      </section>

      {/* PROGRAM KEAHLIAN — biru muda */}
      <section className="bg-blue-soft/60 rounded-[2.5rem] p-8 grid gap-8 md:grid-cols-2 items-center">
        <div>
          <Tag>PROGRAM KEAHLIAN</Tag>
          <h2 className="text-3xl font-extrabold mt-3">Membentuk Kompetensi Nyata, Siap untuk Dunia Industri</h2>
          <p className="text-sm text-muted mt-3">Program keahlian kami dirancang sesuai standar industri untuk mencetak lulusan yang kompeten, inovatif, dan siap terjun ke dunia wirausaha.</p>
          <div className="flex gap-2 mt-5">
            {['PF', 'TKJ', 'RPL', 'DKV'].map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${tab === t ? 'bg-navy-950 text-white' : 'bg-white border border-line text-navy-text'}`}>{t}</button>
            ))}
          </div>
          <Card className="p-5 mt-4">
            <p className="font-head font-bold">{tab === 'PF' ? 'Perfilman / Produksi Film' : tab}</p>
            <p className="text-xs text-muted mt-2 leading-relaxed">{tabDesc[tab]}</p>
            <ul className="grid grid-cols-2 gap-1.5 mt-3 text-[11px] text-navy-text">
              {tabDesc[tab].split(', ').map((x) => <li key={x} className="flex gap-1.5"><span className="text-brand">✓</span>{x}</li>)}
            </ul>
            <div className="mt-4"><BtnPrimer to="/jurusan">Lihat Detail →</BtnPrimer></div>
          </Card>
        </div>
        <PhotoBlob label="Foto siswi memegang kamera" ratio="h-72" tone={3} />
      </section>

      {/* STATISTIK */}
      <section className="grid gap-8 md:grid-cols-[1fr_2fr] items-center">
        <div>
          <h2 className="text-2xl font-extrabold">Bersama Ribuan Siswa, Membangun Masa Depan yang Gemilang</h2>
          <p className="text-sm text-muted mt-3">Kami berkomitmen mencetak ribuan lulusan yang kompeten, berkarakter, dan siap bersaing di tingkat nasional maupun global.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard n="1.200+" l="Siswa Aktif" />
          <StatCard n="85" l="Guru & Tendik" />
          <StatCard n="5.000+" l="Alumni" />
          <StatCard n="150+" l="Mitra Industri" />
        </div>
      </section>

      {/* MITRA */}
      <section className="text-center">
        <Tag>MITRA INDUSTRI</Tag>
        <h2 className="text-3xl font-extrabold mt-3">Trusted by Industry Leaders</h2>
        <p className="text-sm text-muted mt-2">Kurikulum kami didukung mitra agar lulusan siap kerja.</p>
        <div className="mt-6 bg-white rounded-3xl border border-line p-6 grid grid-cols-3 sm:grid-cols-4 gap-4 text-sm font-bold text-gray-500">
          {LOGO_MITRA.map((l) => <span key={l} className="bg-gray-100 rounded-xl py-3.5">{l}</span>)}
        </div>
      </section>

      {/* BERITA */}
      <section>
        <div className="flex items-end justify-between">
          <div>
            <Tag>BERITA & INFORMASI</Tag>
            <h2 className="text-2xl font-extrabold mt-3">Informasi Terbaru dari Sekolah</h2>
          </div>
          <BtnOutline to="/berita">Lihat Semua Berita →</BtnOutline>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-[2fr_1fr]">
          <Card className="overflow-hidden grid md:grid-cols-2">
            <Photo label="Foto prestasi robotik" ratio="h-full min-h-56" tone={0} className="rounded-none" />
            <div className="p-6">
              <Tag>PRESTASI</Tag>
              <p className="text-[11px] text-gray-400 mt-2">12 Agustus 2026</p>
              <p className="font-head font-extrabold mt-1">Siswa SMK Telekomunikasi Darul Ulum Raih Juara Kompetisi Teknologi Nasional</p>
              <p className="text-xs text-muted mt-2 leading-relaxed">Prestasi membanggakan kembali diraih tim robotika sekolah tingkat nasional…</p>
              <div className="mt-4"><BtnPrimer to="/berita/pensla-fest">Baca Selengkapnya</BtnPrimer></div>
            </div>
          </Card>
          <div className="grid gap-5">
            {BERITA.slice(5, 7).map((b, i) => (
              <Card key={b.id} className="overflow-hidden grid grid-cols-[110px_1fr]">
                <Photo label={b.judul} ratio="h-full" tone={i + 1} className="rounded-none" />
                <div className="p-4">
                  <p className="text-[10px] font-bold uppercase text-brand">{b.kat}</p>
                  <p className="text-xs font-bold mt-1 leading-snug">{b.judul}</p>
                  <a href={`#/berita/${b.id}`} className="text-[11px] text-brand font-bold mt-2 inline-block">Baca Selengkapnya →</a>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ALUMNI */}
      <section className="bg-blue-soft/60 rounded-[2.5rem] p-8 text-center">
        <Tag>TESTIMONI ALUMNI</Tag>
        <h2 className="text-2xl font-extrabold mt-3">Apa Kata Alumni Kami?</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3 text-left">
          {TESTIMONI.map((t, i) => (
            <Card key={t.nama} className="p-6">
              <div className="text-amber-400 tracking-widest">★★★★★</div>
              <p className="text-sm text-muted mt-3 leading-relaxed">"{t.teks}"</p>
              <div className="flex items-center gap-3 mt-4">
                <Photo label={t.nama} ratio="h-11 w-11" className="rounded-full" tone={i} />
                <div>
                  <p className="font-head font-bold text-sm">{t.nama}</p>
                  <p className="text-[11px] text-brand uppercase tracking-wide">{t.peran}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA PENUTUP — navy */}
      <section className="bg-navy-950 rounded-[2.5rem] px-8 py-16 text-center text-white">
        <h2 className="text-3xl font-extrabold">Siap Bergabung dengan Generasi Unggul?</h2>
        <p className="text-sm text-white/60 mt-3 max-w-xl mx-auto">Daftarkan dirimu sekarang dan mulai perjalanan menjadi profesional teknologi masa depan.</p>
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <BtnPrimer to="/ppdb">Daftar PPDB 2026 →</BtnPrimer>
          <BtnOutline light to="/cek-potensi">Cek Potensi Kamu</BtnOutline>
        </div>
      </section>
    </div>
  );
}
