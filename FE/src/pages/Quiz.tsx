import { useState } from 'react';
import { BtnDark, BtnOutline, BtnPrimer, Card, IconBox, Photo, Tag } from '../components/ui';
import { JURUSAN, QUIZ } from '../data';

// SMKT_Style Cek Potensi: landing (4 kartu diamond) → quiz 8 soal (card gelap) → hasil scoring nyata.
const KODE = ['RPL', 'TKJ', 'DKV', 'PF'];

export function CekPotensi() {
  return (
    <div className="grid gap-8 md:grid-cols-2 items-center py-8">
      <div>
        <Tag>Cek Potensi Kamu</Tag>
        <h1 className="text-4xl font-extrabold mt-3 leading-[1.1]">Hai! Sudah Siap Mengenal Potensimu?</h1>
        <p className="text-sm text-body-text/80 mt-4 leading-relaxed">Jawab beberapa pertanyaan singkat tentang hal yang kamu sukai dan cara kamu menyelesaikan sesuatu. Kami akan membantu memberikan rekomendasi jurusan yang paling cocok untukmu.</p>
        <div className="mt-6 flex flex-wrap gap-3 items-center">
          <BtnPrimer to="/cek-potensi/quiz">Mulai Cek Potensi →</BtnPrimer>
          <a href="#/jurusan" className="text-brand font-bold text-sm">Lihat Semua Jurusan</a>
        </div>
        <p className="text-[11px] text-gray-400 mt-3">±2-3 menit • Hasil ini merupakan rekomendasi awal, bukan keputusan akhir.</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {JURUSAN.map((j, i) => (
          <Card key={j.kode} className={`p-6 ${i % 2 === 1 ? 'translate-y-6' : ''}`}>
            <IconBox>{['⌨️', '🖥️', '🎨', '🎬'][i]}</IconBox>
            <p className="font-head font-extrabold mt-3">{j.kode}</p>
            <p className="text-xs text-body-text/80 mt-1 leading-relaxed">{j.nama}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Scoring: tiap jawaban menambah skor jurusan (indeks opsi 0..3 = RPL..PF).
function skorDari(jawab: number[]): { kode: string; pct: number }[] {
  const skor = [0, 0, 0, 0];
  jawab.forEach((a) => { if (a >= 0 && a < 4) skor[a] += 1; });
  const total = jawab.filter((a) => a >= 0).length || 1;
  return KODE.map((kode, i) => ({ kode, pct: Math.round((skor[i] / total) * 100) }));
}

export function Quiz() {
  const [i, setI] = useState(0);
  const [jawab, setJawab] = useState<Array<number | null>>(Array(QUIZ.length).fill(null));
  const pct = Math.round(((i) / QUIZ.length) * 100);

  if (i >= QUIZ.length) {
    sessionStorage.setItem('jhic2.quiz.jawab', JSON.stringify(jawab.map((x) => x ?? -1)));
    window.location.hash = '#/cek-potensi/hasil';
    return <p className="text-center text-sm text-body-text/80 py-10">Menganalisis potensimu…</p>;
  }
  const q = QUIZ[i];
  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between text-xs font-bold text-body-text/80">
        <span>Pertanyaan {i + 1} dari {QUIZ.length}</span><span>{pct}% Selesai</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full mt-2 overflow-hidden">
        <div className="h-full bg-brand rounded-full transition-all" style={{ width: `${pct}%` }} />
      </div>
      <div className="bg-navy text-white rounded-[2rem] p-8 mt-6">
        <p className="text-[11px] font-bold uppercase tracking-widest text-[#7db3e8]">Pertanyaan {i + 1}</p>
        <h2 className="text-2xl font-extrabold mt-2 leading-snug">{q.q}</h2>
        <div className="grid gap-3 mt-6">
          {q.opsi.map((o, oi) => (
            <button key={o} onClick={() => { const n = [...jawab]; n[i] = oi; setJawab(n); }}
              className={`text-left rounded-2xl px-5 py-4 text-sm font-semibold transition-colors ${jawab[i] === oi ? 'bg-brand text-white' : 'bg-[#1b2c46] text-white/85 hover:bg-[#1b2c46]/70 ring-1 ring-white/10'}`}>
              {String.fromCharCode(65 + oi)}. {o}
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <BtnOutline onClick={() => setI(Math.max(0, i - 1))}>← Sebelumnya</BtnOutline>
        <BtnPrimer onClick={() => jawab[i] !== null && setI(i + 1)}>Selanjutnya →</BtnPrimer>
      </div>
    </div>
  );
}

const DETAIL: Record<string, { nama: string; alasan: string[]; pelajari: string[] }> = {
  RPL: { nama: 'Rekayasa Perangkat Lunak', alasan: ['Kamu tertarik membangun produk digital', 'Logika dan pemecahan masalah jadi kelebihanmu', 'Kamu menikmati proses membuat sesuatu dari nol'], pelajari: ['Pemrograman Web & Mobile', 'Database & API', 'Project Software Development'] },
  TKJ: { nama: 'Teknik Komputer & Jaringan', alasan: ['Kamu suka mengoprek perangkat dan jaringan', 'Detail teknis membuatmu penasaran', 'Kamu teliti dan sistematis'], pelajari: ['Administrasi Server', 'Mikrotik & Router', 'Keamanan Jaringan'] },
  DKV: { nama: 'Desain Komunikasi Visual', alasan: ['Kamu mengekspresikan ide lewat visual', 'Kamu peka terhadap estetika', 'Kamu menikmati karya yang dilihat orang'], pelajari: ['UI/UX Design', 'Ilustrasi Digital', 'Branding Project'] },
  PF: { nama: 'Produksi Film (Perfilman)', alasan: ['Kamu suka bercerita lewat video', 'Kamu peka terhadap gambar dan suara', 'Kamu menikmati kerja tim produksi'], pelajari: ['Sinematografi', 'Editing & Color Grading', 'Proyek Film Pendek'] },
};

export function Hasil() {
  const hasil = (() => {
    try {
      const raw = sessionStorage.getItem('jhic2.quiz.jawab');
      if (raw) return skorDari(JSON.parse(raw) as number[]).sort((a, b) => b.pct - a.pct);
    } catch { /* abaikan */ }
    return [{ kode: 'RPL', pct: 86 }, { kode: 'DKV', pct: 78 }, { kode: 'TKJ', pct: 65 }, { kode: 'PF', pct: 54 }];
  })();
  const top = hasil[0];
  const d = DETAIL[top.kode] ?? DETAIL.RPL;
  return (
    <div className="max-w-3xl mx-auto text-center">
      <Tag>HASIL CEK POTENSI</Tag>
      <h1 className="text-4xl font-extrabold mt-3">Rekomendasi Terbaikmu:<br /><span className="text-brand">{d.nama}</span></h1>
      <Card className="p-8 mt-8">
        <p className="text-[11px] font-bold uppercase tracking-widest text-body-text/80">Tingkat Kesesuaian</p>
        <p className="text-5xl font-extrabold text-brand mt-2">{top.pct}%</p>
        <div className="h-3 bg-gray-100 rounded-full mt-4 overflow-hidden">
          <div className="h-full bg-brand rounded-full" style={{ width: `${top.pct}%` }} />
        </div>
        <div className="grid gap-3 sm:grid-cols-3 mt-6 text-left">
          {hasil.slice(1, 4).map((h) => (
            <div key={h.kode} className="bg-gray-100 rounded-xl p-3 text-xs">
              <p className="font-bold">{h.kode}</p><p className="text-body-text/80 mt-0.5">{h.pct}%</p>
            </div>
          ))}
        </div>
      </Card>
      <div className="grid sm:grid-cols-2 gap-5 mt-6 text-left">
        <Card className="p-6">
          <p className="font-head font-bold text-sm">Kenapa {top.kode}?</p>
          <ul className="mt-3 space-y-2 text-xs text-body-text/80">
            {d.alasan.map((a) => <li key={a} className="flex gap-2"><span className="text-brand font-bold">✓</span>{a}</li>)}
          </ul>
        </Card>
        <Card className="p-6">
          <p className="font-head font-bold text-sm">Yang Akan Dipelajari</p>
          <ul className="mt-3 space-y-2 text-xs text-body-text/80">
            {d.pelajari.map((a) => <li key={a} className="flex gap-2"><span className="text-brand font-bold">▸</span>{a}</li>)}
          </ul>
        </Card>
      </div>
      <div className="flex flex-wrap gap-3 justify-center mt-8">
        <BtnPrimer to="/jurusan">Pelajari Jurusan Ini →</BtnPrimer>
        <BtnDark to="/ppdb">Daftar PPDB Sekarang</BtnDark>
        <BtnOutline onClick={() => { window.location.hash = '#/cek-potensi/quiz'; }}>Ulangi Kuis</BtnOutline>
      </div>
    </div>
  );
}
