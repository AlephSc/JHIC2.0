import { useEffect, useState } from 'react';
import { apiGet } from '../lib/api';

interface BeritaItem { id: string; judul: string; tanggal: string }

const FALLBACK: BeritaItem[] = [
  { id: 'b1', judul: 'Siswa Raih Juara Teknologi Nasional (cache)', tanggal: '12 Agu 2026' },
  { id: 'b2', judul: 'TKA 2025 Kelas 12 (cache)', tanggal: '02 Agu 2026' },
  { id: 'b3', judul: 'AXIO Class Kolaborasi Industri (cache)', tanggal: '28 Jul 2026' },
];

export default function Berita() {
  const [q, setQ] = useState('');
  const [items, setItems] = useState<BeritaItem[]>(FALLBACK);
  const [mode, setMode] = useState<'live' | 'cache'>('cache');

  useEffect(() => {
    // BE PPDB/berita penuh belum ada → coba, gagal = tetap tampil cache (L1).
    apiGet<{ data: BeritaItem[] }>('/knowledge', { q: 'berita', limit: '5' }, 4000)
      .then(() => setMode('cache'))
      .catch(() => setMode('cache'));
  }, []);

  const filtered = items.filter((b) => b.judul.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-extrabold">Cerita, Prestasi, dan Informasi Terbaru</h1>
      <p className="text-xs text-slate-500">Mode: {mode === 'cache' ? 'data tersimpan (tetap bisa dibaca saat BE down)' : 'live'} • Sumber: Berita.png</p>
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari berita, pengumuman, kegiatan..." className="w-full border rounded-full px-4 py-2 text-sm" />
      <div className="grid gap-3 sm:grid-cols-3">
        {filtered.map((b) => (
          <article key={b.id} className="rounded-2xl border overflow-hidden">
            <div className="h-28 bg-slate-200" />
            <div className="p-3">
              <p className="text-[11px] text-slate-500">{b.tanggal}</p>
              <p className="text-sm font-bold">{b.judul}</p>
              <span className="text-xs text-sky-700">Baca Selengkapnya →</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
