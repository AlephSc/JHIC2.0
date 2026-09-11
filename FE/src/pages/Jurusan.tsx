const JURUSAN = [
  { kode: 'RPL', nama: 'Rekayasa Perangkat Lunak', desc: 'Web, mobile, database, API.' },
  { kode: 'TKJ', nama: 'Teknik Komputer & Jaringan', desc: 'Jaringan, server, keamanan.' },
  { kode: 'DKV', nama: 'Desain Komunikasi Visual', desc: 'Grafis, ilustrasi, branding.' },
  { kode: 'PF', nama: 'Produksi Film', desc: 'Sinematografi, editing, produksi.' },
];

export default function Jurusan() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-extrabold">Temukan Jurusan yang Sesuai Potensimu</h1>
      <p className="text-sm text-slate-600">Sumber: Jurusan.png • RPL / TKJ / DKV / PF. Quiz 8 soal 100% lokal (tidak butuh BE).</p>
      <div className="grid gap-3 sm:grid-cols-2">
        {JURUSAN.map((j) => (
          <div key={j.kode} className="rounded-2xl border p-4">
            <p className="text-xs font-bold text-sky-700">{j.kode}</p>
            <p className="font-bold">{j.nama}</p>
            <p className="text-sm text-slate-600">{j.desc}</p>
          </div>
        ))}
      </div>
      <a href="#/ppdb" className="inline-block bg-slate-900 text-white text-sm px-4 py-2 rounded-full">Cek Potensi → Daftar PPDB</a>
    </div>
  );
}
