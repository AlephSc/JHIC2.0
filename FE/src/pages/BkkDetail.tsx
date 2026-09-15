import { useParams } from 'react-router-dom';
import { BtnDark, BtnOutline, Card, Photo, Tag } from '../components/ui';
import { LOWONGAN } from '../data';

// SMKT_Style BkkDetail: breadcrumb + header deadline merah + checklist 2 kolom + sidebar pendaftaran.
export default function BkkDetail() {
  const { id } = useParams();
  const l = LOWONGAN.find((x) => x.id === id) ?? LOWONGAN[0];
  const mailto = `mailto:email.rekrutmen@perusahaan.com?subject=Lamar_WebDev_Nama`;
  return (
    <div className="space-y-6">
      <p className="text-[11px] text-gray-400">BKK › Lowongan Kerja › {l.posisi}</p>
      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand">Lowongan Kerja</p>
            <h1 className="text-3xl font-extrabold mt-2">{l.posisi}</h1>
            <p className="font-head font-bold text-sm mt-1">{l.perush}</p>
            <p className="text-xs text-body-text/80 mt-1">📍 {l.lokasi} • {l.tipe} • {l.jurusan}</p>
            <div className="flex flex-wrap gap-2 mt-4 text-[11px]">
              <span className="bg-red-50 text-red-700 border border-red-200 rounded-full px-3 py-1.5 font-bold">⏰ Batas Pendaftaran: {l.deadline}</span>
              <span className="bg-blue-badge text-brand rounded-full px-3 py-1.5 font-bold">{l.tipe}</span>
            </div>
            <div className="flex gap-3 mt-5">
              <a href={mailto} className="inline-flex items-center gap-2 bg-navy hover:bg-brand-hover text-white text-sm font-bold px-6 py-3 rounded-xl">Daftar Lowongan →</a>
              <BtnOutline to="/bkk">← Kembali</BtnOutline>
            </div>
          </div>
          <Photo label={`Logo ${l.perush}`} ratio="h-44" tone={2} />
          <Card className="p-6">
            <p className="font-head font-extrabold">TENTANG PEKERJAAN</p>
            <p className="text-sm text-body-text/80 mt-2 leading-relaxed">{l.deskripsi}</p>
            <p className="font-head font-bold text-sm mt-5">Tugas Utama</p>
            <div className="grid sm:grid-cols-2 gap-2 mt-3">
              {l.tugas.map((t) => (
                <p key={t} className="flex gap-2 text-xs text-navy bg-gray-100 rounded-xl p-3"><span className="text-brand font-bold">✓</span>{t}</p>
              ))}
            </div>
            <p className="font-head font-bold text-sm mt-5">Kualifikasi</p>
            <ul className="mt-3 space-y-2">
              {l.kualifikasi.map((k) => (
                <li key={k} className="flex gap-2 text-xs text-navy"><span className="text-brand font-bold">▸</span>{k}</li>
              ))}
            </ul>
          </Card>
        </div>
        <aside className="space-y-4">
          <Card className="p-6">
            <p className="font-head font-bold text-sm">Informasi Pendaftaran</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-brand mt-4">Cara Melamar</p>
            <p className="text-xs text-body-text/80 mt-2">Kirim lamaran beserta CV dan portofolio ke email resmi rekrutmen perusahaan.</p>
            <p className="mt-3 bg-gray-100 rounded-xl px-3 py-2.5 text-xs font-bold break-all">📧 email.rekrutmen@perusahaan.com</p>
            <a href={mailto} className="mt-3 block text-center bg-brand hover:bg-brand-hover text-white rounded-xl py-3 text-sm font-bold transition-colors">Kirim Email Lamaran →</a>
            <p className="text-[10px] text-gray-400 mt-3">Siapkan: CV • Surat Lamaran • Portfolio jika tersedia</p>
          </Card>
          <Card className="p-6 bg-blue-soft/50 border-blue-soft">
            <p className="font-head font-bold text-sm">Butuh Bantuan?</p>
            <p className="text-xs text-body-text/80 mt-2">Guru BKK siap membantu persiapan lamaran dan simulasi wawancara.</p>
            <BtnDark to="/ppdb">Hubungi BKK</BtnDark>
          </Card>
        </aside>
      </div>
    </div>
  );
}
