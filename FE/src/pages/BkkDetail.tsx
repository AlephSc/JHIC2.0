import { useParams } from 'react-router-dom';
import { Card, Photo } from '../components/ui';
import { LOWONGAN } from '../data';

// Replika BKK Perusahaan.png (detail Junior Web Developer)
export default function BkkDetail() {
  const { id } = useParams();
  const l = LOWONGAN.find((x) => x.id === id) ?? LOWONGAN[0];
  return (
    <div className="space-y-6">
      <p className="text-[11px] text-slate-500">BKK › Lowongan Kerja › {l.posisi}</p>
      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <div>
          <p className="text-[11px] text-sky-700 font-bold tracking-widest">LOWONGAN KERJA</p>
          <h1 className="text-3xl font-extrabold">{l.posisi}</h1>
          <p className="text-sm mt-1">{l.perush}</p>
          <p className="text-xs text-slate-500 mt-1">{l.lokasi} • {l.tipe} • {l.jurusan}</p>
          <div className="flex flex-wrap gap-2 mt-4 text-xs">
            <span className="bg-red-50 text-red-700 border border-red-200 rounded-lg px-3 py-2">Batas Pendaftaran: {l.deadline}</span>
            <a href={`mailto:email.rekrutmen@perusahaan.com?subject=Lamar_${l.posisi.replace(/\s/g, '')}_Nama`} className="bg-slate-900 text-white rounded-lg px-4 py-2 font-bold">Daftar Lowongan</a>
            <a href="#/bkk" className="border border-sky-700 text-sky-700 rounded-lg px-4 py-2 font-bold">Kembali</a>
          </div>
        </div>
        <Photo label={`Logo ${l.perush}`} ratio="h-40" className="rounded-2xl" tone={2} />
      </div>
      <div className="grid gap-6 md:grid-cols-[2fr_1fr] border-t pt-6">
        <div className="text-sm space-y-4">
          <div><p className="text-xs font-bold text-sky-700">TENTANG PEKERJAAN</p><p className="mt-1">{l.deskripsi} Kami mencari lulusan SMK berbakat yang siap belajar di bawah bimbingan senior developer dalam lingkungan kerja yang dinamis dan kolaboratif.</p></div>
          <div><p className="text-xs font-bold text-sky-700">TUGAS UTAMA</p><ul className="grid sm:grid-cols-2 gap-1 mt-1">{l.tugas.map((t) => <li key={t}>✓ {t}</li>)}</ul></div>
          <div><p className="text-xs font-bold text-sky-700">KUALIFIKASI</p><ul className="mt-1 space-y-1">{l.kualifikasi.map((q) => <li key={q}>▸ {q}</li>)}</ul></div>
        </div>
        <Card className="p-4 h-fit text-sm">
          <p className="font-bold">Informasi Pendaftaran</p>
          <div className="text-xs mt-2 space-y-2">
            <p className="flex justify-between"><span className="text-slate-500">Perusahaan</span><b>{l.perush}</b></p>
            <p className="flex justify-between"><span className="text-slate-500">Posisi</span><b>{l.posisi}</b></p>
            <p className="flex justify-between"><span className="text-slate-500">Lokasi</span><b>{l.lokasi}</b></p>
            <p className="flex justify-between"><span className="text-slate-500">Deadline</span><b className="text-red-600">{l.deadline}</b></p>
          </div>
          <p className="text-[11px] mt-3 font-bold">CARA MELAMAR</p>
          <p className="text-xs">Kirim CV ke <span className="text-sky-700">email.rekrutmen@perusahaan.com</span> dengan subjek: Lamar_WebDev_Nama</p>
          <a href={`mailto:email.rekrutmen@perusahaan.com?subject=Lamar_WebDev_Nama`} className="block text-center bg-slate-900 text-white rounded-lg py-2.5 mt-3 text-xs font-bold">Kirim Email Lamaran →</a>
        </Card>
      </div>
    </div>
  );
}
