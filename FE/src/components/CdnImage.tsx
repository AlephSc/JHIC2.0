import { useState } from 'react';
import { loadConfig } from '../lib/config';

interface Props {
  src: string; // path relatif (/img/hero.webp) atau URL penuh
  alt: string;
  className?: string;
  eager?: boolean; // true untuk hero LCP
  widths?: number[]; // srcSet responsif bila pakai CDN transform
}

// <img> tidak punya failover bawaan → rantai manual:
// CDN utama → (retry 1x) → /img/fallback.svg lokal → sembunyikan graceful.
export default function CdnImage({ src, alt, className, eager, widths }: Props) {
  const [stage, setStage] = useState(0); // 0 utama, 1 fallback lokal, 2 sembunyi
  const [retried, setRetried] = useState(false);
  const cfg = loadConfig();

  const resolve = (s: string): string => {
    if (/^https?:\/\//.test(s)) return s;
    if (cfg.cdnBaseUrl) return `${cfg.cdnBaseUrl.replace(/\/$/, '')}/${s.replace(/^\//, '')}`;
    return s.startsWith('/') ? `.${s}` : `./${s}`;
  };

  const primary = resolve(src);
  const srcSet = widths && cfg.cdnBaseUrl
    ? widths.map((w) => `${primary}${primary.includes('?') ? '&' : '?'}w=${w} ${w}w`).join(', ')
    : undefined;

  if (stage === 2) return <div className={className} role="img" aria-label={alt} style={{ background: '#e2e8f0', minHeight: 120 }} />;

  const current = stage === 0 ? primary : './img/fallback.svg';

  return (
    <img
      src={current}
      srcSet={stage === 0 ? srcSet : undefined}
      alt={alt}
      className={className}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : 'auto'}
      onError={() => {
        if (stage === 0 && !retried) {
          // retry sekali (CDN hiccup sesaat)
          setRetried(true);
          const el = document.createElement('img');
          el.onload = () => setRetried(true);
          el.onerror = () => setStage(1);
          el.src = `${primary}${primary.includes('?') ? '&' : '?'}retry=1`;
          setTimeout(() => setStage((s) => (s === 0 ? 1 : s)), 2500);
          return;
        }
        if (stage === 0) setStage(1);
        else setStage(2);
      }}
    />
  );
}
