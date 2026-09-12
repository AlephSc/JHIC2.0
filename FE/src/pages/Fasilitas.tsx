import { BtnGaris, BtnPrimer, Card, Photo, Tag } from '../components/ui';
import { FASILITAS } from '../data';

// Replika Fasilitas.png
export default function Fasilitas() {
  return (
    <div className="space-y-10">
      <section className="grid gap-6 md:grid-cols-2 items-center">
        <div>
          <Tag>FASILITAS SEKOLAH</Tag>
          <h1 className="text-3xl font-extrabold mt-2">Sarana Belajar yang Mendukung Kompetensi Siswa</h1>
          <p className="text-sm text-slate-600 mt-3">SMK Telekomunikasi Darul Ulum menyediakan berbagai fasilitas pembelajaran yang dirancang untuk menunjang praktik, kreativitas, kolaborasi, dan kesiapan siswa menghadapi dunia industri.</p>
          <div className="mt-4 flex gap-2">
            <BtnPrimer>Lihat Fasilitas ↓</BtnPrimer>
            <BtnGaris>Hubungi Sekolah</BtnGaris>
          </div>
        </div>
        <Photo label="Foto siswa di lab komputer" ratio="h-60" className="rounded-2xl" tone={0} />
      </section>
      <section>
        <h2 className="font-extrabold text-lg">Jelajahi Fasilitas Kami</h2>
        <div className="grid gap-4 sm:grid-cols-2 mt-4">
          {FASILITAS.map((f, i) => (
            <Card key={f.t} className="overflow-hidden">
              <Photo label={f.t} ratio="h-44" tone={i} />
              <div className="p-4"><p className="font-bold">{f.t}</p><p className="text-xs text-slate-600 mt-1">{f.d}</p></div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
