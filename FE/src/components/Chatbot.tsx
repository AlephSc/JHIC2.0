import { useEffect, useState } from 'react';
import { apiPost, checkHealth, lastHealth, type HealthSnapshot } from '../lib/api';

// Widget chatbot — FAB bulat #215a9f seperti Example/index.tsx (BOT-ICON),
// header navy #0d1c32, bubble bot lavender, input pill + tombol kirim biru di dalam.
// Tahan BE down: tampilkan jawaban cache/offline + tombol WA, bukan error teknis.
export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [health, setHealth] = useState<HealthSnapshot | null>(() => lastHealth());
  const [log, setLog] = useState<Array<{ from: string; text: string; fb?: boolean }>>([
    { from: 'bot', text: 'Hai! 👋 Ada yang bisa saya bantu?' },
    { from: 'bot', text: 'Saya siap membantu kamu mencari informasi seputar sekolah.' },
  ]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (open && !health) checkHealth().then(setHealth);
  }, [open, health]);

  const send = async (text: string) => {
    const msg = text.trim();
    if (!msg || busy) return;
    setBusy(true);
    setLog((l) => [...l, { from: 'kamu', text: msg }]);
    setInput('');
    const sid = `sess_fe_${Math.random().toString(36).slice(2, 8)}`;
    try {
      const json = await apiPost<{ data: { reply: string; fallback?: boolean } }>('/chat', { session_id: sid, message: msg }, { idempotencyKey: crypto.randomUUID() });
      setLog((l) => [...l, { from: 'bot', text: json.data.reply, fb: !!json.data.fallback }]);
      checkHealth().then(setHealth);
    } catch (e) {
      const err = e as { isDown?: boolean; message?: string };
      setLog((l) => [
        ...l,
        {
          from: 'bot',
          text: err?.isDown
            ? 'Koneksi ke pusat data lambat, saya jawab dari info tersimpan. Untuk darurat hubungi WA panitia di footer.'
            : (err?.message ?? 'Pesan gagal, coba lagi.'),
        },
      ]);
      setHealth({ ok: false, at: new Date().toISOString(), checkedBase: '' });
    } finally {
      setBusy(false);
    }
  };

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="fixed bottom-4 right-4 w-16 h-16 rounded-full bg-[#215a9f] text-white text-2xl shadow-[0px_25px_50px_-12px_#00000040] flex items-center justify-center hover:bg-brand transition-colors" aria-label="Buka bantuan chatbot">
        🤖
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 max-w-[90vw] rounded-3xl border border-line-soft bg-white shadow-[0px_25px_50px_-12px_#00000040] overflow-hidden">
      <div className="bg-navy text-white px-4 py-3 flex items-center gap-3">
        <span className="w-9 h-9 rounded-full bg-[#2669c0] flex items-center justify-center text-lg shrink-0">🤖</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold">AI Assistant</p>
          <p className="text-[11px] text-white/70 flex items-center gap-1"><span className={`w-1.5 h-1.5 rounded-full ${health?.ok === false ? 'bg-amber-400' : 'bg-emerald-400'}`} />{health?.ok === false ? 'MODE ANTRE (data tersimpan)' : 'ONLINE'}</p>
        </div>
        <button className="text-white/60 hover:text-white text-xl leading-none" onClick={() => setOpen(false)} aria-label="Tutup">×</button>
      </div>
      <div className="h-64 overflow-y-auto p-3 space-y-2 text-sm bg-[#eef2fb]">
        {log.map((m, i) => (
          <div key={i} className={`rounded-2xl px-3.5 py-2.5 max-w-[85%] ${m.from === 'bot' ? 'bg-white border border-line-soft' : 'bg-[#2669c0] text-white ml-auto'}`}>
            {m.text}
            {m.fb && <span className="ml-2 text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">otomatis</span>}
          </div>
        ))}
      </div>
      <div className="p-2.5 flex flex-wrap gap-1.5 text-xs">
        {['Jurusan', 'PPDB', 'BKK', 'Fasilitas', 'Berita'].map((q) => (
          <button key={q} onClick={() => send(`Info ${q}`)} className="px-3 py-1.5 rounded-full border border-line-soft bg-white hover:border-link hover:text-link transition-colors font-semibold">{q}</button>
        ))}
      </div>
      <div className="p-2.5 pt-0">
        <div className="flex items-center bg-gray-100 rounded-full pl-4 pr-1.5 py-1.5">
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send(input)} placeholder="Ketik pertanyaan Anda..." className="flex-1 bg-transparent outline-none text-sm" />
          <button onClick={() => send(input)} disabled={busy} className="w-9 h-9 rounded-full bg-[#2669c0] hover:bg-[#215a9f] text-white text-sm shrink-0 transition-colors disabled:opacity-60" aria-label="Kirim">➤</button>
        </div>
      </div>
    </div>
  );
}
