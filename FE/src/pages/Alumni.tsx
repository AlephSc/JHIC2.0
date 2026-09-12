import { Card, Photo } from '../components/ui';

// Replika Html → Body.png (halaman Alumni versi Inggris lama).
const ALUMNI = [
  { n: 'Bima Aditya', r: 'Cloud Engineer', a: 'RPL • 2023', q: 'Mental problem solving dari project akhir sangat terpakai di industri.' },
  { n: 'Rara Sekar', r: 'Videographer', a: 'Perfilman • 2024', q: 'Fasilitas lab standar industri membuat saya tidak kaget saat magang.' },
  { n: 'Siti N.', r: 'UI/UX Designer', a: 'DKV • 2022', q: 'Sekolah ini bukan hanya mengajarkan skill, tapi cara berpikir kreatif.' },
  { n: 'Rizky P.', r: 'Network Admin', a: 'TKJ • 2021', q: 'Sertifikasi dari sekolah sangat membantu karir awal saya.' },
];

export default function Alumni() {
  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-6 items-center">
        <div>
          <span className="text-[10px] font-bold bg-sky-100 text-sky-700 rounded-full px-2 py-0.5">ALUMNI</span>
          <p className="text-xs mt-2">Dari Sekolah, Melangkah Lebih Jauh</p>
          <p className="text-xs text-slate-500 mt-1">Menjelajahi jejak langkah inspiratif para lulusan SMK Telekomunikasi Darul Ulum yang telah menembus batas, berkarya di industri teknologi kreatif global.</p>
        </div>
        <Photo label="Foto alumni" ratio="h-52" className="rounded-2xl" tone={1} />
      </div>
      <div className="bg-stone-100 rounded-3xl p-6 grid md:grid-cols-2 gap-6 items-center">
        <Photo label="Foto Alya N." ratio="h-48" className="rounded-2xl" tone={2} />
        <div>
          <p className="text-[11px] text-sky-700 font-bold">ALUMNI HIGHLIGHT</p>
          <p className="font-extrabold">"Pengalaman belajar dan project selama sekolah membantu saya lebih siap untuk terus berkembang setelah lulus."</p>
          <p className="text-xs mt-2 border-l-2 border-sky-600 pl-2">Alya N. • RPL 2024<br /><span className="text-sky-700">Frontend Developer di Tech Startup</span></p>
        </div>
      </div>
      <div>
        <h2 className="font-extrabold text-lg">Cerita dari Alumni Kami</h2>
        <div className="grid sm:grid-cols-2 gap-4 mt-3">
          {ALUMNI.map((a, i) => (
            <Card key={a.n} className="overflow-hidden">
              <Photo label={a.n} ratio="h-32" tone={i} />
              <div className="p-3"><p className="text-xs font-bold">{a.n}</p><p className="text-[11px] text-sky-700 font-bold">{a.r}</p><p className="text-[11px] text-slate-500">"{a.q}"</p></div>
            </Card>
          ))}
        </div>
      </div>
      <div>
        <h2 className="font-extrabold text-lg text-center">Beragam Langkah Setelah Lulus</h2>
        <div className="grid sm:grid-cols-3 gap-3 mt-3 text-xs">
          {[['Bekerja di Industri', 'Terserap di berbagai perusahaan teknologi nasional dan multinasional berkat bimbingan BKK.'], ['Melanjutkan Studi', 'Meneruskan pendidikan ke Perguruan Tinggi Negeri dan Swasta terkemuka di Indonesia.'], ['Wirausaha Muda', 'Membangun startup dan agensi kreatif berbekal skill teknis dan jiwa kewirausahaan.']].map(([t, d]) => (
            <Card key={t} className="p-4"><p className="font-bold">{t}</p><p className="text-slate-500 mt-1">{d}</p></Card>
          ))}
        </div>
      </div>
    </div>
  );
}
