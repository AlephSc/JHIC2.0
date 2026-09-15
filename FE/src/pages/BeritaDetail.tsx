import { useParams } from 'react-router-dom';
import { Card, Photo, Tag } from '../components/ui';
import { BERITA } from '../data';

// SMKT_Style BeritaDetail: breadcrumb + artikel + share ikon + sidebar 3 blok.
const LAINNYA = [
  { id: 'lab-robotika', kat: 'AKADEMIK', tgl: '05 Agustus 2026', judul: 'Peluncuran Lab Robotika Terbaru', thumb: 'Foto lab robotika' },
  { id: 'seminar-nas', kat: 'SEMINAR', tgl: '01 Agustus 2026', judul: 'Seminar Nasional Teknologi Pendidikan', thumb: 'Foto seminar' },
  { id: 'temu-alumni', kat: 'ALUMNI', tgl: '25 Juli 2026', judul: 'Temu Alumni Silaturahmi 2026', thumb: 'Foto temu alumni' },
  { id: 'ppdb-gel2', kat: 'PENDAFTARAN', tgl: '20 Juli 2026', judul: 'Pendaftaran PPDB Gelombang 2 Dibuka', thumb: 'Foto pendaftaran' },
  { id: 'kunjungan-industri', kat: 'KEGIATAN', tgl: '15 Juli 2026', judul: 'Kunjungan Industri ke Pabrik Otomotif', thumb: 'Foto kunjungan' },
];

export default function BeritaDetail() {
  const { id } = useParams();
  const b = BERITA.find((x) => x.id === id) ?? BERITA[0];
  return (
    <div>
      <p className="text-[11px] text-gray-400">Beranda / Berita & Informasi / {b.judul.slice(0, 28)}…</p>
      <div className="grid gap-8 md:grid-cols-[2fr_1fr] mt-3">
        <article>
          <Tag>{b.kat}</Tag>
          <h1 className="text-3xl font-extrabold mt-3 leading-[1.15]">{b.judul}</h1>
          <p className="text-[11px] text-body-text/80 mt-3 border-l-4 border-brand pl-3">{b.tgl} &nbsp;•&nbsp; Admin Sekolah &nbsp;•&nbsp; 3 menit membaca</p>
          <Photo label="Foto dokumentasi berita" ratio="h-72" className="mt-5" tone={0} />
          <div className="text-sm text-navy leading-relaxed space-y-4 mt-5">
            <p>Jakarta — Tim robotika SMK Telekomunikasi Darul Ulum kembali membanggakan nama sekolah dengan meraih juara kompetisi teknologi nasional. Prestasi ini menjadi bukti nyata kurikulum berbasis industri yang diterapkan sekolah.</p>
            <h2 className="text-xl font-extrabold pt-2">Inovasi yang Menginspirasi</h2>
            <p>Proyek <b>E-Waste Connect</b> — aplikasi pemilahan dan pengolahan limbah elektronik — dinilai juri paling aplikatif dan berdampak bagi lingkungan. Tim beranggotakan siswa RPL dan TKJ yang dibimbing guru produktif selama tiga bulan.</p>
            <blockquote className="border-l-4 border-brand bg-blue-badge/40 rounded-r-xl p-4 italic text-navy">"Kami tidak hanya belajar teori, tapi benar-benar menyelesaikan masalah nyata masyarakat lewat teknologi." — Ketua Tim</blockquote>
            <p>Kejuaraan ini diikuti 120 tim dari seluruh Indonesia. Sekolah berharap capaian ini memotivasi adik kelas untuk terus berkarya di bidang teknologi.</p>
          </div>
          <div className="flex items-center gap-2 mt-6 text-xs">
            <span className="font-bold text-body-text/80">Bagikan Berita:</span>
            <span className="w-8 h-8 rounded-full bg-blue-badge text-brand flex items-center justify-center cursor-pointer">↗</span>
            <span className="w-8 h-8 rounded-full bg-blue-badge text-brand flex items-center justify-center cursor-pointer">🔗</span>
          </div>
          <a href="#/berita" className="inline-block mt-4 border-[1.5px] border-brand text-brand text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-blue-badge">← Kembali ke Berita</a>
        </article>
        <aside className="space-y-6">
          <Card className="p-5">
            <p className="font-head font-bold text-sm">Berita Lainnya</p>
            {LAINNYA.map((x) => (
              <a key={x.id} href={`#/berita/${x.id}`} className="flex gap-3 py-3 border-b last:border-0 group">
                <Photo label={x.thumb} ratio="h-14 w-16" tone={1} />
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-brand">{x.kat}</p>
                  <p className="text-[11px] font-bold leading-snug group-hover:text-brand">{x.judul}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{x.tgl}</p>
                </div>
              </a>
            ))}
            <a href="#/berita" className="text-xs font-bold text-brand mt-2 inline-block">Lihat Semua →</a>
          </Card>
          <Card className="p-5">
            <p className="font-head font-bold text-sm">Paling Banyak Dibaca</p>
            {[['2.4k', 'Siswa Raih Juara Kompetisi Teknologi Nasional'], ['1.8k', 'Perayaan Hari Kemerdekaan dan Gelar Karya'], ['1.5k', 'Pendaftaran PPDB Gelombang 2 Dibuka']].map(([n, t], i) => (
              <div key={t} className="flex gap-3 py-3 border-b last:border-0">
                <span className="text-2xl font-extrabold text-line">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <p className="text-[11px] font-bold leading-snug">{t}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{n} pembaca</p>
                </div>
              </div>
            ))}
          </Card>
          <Card className="p-5">
            <p className="font-head font-bold text-sm">Jelajahi Kategori</p>
            {['Prestasi', 'Kegiatan Sekolah', 'Pengumuman', 'Karya & Inovasi', 'Artikel & Edukasi', 'Alumni'].map((k) => (
              <a key={k} href="#/berita" className="flex justify-between items-center py-2.5 border-b last:border-0 text-xs font-semibold hover:text-brand"><span>{k}</span><span className="text-gray-300">›</span></a>
            ))}
          </Card>
        </aside>
      </div>
    </div>
  );
}
