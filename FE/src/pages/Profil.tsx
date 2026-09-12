import { BtnPrimer, Photo } from '../components/ui';

// Replika Html → Body-2.png (Profil Sekolah) — versi Indonesia lama.
export default function Profil() {
  return (
    <div className="space-y-10 max-w-3xl mx-auto">
      <div className="text-center">
        <p className="text-[11px] tracking-widest text-slate-500">PROFIL SEKOLAH</p>
        <h1 className="text-3xl font-extrabold">Mengenal Lebih Dekat SMK Telekomunikasi Darul Ulum</h1>
        <p className="text-xs text-slate-500 mt-2">Membangun generasi unggul yang siap menghadapi tantangan industri masa depan dengan perpaduan kompetensi teknologi mutakhir dan karakter moral yang tangguh.</p>
      </div>
      <Photo label="Foto gedung kampus" ratio="h-56" className="rounded-2xl" tone={0} />
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <Photo label="Foto area kampus" ratio="h-48" className="rounded-2xl" tone={1} />
        <div className="text-xs text-slate-600 space-y-2">
          <h2 className="font-extrabold text-base text-slate-900">Tentang SMK Telekomunikasi Darul Ulum</h2>
          <p>Berdiri dengan semangat untuk kesenjangan antara dunia pendidikan dan kebutuhan industri teknologi yang terus berkembang. Kami tidak hanya mengajarkan keterampilan teknis, tetapi juga menanamkan pola pikir inovatif.</p>
          <p>Pendekatan pembelajaran kami didesain menyerupai lingkungan kerja nyata. Siswa didorong untuk berpikir kritis, berkolaborasi dalam proyek praktis, dan mengembangkan solusi untuk masalah dunia nyata.</p>
        </div>
      </div>
      <div className="bg-stone-100 rounded-3xl p-6 grid md:grid-cols-2 gap-6 text-xs">
        <div>
          <p className="font-bold">VISI</p>
          <p className="font-extrabold text-sm mt-1">"Menjadi lembaga pendidikan kejuruan yang unggul dalam teknologi, berkarakter mulia, dan berdaya saing global."</p>
        </div>
        <div>
          <p className="font-bold">MISI</p>
          {['Menyelenggarakan pendidikan berbasis kompetensi teknologi mutakhir.', 'Membentuk karakter siswa yang religius, disiplin, dan beretika.', 'Membangun kemitraan strategis dengan industri dan dunia kerja.', 'Mendorong budaya inovasi dan kewirausahaan di lingkungan sekolah.', 'Menyiapkan lulusan yang adaptif terhadap perubahan global.'].map((m, i) => <p key={m} className="mt-1 border-b pb-1"><b className="text-sky-700">0{i + 1}</b> {m}</p>)}
        </div>
      </div>
      <div className="text-center">
        <h2 className="font-extrabold">Nilai yang Kami Bangun Bersama</h2>
        <div className="flex justify-center gap-8 mt-3 text-xs font-bold">
          {['Kompeten', 'Berkarakter', 'Kreatif', 'Adaptif'].map((n) => <span key={n}>{n}</span>)}
        </div>
      </div>
      <div className="bg-slate-900 text-white rounded-3xl p-8 text-center">
        <h2 className="font-extrabold">Kenali Lebih Dekat Lingkungan Belajar Kami</h2>
        <div className="mt-3 flex justify-center gap-2">
          <BtnPrimer to="/jurusan">Lihat Program Keahlian</BtnPrimer>
          <a href="#/fasilitas" className="border border-white/40 text-sm px-5 py-2.5 rounded-full">Lihat Fasilitas</a>
        </div>
      </div>
    </div>
  );
}
