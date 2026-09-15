import { useState } from 'react';
import { BtnDark, BtnOutline, BtnPrimer, Card, IconBox, Photo, PhotoBlob, PillFilter } from '../components/ui';
import { LOWONGAN } from '../data';

// SMKT_Style BKK: hero biru muda + value prop ikon + kartu beige + filter lowongan + steps + agenda + CTA navy.
const AGENDA = [
  { tgl: 'OCT', hari: '15', t: 'Campus Recruitment — Indosat', tempat: 'Aula GSG' },
  { tgl: 'OCT', hari: '22', t: 'Workshop CV & ATS', tempat: 'Lab Komputer 3' },
  { tgl: 'NOV', hari: '05', t: 'Simulasi Wawancara Kerja', tempat: 'Ruang BKK' },
];

export default function Bkk() {
  const [f, setF] = useState('Semua');
  const list = LOWONGAN.filter((l) => f === 'Semua' || l.jurusan === f);
  return (
    <div className="space-y-16 -mt-2">
      {/* HERO biru muda */}
      <section className="bg-blue-soft/70 rounded-[2.5rem] p-8 grid gap-8 md:grid-cols-2 items-center">
        <div>
          <h1 className="text-4xl font-extrabold leading-[1.1]">BURSA KERJA KHUSUS</h1>
          <p className="font-head font-bold text-brand mt-2">Langkah Awal Menuju <span className="text-navy">Dunia Kerja</span></p>
          <p className="text-sm text-body-text/80 mt-3 leading-relaxed">BKK SMK Telekomunikasi Darul Ulum membantu siswa dan alumni menemukan peluang kerja, mengikuti proses rekrutmen, serta mempersiapkan diri menghadapi dunia profesional.</p>
          <p className="text-[11px] text-navy font-bold mt-3">Lowongan Kerja • Rekrutmen • Persiapan Karier</p>
          <div className="mt-5 flex gap-3">
            <BtnPrimer onClick={() => document.getElementById('lowongan')?.scrollIntoView({ behavior: 'smooth' })}>Lihat Lowongan →</BtnPrimer>
            <BtnOutline to="/alumni">Kenali BKK</BtnOutline>
          </div>
        </div>
        <PhotoBlob label="Foto alumni di dunia kerja" ratio="h-64" tone={0} />
      </section>

      {/* VALUE PROP */}
      <section className="grid md:grid-cols-3 gap-5">
        {[['📋', 'Informasi Lowongan', 'Lowongan Kerja'], ['🤝', 'Rekrutmen & Penyaluran', 'Rekrutmen Perusahaan'], ['🎯', 'Persiapan Karier', 'Pembekalan Karier']].map(([ic, t, d]) => (
          <Card key={t} className="p-6 flex items-start gap-4">
            <IconBox>{ic}</IconBox>
            <div><p className="font-head font-bold text-sm">{t}</p><p className="text-xs text-body-text/80 mt-1">{d}</p></div>
          </Card>
        ))}
      </section>

      {/* LOWONGAN */}
      <section id="lowongan">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand">Peluang Karier</p>
            <h2 className="text-2xl font-extrabold mt-2">Lowongan Terbaru</h2>
          </div>
          <a href="#/bkk" className="text-xs font-bold text-brand">Lihat Semua Lowongan →</a>
        </div>
        <div className="mt-4"><PillFilter options={['Semua', 'RPL', 'TKJ', 'DKV', 'PF']} value={f} onChange={setF} /></div>
        <div className="grid gap-5 md:grid-cols-2 mt-6">
          {list.map((l, i) => (
            <Card key={l.id} className="p-6">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand bg-blue-badge rounded-full px-2.5 py-1">{l.jurusan}</span>
                <span className="text-[10px] text-red-700 bg-red-50 border border-red-200 rounded-full px-2.5 py-1 font-bold">Deadline: {l.deadline}</span>
              </div>
              <p className="font-head font-extrabold mt-3">{l.posisi}</p>
              <p className="text-xs text-body-text/80 mt-1">{l.perush} • {l.lokasi}</p>
              <p className="text-xs text-body-text/80 mt-2 leading-relaxed line-clamp-2">{l.deskripsi}</p>
              <div className="flex gap-2 mt-4">
                <BtnDark to={`/bkk/${l.id}`}>Detail</BtnDark>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CARA MELAMAR + AGENDA */}
      <section className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-extrabold">Bagaimana Cara Melamar?</h2>
          <div className="mt-6 space-y-4">
            {[['01', 'Cari Lowongan', 'Telusuri lowongan sesuai jurusan dan minatmu.'], ['02', 'Siapkan Berkas', 'CV, surat lamaran, dan portofolio terbaikmu.'], ['03', 'Kirim Lamaran', 'Kirim melalui email perusahaan atau langsung ke BKK.']].map(([n, t, d], i) => (
              <div key={n} className="flex gap-4">
                <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm shrink-0 ${i === 0 ? 'bg-brand text-white' : 'border-[1.5px] border-brand text-brand bg-white'}`}>{n}</span>
                <div className="border-l border-line-soft pl-4 pb-2">
                  <p className="font-head font-bold text-sm">{t}</p>
                  <p className="text-xs text-body-text/80 mt-1">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-extrabold">Rekrutmen & Kegiatan Terdekat</h2>
          <div className="mt-6 space-y-3">
            {AGENDA.map((a, i) => (
              <Card key={a.t} className="p-4 flex items-center gap-4">
                <div className={`w-14 rounded-xl text-center py-2 ${i % 2 === 0 ? 'bg-brand text-white' : 'bg-blue-badge text-navy'}`}>
                  <p className="text-[10px] font-bold uppercase">{a.tgl}</p>
                  <p className="text-lg font-extrabold leading-none">{a.hari}</p>
                </div>
                <div>
                  <p className="font-head font-bold text-sm">{a.t}</p>
                  <p className="text-[11px] text-body-text/80 mt-0.5">📍 {a.tempat}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA NAVY */}
      <section className="bg-navy text-white rounded-[2.5rem] px-8 py-14 text-center">
        <p className="text-3xl">🚀</p>
        <h2 className="text-2xl font-extrabold mt-2">BKK Siap Membantu Langkah Kariermu</h2>
        <p className="text-sm text-white/60 mt-2">Konsultasi gratis untuk siswa dan alumni — mulai dari CV sampai wawancara.</p>
        <div className="mt-5 flex flex-wrap gap-2 justify-center text-[11px] text-white/70">
          {['Panduan Pembuatan CV', 'Tips Wawancara', 'Template Portofolio'].map((x) => <span key={x} className="border border-white/20 rounded-full px-3 py-1.5">{x}</span>)}
        </div>
        <div className="mt-6"><BtnPrimer to="/ppdb">Hubungi BKK →</BtnPrimer></div>
      </section>
    </div>
  );
}
