import { BtnOutline, BtnPrimer, Card, IconBox, Photo, PhotoBlob, Tag } from '../components/ui';
import { FASILITAS } from '../data';

// SMKT_Style Fasilitas: hero 2 kolom + grid 4 kartu ikon + CTA.
export default function Fasilitas() {
  return (
    <div className="space-y-16">
      <section className="grid gap-8 md:grid-cols-2 items-center">
        <div>
          <Tag>FASILITAS SEKOLAH</Tag>
          <h1 className="text-4xl font-extrabold mt-3 leading-[1.1]">Sarana Belajar yang Mendukung Kompetensi Siswa</h1>
          <p className="text-sm text-body-text/80 mt-4 leading-relaxed">SMK Telekomunikasi Darul Ulum menyediakan berbagai fasilitas pembelajaran yang dirancang untuk menunjang praktik, kreativitas, kolaborasi, dan kesiapan siswa menghadapi dunia industri.</p>
          <div className="mt-5 flex gap-3">
            <BtnPrimer onClick={() => document.getElementById('fasilitas')?.scrollIntoView({ behavior: 'smooth' })}>Lihat Fasilitas ↓</BtnPrimer>
            <BtnOutline to="/ppdb">Hubungi Sekolah</BtnOutline>
          </div>
        </div>
        <PhotoBlob label="Foto siswa di lab komputer" ratio="h-64" tone={2} />
      </section>

      <section id="fasilitas">
        <h2 className="text-center text-2xl font-extrabold">Jelajahi Fasilitas Kami</h2>
        <div className="grid gap-5 sm:grid-cols-2 mt-8">
          {FASILITAS.map((f, i) => (
            <Card key={f.t} className="p-6">
              <IconBox>{['🖥️', '🏛️', '🧪', '☀️'][i % 4]}</IconBox>
              <p className="font-head font-bold mt-4">{f.t}</p>
              <p className="text-xs text-body-text/80 mt-2 leading-relaxed">{f.d}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
