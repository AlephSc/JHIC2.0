import { useState } from 'react';
import { BtnPrimer, Card } from '../components/ui';
import { QUIZ } from '../data';

// Alur: landing rekomendasi jurusan.png → quiz.png (8 soal) → hasil rekomendasi.png
export function CekPotensi() {
  return (
    <div className="grid gap-6 md:grid-cols-2 items-center py-8">
      <div>
        <p className="text-[11px] font-bold text-sky-700 tracking-widest">CEK POTENSI KAMU</p>
        <h1 className="text-4xl font-extrabold">Hai! Sudah Siap Mengenal Potensimu?</h1>
        <p className="text-sm text-slate-600 mt-3">Jawab beberapa pertanyaan singkat tentang hal yang kamu sukai dan cara kamu menyelesaikan sesuatu. Kami akan membantu memberikan rekomendasi jurusan yang paling cocok untukmu.</p>
        <div className="mt-4"><BtnPrimer to="/cek-potensi/quiz">Mulai Cek Potensi →</BtnPrimer></div>
        <p className="mt-2 text-xs"><a href="#/jurusan" className="text-sky-700 font-bold">Lihat Semua Jurusan</a></p>
        <p className="text-[11px] text-slate-400 mt-2">± 2-3 menit • Tidak ada jawaban benar atau salah</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[['RPL', 'SOFTWARE', true], ['TKJ', 'NETWORK', false], ['DKV', 'DESIGN', false], ['PF', 'FILM', true]].map(([k, s, light]) => (
          <div key={k as string} className={`rounded-2xl p-6 text-center shadow ${light ? 'bg-white border' : 'bg-slate-900 text-white'}`}><p className={`font-extrabold ${light ? 'text-sky-700' : ''}`}>{k as string}</p><p className="text-[10px] opacity-60">{s as string}</p></div>
        ))}
      </div>
    </div>
  );
}

export function Quiz() {
  const [i, setI] = useState(0);
  const [jawab, setJawab] = useState<number[]>([]);
  const q = QUIZ[i];
  const persen = Math.round(((i + 1) / QUIZ.length) * 100);

  const pilih = (o: number) => {
    const n = [...jawab]; n[i] = o; setJawab(n);
  };

  if (i >= QUIZ.length) { window.location.hash = '#/cek-potensi/hasil'; return null; }

  return (
    <div className="max-w-3xl mx-auto">
      <p className="text-[11px] font-bold text-sky-700 tracking-widest">CEK POTENSI KAMU</p>
      <h1 className="text-3xl font-extrabold">Temukan Jurusan yang Cocok untukmu</h1>
      <p className="text-sm text-slate-500">Pilih jawaban yang paling sesuai dengan minatmu.</p>
      <div className="flex justify-between text-xs mt-6"><b>Pertanyaan {i + 1} dari {QUIZ.length}</b><span className="text-sky-700">{persen}% Selesai</span></div>
      <div className="h-2 bg-stone-200 rounded-full mt-1"><div className="h-2 bg-sky-700 rounded-full" style={{ width: `${persen}%` }} /></div>
      <Card className="p-6 mt-4">
        <p className="font-extrabold text-lg">{q.q}</p>
        <div className="space-y-3 mt-4">
          {q.opsi.map((o, oi) => (
            <button key={o} onClick={() => pilih(oi)} className={`w-full text-left border rounded-xl px-4 py-3 text-sm flex gap-3 items-center ${jawab[i] === oi ? 'border-sky-700 bg-sky-50' : ''}`}>
              <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] ${jawab[i] === oi ? 'bg-sky-700 text-white' : ''}`}>{jawab[i] === oi ? '●' : ''}</span>{o}
            </button>
          ))}
        </div>
      </Card>
      <div className="flex justify-between mt-4">
        <button disabled={i === 0} onClick={() => setI(i - 1)} className="border rounded-lg px-5 py-2.5 text-sm disabled:opacity-40">← Sebelumnya</button>
        <button disabled={jawab[i] == null} onClick={() => setI(i + 1)} className="bg-sky-700 text-white rounded-lg px-6 py-2.5 text-sm font-bold disabled:opacity-40">Selanjutnya →</button>
      </div>
      <p className="text-center text-[11px] text-slate-400 mt-4">ⓘ Tidak ada jawaban benar atau salah. Pilih yang paling sesuai dengan dirimu.</p>
    </div>
  );
}

export function Hasil() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="font-extrabold tracking-widest">HASIL CEK POTENSI</h1>
        <p className="text-lg">Sepertinya Kamu Cocok dengan <span className="text-sky-700 font-bold">Rekayasa Perangkat Lunak!</span></p>
        <p className="text-sm text-slate-500">Berdasarkan jawabanmu, kamu memiliki ketertarikan kuat pada teknologi, problem solving, dan pengembangan solusi digital.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <p className="text-[11px] font-bold">REKOMENDASI JURUSAN</p>
          <h2 className="text-2xl font-extrabold">Rekayasa Perangkat Lunak (RPL)</h2>
          <p className="text-sm text-slate-600 mt-2">Jurusan ini membekali kamu dengan keterampilan merancang, mengembangkan, dan memelihara perangkat lunak, website, hingga basis data untuk berbagai kebutuhan industri digital.</p>
          <p className="font-bold mt-4">Kenapa cocok untukmu?</p>
          {['Tertarik pada teknologi dan aplikasi', 'Menyukai problem solving', 'Suka membuat sesuatu yang dapat digunakan'].map((t) => <p key={t} className="text-sm mt-1">✓ {t}</p>)}
          <p className="text-xs font-bold mt-4">Kecocokan Minat — 86%</p>
          <div className="h-2 bg-stone-200 rounded-full mt-1"><div className="h-2 bg-sky-700 rounded-full" style={{ width: '86%' }} /></div>
          <div className="flex gap-2 mt-3 text-[10px]">{['PROBLEM SOLVING', 'TEKNOLOGI', 'PROGRAMMING', 'SOLUSI DIGITAL'].map((t) => <span key={t} className="bg-stone-100 rounded-full px-2 py-1">{t}</span>)}</div>
        </div>
        <div>
          <div className="bg-gradient-to-br from-sky-600 to-blue-900 h-64 rounded-2xl flex items-center justify-center text-white/80 text-xs">Foto siswa dengan laptop</div>
          <p className="font-bold mt-4">Yang Akan Kamu Pelajari</p>
          {['Programming & Logic', 'Web / App Development', 'Database & Software Project'].map((t) => <p key={t} className="text-sm mt-1">⌨ {t}</p>)}
        </div>
      </div>
      <div className="text-center">
        <p className="font-bold text-lg">Mau mengenal jurusan ini lebih jauh?</p>
        <div className="flex justify-center gap-2 mt-3 text-sm">
          <a href="#/jurusan" className="bg-slate-900 text-white rounded-full px-5 py-2.5 font-bold">Lihat Jurusan RPL →</a>
          <a href="#/cek-potensi/quiz" className="border rounded-full px-5 py-2.5 font-bold">Coba Tes Lagi</a>
        </div>
        <p className="text-xs mt-2"><a href="#/jurusan" className="underline">Lihat Semua Jurusan</a> &nbsp; Sudah yakin? <a href="#/ppdb" className="font-bold">Daftar PPDB →</a></p>
      </div>
    </div>
  );
}
