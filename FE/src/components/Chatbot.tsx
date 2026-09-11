import { useEffect, useState } from 'react';
import { apiPost, checkHealth, lastHealth, type HealthSnapshot } from '../lib/api';

// Widget sesuai Chatbot Container.png: sapa + quick replies + input.
// Tahan BE down: tampilkan jawaban cache/offline + tombol WA, bukan error teknis.
export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [health, setHealth] = useState<HealthSnapshot | null>(() => lastHealth());
  const [log, setLog] = useState<Array<{ from: string; text: string; fb?: boolean }>>([
    { from: 'bot', text: 'Hai! Ada yang bisa saya bantu? Pilih topik atau ketik pertanyaan.' },
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
      <button onClick={() => setOpen(true)} className="fixed bottom-4 right-4 rounded-full bg-sky-700 text-white px-4 py-3 text-sm font-bold shadow-lg" aria-label="Buka chatbot">
        AI Assistant {health && !health.ok ? '• antre' : '• online'}
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 max-w-[90vw] rounded-2xl border bg-white shadow-2xl overflow-hidden">
      <div className="bg-slate-900 text-white px-4 py-3 flex items-center gap-2">
        <div>
          <p className="text-sm font-bold">AI Assistant</p>
          <p className="text-[11px] opacity-80">{health?.ok === false ? 'MODE ANTRE (data tersimpan)' : 'ONLINE'}</p>
        </div>
        <button className="ml-auto text-lg" onClick={() => setOpen(false)} aria-label="Tutup">×</button>
      </div>
      <div className="h-64 overflow-y-auto p-3 space-y-2 text-sm bg-slate-50">
        {log.map((m, i) => (
          <div key={i} className={`rounded-xl px-3 py-2 ${m.from === 'bot' ? 'bg-white border' : 'bg-sky-700 text-white ml-8'}`}>
            {m.text}
            {m.fb && <span className="ml-2 text-[10px] bg-amber-100 px-1.5 py-0.5 rounded">otomatis</span>}
          </div>
        ))}
      </div>
      <div className="p-2 flex flex-wrap gap-1 text-xs">
        {['Jurusan', 'PPDB', 'BKK', 'Fasilitas', 'Berita'].map((q) => (
          <button key={q} onClick={() => send(`Info ${q}`)} className="px-2 py-1 rounded-full border hover:bg-slate-100">{q}</button>
        ))}
      </div>
      <div className="p-2 flex gap-2 border-t">
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send(input)} placeholder="Ketik pertanyaan Anda..." className="flex-1 border rounded-full px-3 py-2 text-sm" />
        <button onClick={() => send(input)} disabled={busy} className="rounded-full bg-sky-700 text-white px-4 text-sm font-bold">➤</button>
      </div>
    </div>
  );
}
