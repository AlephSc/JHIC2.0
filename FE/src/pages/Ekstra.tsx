import { useState } from 'react';
import { BtnOutline, BtnPrimer, Card, IconBox, Photo, PhotoBlob, PillFilter, Tag } from '../components/ui';
import { EKSTRA } from '../data';

// SMKT_Style Ekstrakurikuler: hero + filter pill fungsional + grid kartu + panel navy penutup.
const KATEGORI: Record<string, string[]> = {
  'Teknologi & Inovasi': ['Desain Website', 'Robotik', 'Servis HP & Perangkat', 'Pemrograman'],
  'Olahraga': ['Futsal', 'Badminton', 'Basket', 'Panahan'],
};
const DESC: Record<string, string> = {
  'Desain Website': 'Pelajari UI/UX dan bangun website responsif yang menarik secara visual dan fungsional.',
  'Robotik': 'Rancang, rakit, dan program robot otonom untuk berbagai tantangan inovatif.',
  'Servis HP & Perangkat': 'Kuasai perbaikan perangkat keras dan lunak mobile, skill praktis yang siap kerja.',
  'Pemrograman': 'Asah logika dan bangun aplikasi perangkat lunak dari dasar hingga tingkat lanjut.',
  'Futsal': 'Latihan rutin dan turnamen antar sekolah untuk kebugaran dan sportivitas.',
  'Badminton': 'Pengembangan teknik bulutangkis dengan pelatih berpengalaman.',
  'Basket': 'Latihan teknik dasar dan strategi pertandingan basket.',
  'Panahan': 'Konsentrasi, presisi, dan teknik panahan standar kompetisi.',
};

export default function Ekstra() {
  const [f, setF] = useState('Teknologi & Inovasi');
  const list = KATEGORI[f] ?? [];
  return (
    <div className="space-y-16">
      <section className="grid gap-8 md:grid-cols-2 items-center">
        <div>
          <Tag>EKSTRAKURIKULER</Tag>
          <h1 className="text-4xl font-extrabold mt-3 leading-[1.1]">Temukan Minat, Kembangkan Potensimu</h1>
          <p className="text-sm text-muted mt-4 leading-relaxed">Ekstrakurikuler menjadi ruang bagi siswa untuk mengembangkan keterampilan, kreativitas, kerja sama, dan minat di luar kegiatan pembelajaran utama.</p>
          <div className="mt-5"><BtnPrimer onClick={() => document.getElementById('ekstra')?.scrollIntoView({ behavior: 'smooth' })}>Jelajahi Ekstrakurikuler ↓</BtnPrimer></div>
        </div>
        <PhotoBlob label="Foto siswa diskusi laptop" ratio="h-64" tone={0} />
      </section>

      <section id="ekstra" className="bg-[#f5f1e8] rounded-[2.5rem] p-8">
        <p className="font-head font-bold">Pilih Sesuai Minatmu</p>
        <div className="mt-4"><PillFilter options={Object.keys(KATEGORI)} value={f} onChange={setF} /></div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mt-8">
          {list.map((t, i) => (
            <Card key={t} className="p-5 shadow-sm">
              <IconBox>{['🌐', '🤖', '🔧', '⌨️', '⚽', '🏸', '🏀', '🏹'][i % 8]}</IconBox>
              <p className="font-head font-bold text-sm mt-3">{t}</p>
              <p className="text-[11px] text-muted mt-1.5 leading-relaxed">{DESC[t]}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-navy-950 text-white rounded-[2.5rem] px-8 py-14 text-center">
        <h2 className="text-2xl font-extrabold">Temukan Ruang untuk Berkembang</h2>
        <p className="text-sm text-white/60 mt-2 max-w-xl mx-auto">Setiap siswa punya bakat unik. Ekstrakurikuler kami dirancang agar kamu menemukan panggung yang tepat.</p>
        <div className="mt-6 flex justify-center"><Photo label="Kolase ekstrakurikuler — Blend. Beyond. Believe." ratio="h-52 w-full max-w-2xl" tone={3} /></div>
      </section>
    </div>
  );
}
