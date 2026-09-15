import { BtnOutline, BtnPrimer, Card, Photo, PhotoBlob, Tag } from '../components/ui';

// SMKT_Style Profil (Html → Body-2.png): hero split + visi/misi + nilai ikon + identitas + lingkungan.
export default function Profil() {
  return (
    <div className="space-y-16">
      <section className="grid gap-8 md:grid-cols-2 items-center">
        <div>
          <Tag>Profil Sekolah</Tag>
          <h1 className="text-4xl font-extrabold mt-3 leading-[1.1]">Mengenal Lebih Dekat SMK Telekomunikasi Darul Ulum</h1>
          <p className="text-sm text-muted mt-4 leading-relaxed">Membangun generasi unggul yang siap menghadapi tantangan industri masa depan dengan perpaduan kompetensi teknologi mutakhir dan karakter moral yang tangguh.</p>
          <div className="mt-5"><BtnPrimer onClick={() => document.getElementById('visi')?.scrollIntoView({ behavior: 'smooth' })}>Kenali Sekolah Kami ↓</BtnPrimer></div>
        </div>
        <PhotoBlob label="Foto gedung kampus" ratio="h-64" tone={2} />
      </section>

      <section className="relative">
        <Photo label="Foto area kampus" ratio="h-64 w-full" tone={1} className="rounded-none" />
        <blockquote className="absolute inset-0 flex items-end p-8 bg-gradient-to-t from-navy-950/80 to-transparent text-white text-lg font-head font-bold leading-snug">"Mengembangkan kompetensi teknologi tanpa mengabaikan pembentukan karakter."</blockquote>
      </section>

      <section className="max-w-3xl mx-auto text-sm text-muted leading-relaxed">
        <p>Berdiri dengan semangat untuk menjembatani kesenjangan antara pendidikan formal dan kebutuhan industri, SMK Telekomunikasi Darul Ulum menghadirkan pembelajaran berbasis praktik dengan dukungan fasilitas modern dan tenaga pendidik profesional.</p>
      </section>

      <section id="visi">
        <h2 className="text-center text-2xl font-extrabold">Visi & Misi</h2>
        <Card className="p-8 max-w-3xl mx-auto mt-8">
          <p className="text-[11px] font-bold uppercase tracking-widest text-brand">Visi</p>
          <p className="font-head font-bold text-lg mt-2 leading-snug">"Menjadi lembaga pendidikan kejuruan yang unggul dalam menghasilkan lulusan berkompetensi teknologi dan berkarakter mulia."</p>
        </Card>
        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto mt-5">
          {[['Menyelenggarakan pembelajaran aktif berbasis industri.', 'Mengembangkan karakter siswa yang religius dan mandiri.', 'Membangun kemitraan strategis dengan dunia kerja.'], ['Meningkatkan kompetensi guru secara berkelanjutan.', 'Menciptakan lingkungan sekolah yang aman dan kreatif.']].map((col, ci) => (
            <Card key={ci} className="p-6">
              {col.map((m, i) => (
                <p key={m} className="flex gap-3 text-xs text-navy-text py-2 border-b border-line last:border-0"><span className="text-brand font-extrabold">{String(ci * 3 + i + 1).padStart(2, '0')}</span>{m}</p>
              ))}
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-center text-2xl font-extrabold">Nilai Kami</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {[['🎯', 'Kompeten', 'Ahli di bidangnya'], ['🤲', 'Berkarakter', 'Religius & mandiri'], ['💡', 'Kreatif', 'Inovatif & berdaya saing'], ['🔄', 'Adaptif', 'Siap menghadapi perubahan']].map(([ic, t, d]) => (
            <Card key={t} className="p-6 text-center">
              <span className="w-12 h-12 mx-auto rounded-full bg-blue-badge text-brand text-xl flex items-center justify-center">{ic}</span>
              <p className="font-head font-bold mt-3">{t}</p>
              <p className="text-[11px] text-muted mt-1">{d}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <Card className="p-7">
          <p className="font-head font-bold">Identitas Sekolah</p>
          <div className="text-xs mt-4 space-y-2.5">
            <p className="flex justify-between border-b border-line pb-2"><span className="text-muted">Nama</span><b>SMK Telekomunikasi Darul Ulum</b></p>
            <p className="flex justify-between border-b border-line pb-2"><span className="text-muted">Jenjang</span><b>SMK</b></p>
            <p className="flex justify-between border-b border-line pb-2"><span className="text-muted">Program</span><b>RPL • TKJ • DKV • Perfilman</b></p>
            <p className="flex justify-between border-b border-line pb-2"><span className="text-muted">Alamat</span><b>Ponpes Darul Ulum Rejoso</b></p>
            <p className="flex justify-between"><span className="text-muted">Kontak</span><b>085649400339</b></p>
          </div>
        </Card>
        <div className="space-y-4">
          <p className="font-head font-bold">Lingkungan untuk Belajar dan Berkembang</p>
          {[['🛠️', 'Pembelajaran Berbasis Praktik', '70% praktik, 30% teori sesuai standar industri.'], ['💻', 'Teknologi & Fasilitas Pendukung', 'Lab modern, studio, dan perangkat industri.'], ['🌱', 'Pengembangan Karakter & Potensi', 'Ekstrakurikuler dan pembinaan karakter Islami.']].map(([ic, t, d]) => (
            <div key={t} className="bg-navy-950 text-white rounded-3xl p-5 flex gap-4 items-start">
              <span className="w-10 h-10 shrink-0 rounded-xl bg-white/10 flex items-center justify-center">{ic}</span>
              <div><p className="font-head font-bold text-sm">{t}</p><p className="text-xs text-white/60 mt-1">{d}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-navy-950 text-white rounded-[2.5rem] px-8 py-14 text-center">
        <h2 className="text-2xl font-extrabold">Kenali Lebih Dekat Lingkungan Belajar Kami</h2>
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <BtnPrimer to="/jurusan">Lihat Program Keahlian</BtnPrimer>
          <BtnOutline light to="/fasilitas">Lihat Fasilitas</BtnOutline>
        </div>
      </section>
    </div>
  );
}
