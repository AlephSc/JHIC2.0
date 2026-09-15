import { useState } from 'react';
import { BtnPrimer, Card, Photo, PillFilter } from '../components/ui';
import { BERITA } from '../data';

// SMKT_Style Berita: hero center + featured 2 kolom + search/filter fungsional + grid + pagination.
const FILTER = ['Semua', 'Kegiatan Sekolah', 'Prestasi', 'Pengumuman', 'Kemitraan & Kerja Sama', 'Karya & Inovasi Siswa'];

export default function Berita() {
  const [f, setF] = useState('Semua');
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const list = BERITA.filter((b) => (f === 'Semua' || b.kat === f.toUpperCase()) && (b.judul + b.ringkas).toLowerCase().includes(q.toLowerCase()));
  const feat = BERITA[0];
  const grid = list.slice(1, 9);
  return (
    <div className="space-y-10">
      <h1 className="text-4xl font-extrabold text-center leading-[1.15]">Cerita, Prestasi, dan<br />Informasi Terbaru <span className="text-brand">dari Sekolah</span></h1>

      {/* FEATURED */}
      <Card className="overflow-hidden grid md:grid-cols-2">
        <Photo label="Foto juara kompetisi" ratio="h-64" tone={0} className="rounded-none" />
        <div className="p-8 flex flex-col justify-center">
          <span className="inline-block w-fit text-[10px] font-bold uppercase tracking-widest text-brand bg-blue-badge rounded-full px-3 py-1.5">{feat.kat}</span>
          <p className="text-[11px] text-gray-400 mt-3">{feat.tgl}</p>
          <p className="font-head font-extrabold text-xl mt-1 leading-snug">{feat.judul}</p>
          <p className="text-sm text-body-text/80 mt-3 leading-relaxed">Tim robotika sekolah berhasil meraih juara pertama dalam ajang National Tech Innovation Showcase 2026…</p>
          <div className="mt-5"><BtnPrimer to={`/berita/${feat.id}`}>Baca Selengkapnya →</BtnPrimer></div>
        </div>
      </Card>

      {/* SEARCH + FILTER */}
      <Card className="p-5">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} placeholder="Cari berita, pengumuman, atau kegiatan..." className="w-full bg-gray-100 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 ring-brand/30" />
        </div>
        <div className="mt-4"><PillFilter options={FILTER} value={f} onChange={(x) => { setF(x); setPage(1); }} /></div>
      </Card>

      {/* GRID */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {grid.map((b, i) => (
          <Card key={b.id} className="overflow-hidden group">
            <div className="relative">
              <Photo label={b.judul} ratio="h-36" tone={i} className="rounded-none" />
              <span className="absolute top-3 left-3 text-[9px] font-bold uppercase tracking-widest text-brand bg-white/95 rounded-full px-2.5 py-1">{b.kat}</span>
            </div>
            <div className="p-4">
              <p className="text-[10px] text-gray-400">{b.tgl}</p>
              <p className="font-head font-extrabold text-sm uppercase mt-1 leading-snug">{b.judul}</p>
              <p className="text-[11px] text-body-text/80 mt-1.5 line-clamp-2">{b.ringkas}</p>
              <a href={`#/berita/${b.id}`} className="text-[11px] text-brand font-bold mt-2 inline-block">Baca Selengkapnya →</a>
            </div>
          </Card>
        ))}
        {grid.length === 0 && <p className="col-span-full text-center text-sm text-body-text/80 py-10">Tidak ada berita yang cocok dengan filter pencarian.</p>}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-2 text-xs">
        <button onClick={() => setPage(Math.max(1, page - 1))} className="w-9 h-9 rounded-full border border-line-soft bg-white flex items-center justify-center">←</button>
        {[1, 2, 3].map((p) => (
          <button key={p} onClick={() => setPage(p)} className={`w-9 h-9 rounded-full flex items-center justify-center font-bold ${page === p ? 'bg-brand text-white' : 'border border-line-soft bg-white'}`}>{p}</button>
        ))}
        <span className="w-9 h-9 rounded-full border border-line-soft bg-white flex items-center justify-center text-gray-400">…</span>
        <button onClick={() => setPage(10)} className={`w-9 h-9 rounded-full flex items-center justify-center font-bold ${page === 10 ? 'bg-brand text-white' : 'border border-line-soft bg-white'}`}>10</button>
        <button onClick={() => setPage(Math.min(10, page + 1))} className="w-9 h-9 rounded-full border border-line-soft bg-white flex items-center justify-center">→</button>
      </div>
    </div>
  );
}
