import { BtnPrimer, Card, Photo, Tag } from '../components/ui';

// Replika Produk Unggulan.png
const FILTER = ['Semua', 'Teknologi', 'Kreatif', 'Multimedia', 'Jasa'];

export default function Produk() {
  return (
    <div className="space-y-10">
      <section className="grid gap-6 md:grid-cols-2 items-center">
        <div>
          <Tag>PRODUK UNGGULAN SEKOLAH</Tag>
          <h1 className="text-3xl font-extrabold mt-2">Karya Siswa, Solusi Nyata</h1>
          <p className="text-sm text-slate-600 mt-3">Melalui unit produksi sekolah, siswa tidak hanya belajar secara teori tetapi juga menghasilkan karya dan layanan yang dapat dimanfaatkan masyarakat maupun mitra industri.</p>
          <div className="mt-4"><BtnPrimer>Jelajahi Produk →</BtnPrimer></div>
        </div>
        <Photo label="Foto siswa perakitan produk" ratio="h-60" className="rounded-2xl" tone={0} />
      </section>
      <section>
        <h2 className="text-center font-extrabold">Produk & Layanan Unggulan</h2>
        <div className="flex justify-center gap-2 mt-3 text-xs">
          {FILTER.map((f, i) => <span key={f} className={`px-3 py-1 rounded-full border ${i === 0 ? 'bg-sky-700 text-white font-bold' : ''}`}>{f}</span>)}
        </div>
        <div className="grid gap-4 sm:grid-cols-3 mt-4">
          {['Website & Sistem Informasi', 'Desain & Media Kreatif', 'Produksi Foto & Video'].map((t, i) => (
            <Card key={t} className="overflow-hidden">
              <Photo label={t} ratio="h-36" tone={i} />
              <div className="p-3"><p className="font-bold text-sm">{t}</p><p className="text-[11px] text-sky-700">Lihat Detail →</p></div>
            </Card>
          ))}
        </div>
        <Card className="overflow-hidden grid md:grid-cols-2 mt-4">
          <Photo label="Servis perangkat" ratio="h-40" tone={3} />
          <div className="p-4"><p className="font-bold">Servis & Perawatan Perangkat</p><p className="text-xs text-slate-600 mt-1">Layanan perbaikan, pemeliharaan rutin, dan instalasi jaringan komputer oleh teknisi handal.</p></div>
        </Card>
      </section>
      <section className="text-center">
        <h2 className="font-extrabold">Dari Pembelajaran Menjadi Karya</h2>
        <div className="flex justify-center gap-6 mt-4 text-xs">
          {[['01', 'Belajar'], ['02', 'Praktik'], ['03', 'Produksi'], ['04', 'Hasil']].map(([n, l]) => (
            <div key={n}><p className="w-8 h-8 mx-auto rounded-full bg-sky-100 text-sky-700 font-bold flex items-center justify-center text-[11px]">{n}</p><p className="font-bold mt-1">{l}</p></div>
          ))}
        </div>
      </section>
      <section className="bg-slate-900 text-white rounded-3xl p-8 text-center">
        <h2 className="font-extrabold">Punya Ide atau Kebutuhan Project?</h2>
        <p className="text-xs opacity-70">Mari berdiskusi mengenai produk dan layanan yang dapat dikembangkan bersama siswa SMK Telekomunikasi Darul Ulum.</p>
        <div className="mt-4 flex justify-center gap-2">
          <BtnPrimer>Hubungi Sekolah</BtnPrimer>
          <a href="#/berita" className="border border-white/40 text-sm px-5 py-2.5 rounded-full">Lihat Portofolio</a>
        </div>
      </section>
    </div>
  );
}
