import { useState } from 'react';
import { BtnPrimer, Card, Photo } from '../components/ui';
import { LOWONGAN } from '../data';

// Replika BKK.png
const FILTER = ['Semua', 'RPL', 'TKJ', 'DKV', 'PF'];

export default function Bkk() {
  const [f, setF] = useState('Semua');
  const list = LOWONGAN.filter((l) => f === 'Semua' || l.jurusan === f);
  return (
    <div className="space-y-10">
      <section className="grid gap-6 md:grid-cols-2 items-center bg-sky-50 rounded-b-[2rem] p-6">
        <div>
          <h1 className="text-3xl font-extrabold">BURSA KERJA KHUSUS</h1>
          <p className="font-bold text-sm mt-1">Langkah Awal Menuju <span className="text-sky-700">Dunia Kerja</span></p>
          <p className="text-xs text-slate-600 mt-2">BKK SMK Telekomunikasi Darul Ulum membantu siswa dan alumni menemukan peluang kerja, mengikuti proses rekrutmen, serta mempersiapkan diri menghadapi dunia profesional.</p>
          <div className="mt-3 flex gap-2">
            <BtnPrimer>Lihat Lowongan →</BtnPrimer>
            <a href="#/bkk" className="border text-xs font-bold px-4 py-2.5 rounded-full">Kenali BKK</a>
          </div>
        </div>
        <Photo label="Foto siswa career center" ratio="h-56" className="rounded-3xl" tone={1} />
      </section>

      <section className="text-center">
        <p className="text-[11px] font-bold">BKK Hadir Menjembatani Sekolah dan Dunia Kerja</p>
        <div className="grid sm:grid-cols-3 gap-6 mt-4 text-xs">
          {[['Informasi Lowongan', 'Menyediakan akses terupdate ke berbagai lowongan kerja dari mitra industri kami.'], ['Rekrutmen & Penyaluran', 'Memfasilitasi proses rekrutmen langsung antara perusahaan dan calon lulusan di sekolah.'], ['Persiapan Karier', 'Menyelenggarakan pelatihan soft skill, pembuatan CV, dan simulasi wawancara kerja.']].map(([t, d]) => (
            <div key={t}><p className="font-bold">{t}</p><p className="text-slate-500 mt-1">{d}</p></div>
          ))}
        </div>
      </section>

      <section className="bg-stone-100 rounded-2xl p-4 grid sm:grid-cols-3 gap-3 text-xs">
        {[['Lowongan Kerja', 'Eksplorasi ribuan peluang karier yang sesuai dengan jurusan Anda.'], ['Rekrutmen Perusahaan', 'Ikuti proses seleksi eksklusif dari mitra perusahaan terkemuka.'], ['Pembekalan Karier', 'Tingkatkan kompetensi Anda dengan workshop dan seminar industri.']].map(([t, d]) => (
          <Card key={t} className="p-4"><p className="font-bold">{t}</p><p className="text-slate-500 mt-1">{d}</p></Card>
        ))}
      </section>

      <section>
        <div className="flex justify-between items-center">
          <div><p className="text-[11px] text-sky-700 font-bold">PELUANG KARIER</p><p className="font-bold text-sm">Lowongan Terbaru</p></div>
          <a href="#/bkk" className="text-[11px] text-sky-700 font-bold">Lihat Semua Lowongan →</a>
        </div>
        <div className="flex gap-2 mt-3 text-[11px]">
          {FILTER.map((x) => <button key={x} onClick={() => setF(x)} className={`px-3 py-1 rounded-full border font-bold ${f === x ? 'bg-slate-900 text-white' : ''}`}>{x}</button>)}
        </div>
        <div className="grid gap-3 md:grid-cols-2 mt-3">
          {list.map((l) => (
            <Card key={l.id} className="p-4 flex items-center gap-3">
              <div className="flex-1">
                <p className="text-[10px]"><span className="bg-sky-100 rounded px-1.5 py-0.5 font-bold">{l.jurusan}</span> <span className="bg-stone-100 rounded px-1.5 py-0.5">{l.tipe}</span></p>
                <p className="font-bold text-sm mt-1">{l.posisi}</p>
                <p className="text-[11px] text-slate-500">{l.perush} • {l.lokasi}</p>
              </div>
              <a href={`#/bkk/${l.id}`} className="text-[11px] border rounded-lg px-4 py-1.5">Detail</a>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-stone-100 rounded-2xl p-6 grid gap-6 md:grid-cols-2">
        <div>
          <p className="text-[11px] font-bold">Bagaimana Cara Melamar?</p>
          {[['01', 'Cari Lowongan', 'Telusuri portal lowongan kami dan temukan posisi yang sesuai dengan minat dan keahlian Anda.'], ['02', 'Siapkan Berkas', 'Lengkapi profil Anda, unggah CV terbaru, portofolio, dan dokumen pendukung lainnya.'], ['03', 'Kirim Lamaran', 'Ajukan lamaran Anda langsung melalui platform BKK atau ikuti instruksi spesifik pada lowongan.']].map(([n, t, d]) => (
            <div key={n} className="flex gap-3 mt-3 text-xs"><span className="w-7 h-7 rounded-full bg-sky-700 text-white font-bold flex items-center justify-center shrink-0">{n}</span><div><p className="font-bold">{t}</p><p className="text-slate-500">{d}</p></div></div>
          ))}
        </div>
        <div>
          <p className="text-[11px] font-bold">Rekrutmen & Kegiatan Terdekat</p>
          <Card className="p-3 mt-2 text-xs space-y-3">
            {[['OCT 15', 'Campus Recruitment: PT Indosat Ooredoo', 'Aula Utama SMK Telekomunikasi'], ['OCT 22', 'Workshop: Membuat CV Standar ATS', 'Zoom Meeting (Online)'], ['NOV 05', 'Simulasi Wawancara Industri Kreatif', 'Lab Multimedia']].map(([d, t, l]) => (
              <div key={t} className="flex gap-3 border-b last:border-0 pb-2"><span className="bg-sky-100 rounded px-2 py-1 font-bold text-[10px]">{d}</span><div><p className="font-bold">{t}</p><p className="text-slate-500">{l}</p></div></div>
            ))}
          </Card>
        </div>
      </section>

      <section className="bg-slate-900 text-white rounded-3xl p-8 text-center">
        <p className="text-[11px] font-bold">BKK Siap Membantu Langkah Kariermu</p>
        <p className="text-xs opacity-70 mt-1">Jangan ragu untuk berkonsultasi mengenai rencana karier, persiapan dokumen, atau informasi seputar dunia industri.</p>
        <div className="mt-3"><BtnPrimer>Hubungi BKK</BtnPrimer></div>
      </section>
    </div>
  );
}
