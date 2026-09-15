import { BtnOutline, BtnPrimer, Card, IconBox, Photo, PhotoBlob, Tag } from '../components/ui';
import { JURUSAN } from '../data';

// SMKT_Style PPDB Page: hero 2 kolom + kartu info jalur + alur langkah.
export default function Ppdb() {
  return (
    <div className="space-y-16 -mt-2">
      <section className="grid gap-8 md:grid-cols-2 items-center">
        <div>
          <Tag>Penerimaan Peserta Didik Baru</Tag>
          <h1 className="text-4xl font-extrabold mt-3 leading-[1.1]">Mulai langkahmu bersama <span className="text-brand">PPDB 2026/2027</span></h1>
          <p className="text-sm text-body-text/80 mt-4 leading-relaxed">Bergabunglah dengan SMK Telekomunikasi Darul Ulum untuk menjadi generasi yang kompeten, berkarakter, dan siap menghadapi dunia industri digital.</p>
          <div className="mt-6 flex gap-3">
            <BtnPrimer to="/register">Mulai Pendaftaran →</BtnPrimer>
            <BtnOutline onClick={() => document.getElementById('syarat')?.scrollIntoView({ behavior: 'smooth' })}>Lihat Persyaratan</BtnOutline>
          </div>
        </div>
        <PhotoBlob label="Foto siswa baru" ratio="h-64" tone={0} />
      </section>

      <section id="syarat">
        <h2 className="text-2xl font-extrabold text-center">Informasi Pendaftaran</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mt-8">
          {[['🏆', 'Jalur Prestasi', 'Bagi siswa dengan prestasi akademik/non-akademik.'], ['📝', 'Jalur Reguler', 'Seleksi administrasi dan tes kemampuan dasar.'], ['🎓', 'Beasiswa', 'Program beasiswa bagi siswa berprestasi berkarakter.'], ['👥', 'Kuota Kelas', 'Kuota terbatas per jurusan, daftar lebih awal.']].map(([ic, t, d]) => (
            <Card key={t} className="p-6">
              <IconBox>{ic}</IconBox>
              <p className="font-head font-bold mt-4">{t}</p>
              <p className="text-xs text-body-text/80 mt-1.5 leading-relaxed">{d}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-navy text-white rounded-[2.5rem] px-8 py-14 text-center">
        <h2 className="text-2xl font-extrabold">Alur Pendaftaran Singkat</h2>
        <div className="grid gap-4 sm:grid-cols-4 mt-8 text-sm">
          {[['01', 'Buat Akun'], ['02', 'Isi Data Diri'], ['03', 'Upload Berkas'], ['04', 'Cek Status']].map(([n, t]) => (
            <div key={n} className="bg-[#1b2c46] rounded-2xl p-5">
              <p className="text-2xl font-extrabold text-[#7db3e8]">{n}</p>
              <p className="font-bold mt-2">{t}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center"><BtnPrimer to="/register">Daftar Sekarang →</BtnPrimer></div>
      </section>

      <section className="grid gap-5 sm:grid-cols-4">
        {JURUSAN.map((j, i) => (
          <Card key={j.kode} className="overflow-hidden">
            <Photo label={j.nama} ratio="h-28" tone={i} className="rounded-none" />
            <p className="font-head font-bold text-sm p-4">{j.kode}</p>
          </Card>
        ))}
      </section>
    </div>
  );
}
