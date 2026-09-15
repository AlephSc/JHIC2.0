import type { ReactNode } from 'react';

// SMKT_Style (Skills/SMKT_Style.md) primitif: eyebrow badge, tombol biru/navy/outline,
// card radius besar, foto rounded dengan blob backdrop, statistik, pill filter.
// Foto asli belum diekstrak → Photo placeholder gradien, nanti ganti ke CdnImage tanpa ubah pemanggil.

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-brand bg-blue-badge rounded-full px-3.5 py-1.5">
      <span className="w-1.5 h-1.5 rounded-full bg-brand" />
      {children}
    </span>
  );
}

export function BtnPrimer({ children, to, onClick, className }: { children: ReactNode; to?: string; onClick?: () => void; className?: string }) {
  const cls = `inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-hover text-white text-sm font-bold px-6 py-3 rounded-xl transition-colors ${className ?? ''}`;
  if (to) return <a href={`#${to}`} className={cls}>{children}</a>;
  return <button onClick={onClick} className={cls}>{children}</button>;
}

export function BtnOutline({ children, to, onClick, light }: { children: ReactNode; to?: string; onClick?: () => void; light?: boolean }) {
  const cls = `inline-flex items-center justify-center gap-2 border-[1.5px] text-sm font-bold px-6 py-3 rounded-xl transition-colors ${
    light ? 'border-white/70 text-white hover:bg-white/10' : 'border-brand text-brand hover:bg-blue-badge'
  }`;
  if (to) return <a href={`#${to}`} className={cls}>{children}</a>;
  return <button onClick={onClick} className={cls}>{children}</button>;
}

export function BtnDark({ children, to, onClick }: { children: ReactNode; to?: string; onClick?: () => void }) {
  const cls = 'inline-flex items-center justify-center gap-2 bg-navy-950 hover:bg-navy-900 text-white text-sm font-bold px-6 py-3 rounded-xl transition-colors';
  if (to) return <a href={`#${to}`} className={cls}>{children}</a>;
  return <button onClick={onClick} className={cls}>{children}</button>;
}

export function PillFilter({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
            value === o ? 'bg-navy-950 text-white' : 'border border-line bg-white text-navy-text hover:border-brand'
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

const GRAD = [
  'from-sky-500 to-navy-900',
  'from-blue-400 to-navy-800',
  'from-cyan-500 to-navy-950',
  'from-indigo-400 to-navy-900',
];

export function Photo({ label, className, tone = 0, ratio = 'h-48' }: { label: string; className?: string; tone?: number; ratio?: string }) {
  return (
    <div className={`bg-gradient-to-br ${GRAD[tone % GRAD.length]} ${ratio} ${className ?? ''} img-frame flex items-center justify-center relative`} role="img" aria-label={label}>
      <span className="text-white/85 text-xs font-semibold px-4 text-center">{label}</span>
    </div>
  );
}

// Foto dengan blob dekoratif di belakang (style guide: blob di belakang foto, bukan di konten)
export function PhotoBlob({ label, className, tone = 0, ratio = 'h-64' }: { label: string; className?: string; tone?: number; ratio?: string }) {
  return (
    <div className={`relative ${className ?? ''}`}>
      <div className="blob w-64 h-64 -right-6 -bottom-8" />
      <Photo label={label} ratio={ratio} tone={tone} className="relative z-10 w-full" />
    </div>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-3xl bg-white border border-line ${className ?? ''}`}>{children}</div>;
}

export function IconBox({ children }: { children: ReactNode }) {
  return <span className="w-11 h-11 rounded-xl bg-blue-badge text-brand flex items-center justify-center text-xl">{children}</span>;
}

export function StatCard({ n, l }: { n: string; l: string }) {
  return (
    <Card className="p-5 text-center">
      <p className="text-3xl font-extrabold text-brand">{n}</p>
      <p className="text-[11px] uppercase tracking-widest text-muted mt-1">{l}</p>
    </Card>
  );
}

export function Stepper({ steps, active }: { steps: string[]; active: number }) {
  return (
    <div className="flex items-center justify-center my-8">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center">
          <div className="flex flex-col items-center w-20 sm:w-28">
            <span className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${
              i < active ? 'bg-brand text-white' : i === active ? 'bg-white text-brand ring-[3px] ring-brand' : 'bg-gray-100 text-gray-500'
            }`}>
              {i < active ? '✓' : i + 1}
            </span>
            <span className={`mt-1.5 text-[10px] font-bold ${i <= active ? 'text-brand' : 'text-gray-400'}`}>{s}</span>
          </div>
          {i < steps.length - 1 && <div className={`h-0.5 w-8 sm:w-16 mb-5 ${i < active ? 'bg-brand' : 'bg-gray-100'}`} />}
        </div>
      ))}
    </div>
  );
}
