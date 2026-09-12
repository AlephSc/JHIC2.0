import { useState } from 'react';
import { BtnGaris, BtnPrimer, Card, Photo, Tag } from '../components/ui';
import { JURUSAN, RPL_KOMPETENSI } from '../data';

// Replika Jurusan.png: hero → cek potensi navy → tab jurusan → kompetensi → fasilitas → CTA.
const TABS = ['RPL', 'DKV', 'TKJ', 'PF'];

export default function Jurusan() {
  const [tab, setTab] = useState('RPL');
  const aktif = JURUSAN.find((j) => j.kode === tab)!;
  return (
    <div className="space-y-12">
      <section className="grid gap-6 md:grid-cols-2 items-center">
        <div>
          <h1 className="text-3xl font-extrabold">Temukan Jurusan yang Sesuai dengan Potensimu</h1>
          <p className="text-sm text-slate-600 mt-3">Kurikulum berbasis industri, fasilitas modern, dan pendampingan karakter. Siap mencetak lulusan yang kreatif, inovatif, dan siap kerja.</p>
          <div className="mt-4"><BtnPrimer to="/cek-potensi">Jelajahi Program Keahlian</BtnPrimer></div>
        </div>
        <div className="bg-sky-100 rounded-[2rem] h-56" />
      </section>

      <section className="bg-slate-900 text-white rounded-3xl p-6 grid gap-6 md:grid-cols-2">
        <div>
          <p className="text-[11px] opacity-70">BINGUNG PILIH JURUSAN?</p>
          <h2 className="font-extrabold text-lg">Temukan Jurusan yang Cocok dengan Potensimu</h2>
          <p className="text-xs opacity-70 mt-2">Jawab beberapa pertanyaan singkat tentang minat, cara berpikir, dan aktivitas yang kamu sukai. Kami akan memberikan rekomendasi program keahlian yang paling sesuai untukmu.</p>
          <div className="mt-3 flex gap-2 items-center">
            <BtnPrimer to="/cek-potensi">Cek Potensi Kamu →</BtnPrimer>
            <span className="text-[11px] opacity-60">Hanya membutuhkan sekitar 2-3 menit</span>
          </div>
          <p className="text-[11px] opacity-50 mt-6">01 — Jawab Pertanyaan &nbsp;&nbsp; 02 — Analisis Potensi &nbsp;&nbsp; 03 — Dapatkan Rekomendasi</p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-center text-[11px]">
          {[['PF', 'Perfilman'], ['TKJ', 'Teknik Komputer & Jaringan'], ['RPL', 'Rekayasa Perangkat Lunak'], ['DKV', 'Desain Komunikasi Visual']].map(([k, n]) => (
            <div key={k} className="bg-white/10 rounded-xl p-4"><p className="font-extrabold">{k}</p><p className="opacity-70">{n}</p></div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex flex-wrap justify-center gap-2 text-xs">
          {TABS.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-1.5 rounded-full border font-bold ${tab === t ? 'bg-slate-900 text-white' : ''}`}>
              {t === 'RPL' ? 'Rekayasa Perangkat Lunak' : t === 'DKV' ? 'Desain Komunikasi Visual' : t === 'TKJ' ? 'Teknik Komputer & Jaringan' : 'Perfilman'}
            </button>
          ))}
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-2 items-start">
          <div>
            <h2 className="text-xl font-extrabold">{aktif.nama} ({aktif.kode})</h2>
            <p className="text-sm text-slate-600 mt-2">{aktif.desc}</p>
          </div>
          <Photo label={`Foto kegiatan ${aktif.kode}`} ratio="h-44" className="rounded-2xl" tone={1} />
        </div>
        <p className="text-center text-xs font-bold mt-8">Kompetensi yang Dipelajari</p>
        <div className="grid gap-3 sm:grid-cols-3 mt-3">
          {RPL_KOMPETENSI.map((k) => (
            <Card key={k.t} className="p-4"><p className="font-bold text-sm">{k.t}</p><p className="text-xs text-slate-600 mt-1">{k.d}</p></Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-center font-extrabold">Fasilitas Standar Industri</h2>
        <p className="text-center text-xs text-slate-500">Kami menyediakan lingkungan belajar yang mensimulasikan dunia kerja sesungguhnya.</p>
        <div className="grid gap-4 sm:grid-cols-3 mt-4">
          {['Laboratorium Komputer', 'Studio Kreatif', 'Lab Jaringan & Server'].map((f, i) => (
            <Card key={f} className="overflow-hidden">
              <Photo label={f} ratio="h-32" tone={i} />
              <div className="p-3"><p className="font-bold text-sm">{f}</p></div>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-slate-900 text-white rounded-3xl p-8 text-center">
        <h2 className="font-extrabold text-lg">Sudah Menemukan Jurusan yang Cocok?</h2>
        <p className="text-xs opacity-70">Mari bangun masa depan gemilang bersama SMK Telekomunikasi Darul Ulum. Kuota pendaftaran terbatas.</p>
        <div className="mt-4 flex justify-center gap-2">
          <BtnPrimer to="/ppdb">Daftar PPDB Sekarang</BtnPrimer>
          <BtnGaris to="/cek-potensi">Konsultasi Jurusan</BtnGaris>
        </div>
      </section>
    </div>
  );
}
