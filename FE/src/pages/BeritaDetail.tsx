import { useParams } from 'react-router-dom';
import { Card, Photo, Tag } from '../components/ui';
import { BERITA } from '../data';

// Replika Berita Lengkap.png
export default function BeritaDetail() {
  const { id } = useParams();
  const b = BERITA.find((x) => x.id === id) ?? BERITA[0];
  const lain = BERITA.filter((x) => x.id !== b.id).slice(0, 5);
  return (
    <div>
      <p className="text-[11px] text-slate-500">Beranda / Berita & Informasi / {b.judul.slice(0, 28)}…</p>
      <div className="grid gap-8 md:grid-cols-[2fr_1fr] mt-3">
        <article>
          <Tag>{b.kat}</Tag>
          <h1 className="text-2xl font-extrabold mt-2">{b.judul}</h1>
          <p className="text-[11px] text-slate-500 mt-2 border-l-2 border-sky-600 pl-2">{b.tgl} &nbsp;•&nbsp; Admin Sekolah &nbsp;•&nbsp; 3 menit membaca</p>
          <Photo label="Foto dokumentasi berita" ratio="h-72" className="rounded-xl mt-4" tone={0} />
          <div className="text-sm text-slate-700 mt-4 space-y-3">
            <p><b>Jakarta, {b.tgl} –</b> Prestasi membanggakan kembali diraih oleh siswa-siswi SMK Telekomunikasi Darul Ulum dalam ajang Kompetisi Inovasi Teknologi Nasional (KITN) 2026. Tim inovator muda dari jurusan Rekayasa Perangkat Lunak berhasil menyabet Juara 1 kategori Pengembangan Aplikasi Tepat Guna.</p>
            <p>Kompetisi bergengsi yang diikuti ratusan sekolah vokasi se-Indonesia ini menjadi ajang pembuktian kualitas pendidikan dan keterampilan praktis di lingkungan sekolah. Aplikasi yang dikembangkan berfokus pada solusi manajemen limbah elektronik berbasis komunitas.</p>
            <h2 className="font-extrabold text-lg">Inovasi yang Menginspirasi</h2>
            <p>Proyek aplikasi bernama "E-Waste Connect" memukau juri dengan antarmuka intuitif dan integrasi sistem pemetaan lokasi daur ulang real-time. Proses pengembangan memakan waktu tiga bulan dengan bimbingan mentor industri mitra sekolah.</p>
            <blockquote className="border-l-4 border-sky-600 pl-4 font-bold">"Keberhasilan ini adalah bukti nyata dedikasi siswa dan dukungan penuh ekosistem pendidikan di SMK Telekomunikasi Darul Ulum yang selalu mendorong pemecahan masalah dunia nyata."</blockquote>
          </div>
          <div className="flex justify-between items-center mt-6 border-t pt-4">
            <p className="text-xs font-bold">Bagikan Berita:</p>
            <a href="#/berita" className="text-xs border border-sky-700 text-sky-700 rounded-lg px-4 py-2 font-bold">← Kembali ke Berita</a>
          </div>
        </article>
        <aside className="space-y-6">
          <div>
            <div className="flex justify-between items-center border-b-2 border-slate-900 pb-1"><p className="font-bold text-sm">Berita Lainnya</p><a href="#/berita" className="text-[11px] text-sky-700">Lihat Semua →</a></div>
            {lain.map((x, i) => (
              <a key={x.id} href={`#/berita/${x.id}`} className="flex gap-2 py-3 border-b">
                <Photo label={x.judul} ratio="h-14 w-20" className="rounded shrink-0" tone={i} />
                <div><p className="text-[10px] text-sky-700 font-bold">{x.kat}</p><p className="text-xs font-bold">{x.judul}</p><p className="text-[10px] text-slate-500">{x.tgl}</p></div>
              </a>
            ))}
          </div>
          <div>
            <p className="font-bold text-sm border-b-2 border-slate-900 pb-1">Paling Banyak Dibaca</p>
            {[['Panduan Lengkap Pendaftaran Jalur Prestasi 2026', '2.4k pembaca'], ['Profil Lulusan SMK Telkom yang Sukses Global', '1.8k pembaca'], ['Fasilitas Lab Cloud Computing Terbaru TKJ', '1.5k pembaca']].map(([t, s], i) => (
              <p key={t} className="py-2 border-b text-xs"><span className="text-sky-200 font-extrabold mr-2">0{i + 1}</span><b>{t}</b><br /><span className="text-slate-500 ml-6">{s}</span></p>
            ))}
          </div>
          <div>
            <p className="font-bold text-sm border-b-2 border-slate-900 pb-1">Jelajahi Kategori</p>
            <div className="flex flex-wrap gap-2 mt-2 text-[11px]">
              {['Prestasi', 'Kegiatan Sekolah', 'Pengumuman', 'Karya & Inovasi', 'Artikel & Edukasi', 'Alumni'].map((c) => <span key={c} className="bg-stone-100 rounded-full px-3 py-1">{c}</span>)}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
