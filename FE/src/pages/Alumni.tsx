import { BtnDark, BtnOutline, BtnPrimer, Card, IconBox, Photo, PhotoBlob, PillFilter, Tag } from '../components/ui';

// SMKT_Style Alumni (Html → Body.png): hero + highlight quote + filter grid + langkah lulus + CTA.
const ALUMNI = [
  { n: 'Bima Aditya', r: 'Cloud Engineer', a: 'RPL • 2023', q: 'Mental problem solving dari project akhir sangat terpakai di industri.', jurusan: 'RPL' },
  { n: 'Rara Sekar', r: 'Videographer', a: 'Perfilman • 2024', q: 'Fasilitas lab standar industri membuat saya tidak kaget saat magang.', jurusan: 'PF' },
  { n: 'Siti N.', r: 'UI/UX Designer', a: 'DKV • 2022', q: 'Sekolah ini bukan hanya mengajarkan skill, tapi cara berpikir kreatif.', jurusan: 'DKV' },
  { n: 'Risky P.', r: 'Network Admin', a: 'TKJ • 2021', q: 'Sertifikasi dari sekolah sangat membantu karir awal saya.', jurusan: 'TKJ' },
];

export default function Alumni() {
  return (
    <div className="space-y-16">
      <section className="grid gap-8 md:grid-cols-2 items-center">
        <div>
          <Tag>ALUMNI</Tag>
          <h1 className="text-4xl font-extrabold mt-3 leading-[1.1]">Dari Sekolah,<br />Melangkah Lebih Jauh</h1>
          <p className="text-sm text-body-text/80 mt-4 leading-relaxed">Ribuan alumni kami tersebar di industri dan universitas ternama. Jejak mereka bukti nyata kualitas pendidikan di SMK Telekomunikasi Darul Ulum.</p>
          <p className="inline-block bg-blue-badge text-brand text-xs font-bold rounded-full px-4 py-2 mt-4">98% Terserap Industri & Universitas</p>
          <div className="mt-5 flex gap-3">
            <BtnDark to="/bkk">Lihat Cerita Alumni →</BtnDark>
            <BtnOutline to="/bkk">Hubungi BKK</BtnOutline>
          </div>
        </div>
        <PhotoBlob label="Foto alumni bersama" ratio="h-64" tone={3} />
      </section>

      {/* HIGHLIGHT */}
      <section className="grid gap-6 md:grid-cols-[2fr_3fr] items-center bg-blue-soft/60 rounded-[2.5rem] p-8">
        <Photo label="Foto Alya N." ratio="h-64" tone={0} />
        <div>
          <Tag>Alumni Highlight</Tag>
          <p className="text-xl font-head font-bold leading-snug mt-4">"Pengalaman belajar dan project nyata di sekolah membuat saya percaya diri berkarier di tech startup sejak semester pertama kuliah."</p>
          <p className="text-sm font-bold mt-4">Alya N. <span className="text-body-text/80 font-normal">• RPL 2024 — Frontend Developer di Tech Startup</span></p>
        </div>
      </section>

      {/* GRID */}
      <section>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold">Jejak Karier dan Karya Mereka</h2>
            <p className="text-sm text-body-text/80 mt-1">Kisah alumni di berbagai bidang industri.</p>
          </div>
          <PillFilter options={['Semua', 'RPL', 'TKJ', 'DKV', 'PF']} value="Semua" onChange={() => undefined} />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mt-6">
          {ALUMNI.map((a, i) => (
            <Card key={a.n} className="overflow-hidden">
              <div className="relative">
                <Photo label={a.n} ratio="h-40" tone={i} className="rounded-none" />
                <span className="absolute bottom-3 left-3 text-[10px] font-bold bg-white/95 text-brand rounded-full px-2.5 py-1">{a.a}</span>
              </div>
              <div className="p-4">
                <p className="font-head font-bold text-sm">{a.n}</p>
                <p className="text-[11px] text-brand font-bold uppercase tracking-wide mt-0.5">{a.r}</p>
                <p className="text-[11px] text-body-text/80 mt-2 leading-relaxed">"{a.q}"</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* LANGKAH SETELAH LULUS */}
      <section>
        <h2 className="text-center text-2xl font-extrabold">Arah Setelah Lulus</h2>
        <div className="grid gap-5 md:grid-cols-3 mt-8">
          {[['💼', 'Bekerja di Industri', 'Alumni tersebar di perusahaan teknologi, media, dan manufaktur.'], ['🎓', 'Melanjutkan Studi', 'Kuliah lanjutan di universitas negeri dan swasta pilihan.'], ['🚀', 'Wirausaha Muda', 'Membangun usaha kreatif dan digital mandiri.']].map(([ic, t, d]) => (
            <Card key={t} className="p-6 text-center">
              <IconBox>{ic}</IconBox>
              <p className="font-head font-bold mt-4">{t}</p>
              <p className="text-xs text-body-text/80 mt-1.5 leading-relaxed">{d}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy text-white rounded-[2.5rem] px-8 py-14 text-center">
        <h2 className="text-2xl font-extrabold">Kamu Alumni SMK Telekomunikasi Darul Ulum?</h2>
        <p className="text-sm text-white/60 mt-2">Mari tetap terhubung dan berbagi kesempatan dengan adik kelas.</p>
        <div className="mt-6"><BtnPrimer to="/bkk">Hubungi Kami →</BtnPrimer></div>
      </section>
    </div>
  );
}
