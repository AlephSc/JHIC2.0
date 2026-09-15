import { useState } from 'react';
import { BtnOutline, BtnPrimer, Card, IconBox, Photo, PhotoBlob, PillFilter, Tag } from '../components/ui';

// SMKT_Style Produk Unggulan: hero + filter + grid produk + spotlight + timeline + portofolio + CTA.
const PRODUK = [
  { kat: 'Teknologi', t: 'Website & Sistem Informasi', d: 'Pengembangan solusi digital terintegrasi untuk instansi maupun perorangan.', ikon: '🌐' },
  { kat: 'Kreatif', t: 'Desain & Media Kreatif', d: 'Identitas visual, branding, dan materi promosi oleh tim kreatif siswa.', ikon: '🎨' },
  { kat: 'Multimedia', t: 'Produksi Foto & Video', d: 'Dokumentasi, iklan, dan konten video profesional.', ikon: '🎥' },
  { kat: 'Jasa', t: 'Servis & Perawatan Perangkat', d: 'Perbaikan komputer, laptop, dan printer untuk instansi maupun perorangan yang ditangani langsung oleh teknisi handal.', ikon: '🔧', lebar: true },
];
const PORTOFOLIO = ['Website Sekolah', 'Desain Branding', 'Dokumentasi Foto & Video', 'Project Teknologi'];

export default function Produk() {
  const [f, setF] = useState('Semua');
  const list = PRODUK.filter((p) => f === 'Semua' || p.kat === f);
  return (
    <div className="space-y-16">
      <section className="grid gap-8 md:grid-cols-2 items-center">
        <div>
          <Tag>PRODUK UNGGULAN SEKOLAH</Tag>
          <h1 className="text-4xl font-extrabold mt-3 leading-[1.1]">Karya Siswa, Solusi Nyata</h1>
          <p className="text-sm text-muted mt-4 leading-relaxed">Melalui unit produksi sekolah, siswa tidak hanya belajar secara teori tetapi juga menghasilkan karya dan layanan yang dapat dimanfaatkan masyarakat maupun mitra industri.</p>
          <div className="mt-5"><BtnPrimer onClick={() => document.getElementById('produk')?.scrollIntoView({ behavior: 'smooth' })}>Jelajahi Produk →</BtnPrimer></div>
        </div>
        <PhotoBlob label="Foto siswa perakitan produk" ratio="h-64" tone={1} />
      </section>

      <section id="produk">
        <h2 className="text-center text-2xl font-extrabold">Produk & Layanan Unggulan</h2>
        <div className="mt-5 flex justify-center"><PillFilter options={['Semua', 'Teknologi', 'Kreatif', 'Multimedia', 'Jasa']} value={f} onChange={setF} /></div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-8">
          {list.map((p) => (
            <Card key={p.t} className={`p-6 ${p.lebar ? 'sm:col-span-2 lg:col-span-3' : ''}`}>
              <div className="flex justify-between items-start">
                <IconBox>{p.ikon}</IconBox>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand bg-blue-badge rounded-full px-2.5 py-1">{p.kat}</span>
              </div>
              <p className="font-head font-bold mt-4">{p.t}</p>
              <p className="text-xs text-muted mt-1.5 leading-relaxed">{p.d}</p>
              <a href="#/ppdb" className="text-xs font-bold text-brand mt-3 inline-block">Lihat Detail →</a>
            </Card>
          ))}
        </div>
      </section>

      {/* SPOTLIGHT */}
      <section className="grid gap-6 md:grid-cols-2 items-center bg-blue-soft/60 rounded-[2.5rem] p-8">
        <Photo label="Spotlight produk pilihan" ratio="h-60" tone={2} />
        <div>
          <Tag>PRODUK PILIHAN</Tag>
          <h2 className="text-2xl font-extrabold mt-3">Website & Sistem Informasi</h2>
          <ul className="mt-4 space-y-2 text-sm text-navy-text">
            {['Dibuat melalui pembelajaran berbasis praktik', 'Standar kualitas industri', 'Didampingi guru produktif berpengalaman'].map((x) => (
              <li key={x} className="flex gap-2"><span className="text-brand font-bold">✓</span>{x}</li>
            ))}
          </ul>
          <div className="mt-5"><BtnPrimer to="/ppdb">Hubungi Kami →</BtnPrimer></div>
        </div>
      </section>

      {/* TIMELINE */}
      <section>
        <h2 className="text-center text-2xl font-extrabold">Dari Pembelajaran Menjadi Karya</h2>
        <div className="grid gap-5 md:grid-cols-4 mt-8">
          {[['01', 'Belajar', 'Memahami teori dasar dan standar industri.'], ['02', 'Praktik', 'Menerapkan keterampilan di lab dan project nyata.'], ['03', 'Produksi', 'Mengerjakan orderan dan project unit produksi.'], ['04', 'Hasil', 'Karya dinikmati masyarakat dan mitra industri.']].map(([n, t, d]) => (
            <Card key={n} className="p-6">
              <p className="text-2xl font-extrabold text-brand">{n}</p>
              <p className="font-head font-bold mt-2">{t}</p>
              <p className="text-xs text-muted mt-1.5">{d}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* PORTOFOLIO */}
      <section>
        <div className="flex items-end justify-between">
          <div>
            <Tag>PORTOFOLIO SISWA</Tag>
            <h2 className="text-2xl font-extrabold mt-3">Karya yang Telah Dibuat</h2>
          </div>
          <div className="hidden sm:flex gap-2 text-gray-400 text-lg"><span>←</span><span>→</span></div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mt-6">
          {PORTOFOLIO.map((p, i) => (
            <Card key={p} className="overflow-hidden">
              <Photo label={p} ratio="h-36" tone={i} className="rounded-none" />
              <p className="font-head font-bold text-sm p-4">{p}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy-950 text-white rounded-[2.5rem] px-8 py-14 text-center">
        <h2 className="text-2xl font-extrabold">Punya Ide atau Kebutuhan Project?</h2>
        <p className="text-sm text-white/60 mt-2">Unit produksi kami siap membantu kebutuhan digital dan kreatif Anda.</p>
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <BtnPrimer to="/ppdb">Hubungi Kami →</BtnPrimer>
          <BtnOutline light to="/produk">Lihat Portofolio</BtnOutline>
        </div>
      </section>
    </div>
  );
}
