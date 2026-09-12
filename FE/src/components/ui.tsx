import type { ReactNode } from 'react';

// Bit UI bersama replika Figma: tag kecil, tombol, placeholder foto.
// Foto asli belum diekstrak → Photo tampilkan blok gradien berlabel,
// nanti ganti prop src ke URL CDN tanpa ubah pemanggil.

export function Tag({ children }: { children: ReactNode }) {
  return <span className="inline-block text-[10px] font-bold tracking-widest text-sky-700 bg-sky-100 rounded-full px-3 py-1">{children}</span>;
}

export function BtnPrimer({ children, to, onClick }: { children: ReactNode; to?: string; onClick?: () => void }) {
  const cls = 'inline-block bg-sky-700 hover:bg-sky-800 text-white text-sm font-bold px-5 py-2.5 rounded-full';
  if (to) return <a href={to} className={cls}>{children}</a>;
  return <button onClick={onClick} className={cls}>{children}</button>;
}

export function BtnGaris({ children, to }: { children: ReactNode; to?: string }) {
  const cls = 'inline-block border border-sky-700 text-sky-700 text-sm font-bold px-5 py-2.5 rounded-full hover:bg-sky-50';
  return <a href={to ?? '#'} className={cls}>{children}</a>;
}

const GRAD = [
  'from-sky-600 to-blue-900',
  'from-indigo-600 to-slate-900',
  'from-cyan-600 to-blue-800',
  'from-blue-700 to-indigo-900',
];

export function Photo({ label, className, tone = 0, ratio = 'h-48' }: { label: string; className?: string; tone?: number; ratio?: string }) {
  return (
    <div className={`bg-gradient-to-br ${GRAD[tone % GRAD.length]} ${ratio} ${className ?? ''} flex items-center justify-center overflow-hidden`} role="img" aria-label={label}>
      <span className="text-white/80 text-xs font-semibold px-4 text-center">{label}</span>
    </div>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border bg-white shadow-sm ${className ?? ''}`}>{children}</div>;
}

export function Stepper({ steps, active }: { steps: string[]; active: number }) {
  return (
    <div className="flex items-center justify-center gap-0 my-6">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center">
          <div className="flex flex-col items-center w-20 sm:w-28">
            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${i < active ? 'bg-sky-700 text-white' : i === active ? 'bg-sky-700 text-white ring-4 ring-sky-200' : 'bg-slate-200 text-slate-500'}`}>
              {i < active ? '✓' : i + 1}
            </span>
            <span className={`mt-1 text-[10px] font-semibold ${i <= active ? 'text-sky-700' : 'text-slate-400'}`}>{s}</span>
          </div>
          {i < steps.length - 1 && <div className={`h-0.5 w-8 sm:w-20 mb-5 ${i < active ? 'bg-sky-700' : 'bg-slate-200'}`} />}
        </div>
      ))}
    </div>
  );
}
