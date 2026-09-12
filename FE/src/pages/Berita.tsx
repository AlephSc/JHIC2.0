import { useState } from 'react';
import { Card, Photo } from '../components/ui';
import { BERITA } from '../data';

// Replika Berita.png: hero featured → search/filter → grid → pagination.
const FILTER = ['Semua', 'Kegiatan Sekolah', 'Prestasi', 'Pengumuman', 'Kemitraan & Kerja Sama', 'Karya & Inovasi Siswa'];

export default function Berita() {
  const [f, setF] = useState('Semua');
  const [q, setQ] = useState('');
  const list = BERITA.filter((b) => (f === 'Semua' || b.kat === f) && (b.judul + b.ringkas).toLowerCase().includes(q.toLowerCase()));
  const feat = BERITA[0];
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-extrabold text-center">Cerita, Prestasi, dan<br />Informasi Terbaru <span className="font-normal">dari Sekolah</span></h1>
      <Card className="overflow-hidden grid md:grid-cols-2">
        <Photo label="Foto juara kompetisi" ratio="h-64" tone={0} />
        <div className="p-6">
          <p className="text-[11px] text-slate-500"><span className="bg-slate-100 rounded-full px-2 py-0.5 font-bold">{feat.kat}</span> &nbsp;{feat.tgl}</p>
          <p className="font-extrabold text-xl mt-2">{feat.judul}</p>
          <p className="text-xs text-slate-600 mt-2">Tim robotika sekolah berhasil meraih juara pertama dalam ajang National Tech Innovation Showcase 2026…</p>
          <a href={`#/berita/${feat.id}`} className="text-xs font-bold mt-4 inline-block">Baca Selengkapnya →</a>
        </div>
      </Card>
      <Card className="p-4">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari berita, pengumuman, atau kegiatan..." className="w-full bg-stone-100 rounded-lg px-4 py-2.5 text-sm" />
        <div className="flex flex-wrap gap-2 mt-3 text-[11px]">
          {FILTER.map((x) => (
            <button key={x} onClick={() => setF(x)} className={`px-3 py-1 rounded-full border font-semibold ${f === x ? 'bg-slate-900 text-white' : ''}`}>{x}</button>
          ))}
        </div>
      </Card>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {list.slice(1).map((b, i) => (
          <Card key={b.id} className="overflow-hidden">
            <Photo label={b.judul} ratio="h-32" tone={i} />
            <div className="p-3">
              <p className="text-[10px] font-bold bg-slate-100 inline-block rounded-full px-2 py-0.5">{b.kat}</p>
              <p className="text-[11px] text-slate-500 mt-1">{b.tgl}</p>
              <p className="font-extrabold text-sm">{b.judul}</p>
              <p className="text-[11px] text-slate-500 mt-1">{b.ringkas}</p>
              <a href={`#/berita/${b.id}`} className="text-[11px] text-sky-700 font-semibold">Baca Selengkapnya →</a>
            </div>
          </Card>
        ))}
      </div>
      <div className="flex justify-center gap-2 text-xs">
        {['←', '1', '2', '3', '…', '10', '→'].map((p) => <span key={p} className={`w-8 h-8 rounded-full border flex items-center justify-center ${p === '1' ? 'bg-sky-700 text-white font-bold' : ''}`}>{p}</span>)}
      </div>
    </div>
  );
}
