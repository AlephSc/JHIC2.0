import { useState } from 'react';

const LOWONGAN = [
  { id: 'l1', jurusan: 'RPL', posisi: 'Junior Web Developer', perush: 'SYNEX • Sidoarjo' },
  { id: 'l2', jurusan: 'DKV', posisi: 'Graphic Design Intern', perush: 'Kreatif Studio • Surabaya' },
  { id: 'l3', jurusan: 'TKJ', posisi: 'Network Support Technician', perush: 'Jaringan Cepat • Gresik' },
  { id: 'l4', jurusan: 'PF', posisi: 'Junior Video Editor', perush: 'Visual Sinergi • Jakarta' },
];

export default function Bkk() {
  const [f, setF] = useState('Semua');
  const list = LOWONGAN.filter((l) => f === 'Semua' || l.jurusan === f);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-extrabold">Bursa Kerja Khusus</h1>
      <p className="text-sm text-slate-600">Langkah awal menuju dunia kerja. Daftar via email perusahaan (mailto) agar tetap jalan saat BE down. Sumber: BKK.png</p>
      <div className="flex gap-2 text-xs">
        {['Semua', 'RPL', 'TKJ', 'DKV', 'PF'].map((x) => (
          <button key={x} onClick={() => setF(x)} className={`px-3 py-1 rounded-full border ${f === x ? 'bg-slate-900 text-white' : ''}`}>{x}</button>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {list.map((l) => (
          <div key={l.id} className="rounded-2xl border p-4 flex items-center gap-3">
            <div className="flex-1">
              <p className="text-[11px] text-slate-500">{l.jurusan}</p>
              <p className="font-bold text-sm">{l.posisi}</p>
              <p className="text-xs text-slate-500">{l.perush}</p>
            </div>
            <a className="text-xs border rounded-full px-3 py-1.5" href={`mailto:email.rekrutmen@perusahaan.com?subject=Lamar_${l.posisi.replace(/\s/g, '_')}_Nama`}>Detail</a>
          </div>
        ))}
      </div>
    </div>
  );
}
