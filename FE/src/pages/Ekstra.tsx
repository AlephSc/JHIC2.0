import { useState } from 'react';
import { BtnPrimer, Card, Photo, Tag } from '../components/ui';
import { EKSTRA } from '../data';

// Replika Ekstrakulikuler.png
export default function Ekstra() {
  const [f, setF] = useState('Teknologi & Inovasi');
  return (
    <div className="space-y-10">
      <section className="grid gap-6 md:grid-cols-2 items-center">
        <div>
          <Tag>EKSTRAKURIKULER</Tag>
          <h1 className="text-3xl font-extrabold mt-2">Temukan Minat, Kembangkan Potensimu</h1>
          <p className="text-sm text-slate-600 mt-3">Ekstrakurikuler menjadi ruang bagi siswa untuk mengembangkan keterampilan, kreativitas, kerja sama, dan minat di luar kegiatan pembelajaran utama.</p>
          <div className="mt-4"><BtnPrimer>Jelajahi Ekstrakurikuler ↓</BtnPrimer></div>
        </div>
        <Photo label="Foto siswa diskusi laptop" ratio="h-64" className="rounded-2xl" tone={1} />
      </section>
      <section className="bg-stone-100 rounded-3xl p-6">
        <h2 className="text-center font-extrabold">Pilih Sesuai Minatmu</h2>
        <p className="text-center text-xs text-slate-500">Eksplorasi kegiatan yang sesuai dengan minatmu, mulai dari teknologi hingga olahraga.</p>
        <div className="flex justify-center gap-2 mt-3 text-xs">
          {['Teknologi & Inovasi', 'Olahraga'].map((x) => (
            <button key={x} onClick={() => setF(x)} className={`px-4 py-1.5 rounded-full font-bold ${f === x ? 'bg-sky-700 text-white' : 'bg-white border'}`}>{x}</button>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 mt-4">
          {EKSTRA.map((e, i) => (
            <Card key={e.t} className="overflow-hidden">
              <Photo label={e.t} ratio="h-36" tone={i} />
              <div className="p-4"><p className="font-bold">{e.t}</p><p className="text-xs text-slate-600 mt-1">{e.d}</p></div>
            </Card>
          ))}
        </div>
      </section>
      <section className="bg-slate-900 text-white rounded-3xl p-8 grid gap-6 md:grid-cols-2 items-center">
        <div>
          <p className="text-[11px] opacity-60">LEBIH DARI SEKADAR BELAJAR</p>
          <h2 className="font-extrabold text-xl">Temukan Ruang untuk Berkembang</h2>
          <p className="text-xs opacity-70 mt-2">Ekstrakurikuler menjadi ruang bagi siswa untuk mengembangkan minat, keterampilan, kreativitas, dan kerja sama di luar pembelajaran utama.</p>
        </div>
        <Photo label="Kolase ekstrakurikuler" ratio="h-48" className="rounded-[2rem]" tone={2} />
      </section>
    </div>
  );
}
