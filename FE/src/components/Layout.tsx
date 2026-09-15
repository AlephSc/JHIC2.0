import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { loadConfig } from '../lib/config';
import { KONTAK } from '../data';

// SMKT_Style Navbar: pill mengambang + dropdown chevron + CTA pill biru.
// Footer: putih, grid 4 kolom, sosmed + mini map + bottom bar legal.

const NAV: Array<{ label: string; to?: string; items?: Array<{ label: string; to: string }> }> = [
  { label: 'BERANDA', to: '/' },
  {
    label: 'TENTANG KAMI',
    items: [
      { label: 'Profil Sekolah', to: '/profil' },
      { label: 'Galeri', to: '/fasilitas' },
      { label: 'Fasilitas', to: '/fasilitas' },
      { label: 'Hubungan Industri', to: '/bkk' },
      { label: 'Alumni', to: '/alumni' },
    ],
  },
  {
    label: 'PROGRAM',
    items: [
      { label: 'Jurusan', to: '/jurusan' },
      { label: 'Cek Potensi Kamu', to: '/cek-potensi' },
      { label: 'Ekstrakurikuler', to: '/ekstrakurikuler' },
      { label: 'Produk Unggulan', to: '/produk' },
    ],
  },
  { label: 'BKK', to: '/bkk' },
  { label: 'INFORMASI', to: '/berita' },
];

export default function Layout({ children, wide }: { children: React.ReactNode; wide?: boolean }) {
  const loc = useLocation();
  const cfg = loadConfig();
  const [open, setOpen] = useState<string | null>(null);
  const aktif = (to: string) => loc.pathname === to || (to !== '/' && loc.pathname.startsWith(to));

  return (
    <div className="min-h-screen flex flex-col bg-cream text-navy-text">
      <div className="mx-auto w-full max-w-6xl px-4">
        <header className="sticky top-3 z-30 bg-white/95 backdrop-blur rounded-full shadow-lg shadow-navy-950/5 border border-line px-5 py-2.5 flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 whitespace-nowrap">
            <span className="w-8 h-8 rounded-full bg-navy-950 text-white text-[10px] font-extrabold flex items-center justify-center">DU</span>
            <span className="font-head font-extrabold text-sm">SMK <span className="text-brand">TELEKOMUNIKASI</span><br className="hidden" /> DARUL ULUM</span>
          </Link>
          <nav className="ml-auto hidden lg:flex items-center gap-5 text-[11px] font-bold tracking-wide">
            {NAV.map((n) => (
              <div key={n.label} className="relative" onMouseEnter={() => setOpen(n.label)} onMouseLeave={() => setOpen(null)}>
                {n.to ? (
                  <Link to={n.to} className={`py-2 ${aktif(n.to) ? 'text-brand' : 'text-navy-text hover:text-brand'}`}>{n.label}</Link>
                ) : (
                  <button className={`py-2 flex items-center gap-1 ${n.items?.some((i) => aktif(i.to)) ? 'text-brand' : 'text-navy-text hover:text-brand'}`}>
                    {n.label} <span className="text-[9px]">▾</span>
                  </button>
                )}
                {n.items && open === n.label && (
                  <div className="absolute top-full left-0 pt-2">
                    <div className="bg-white rounded-2xl border border-line shadow-xl py-2 min-w-48">
                      {n.items.map((i) => (
                        <Link key={i.label} to={i.to} className="block px-4 py-2 text-xs font-semibold text-navy-text hover:bg-blue-badge hover:text-brand">{i.label}</Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
          <Link to="/ppdb" className="ml-auto lg:ml-4 bg-brand hover:bg-brand-hover text-white text-xs font-bold px-5 py-2.5 rounded-full transition-colors">PPDB 2026</Link>
        </header>
      </div>
      <main className={`mx-auto w-full ${wide ? 'max-w-7xl' : 'max-w-6xl'} px-4 py-8 flex-1`}>{children}</main>
      <footer className="bg-white border-t border-line mt-12">
        <div className="mx-auto max-w-6xl px-4 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 text-sm text-muted">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-full bg-navy-950 text-white text-[10px] font-extrabold flex items-center justify-center">DU</span>
              <p className="font-head font-extrabold text-sm text-navy-text">SMK <span className="text-brand">TELEKOMUNIKASI</span> DARUL ULUM</p>
            </div>
            <p className="mt-3 text-xs leading-relaxed">Mempersiapkan generasi unggul melalui pendidikan berbasis teknologi, karakter Islami, dan kolaborasi industri.</p>
            <div className="flex gap-2 mt-4">
              {['IG', 'FB', 'YT'].map((s) => (
                <span key={s} className="w-8 h-8 rounded-full bg-blue-badge text-brand text-[10px] font-bold flex items-center justify-center cursor-pointer">{s}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="font-head font-bold text-navy-text mb-3">Menu Utama</p>
            {[['Beranda', '/'], ['Profil Sekolah', '/profil'], ['Jurusan', '/jurusan'], ['BKK', '/bkk'], ['Berita', '/berita'], ['Fasilitas', '/fasilitas'], ['Alumni', '/alumni'], ['PPDB', '/ppdb']].map(([m, to]) => (
              <Link key={m} to={to} className="block py-1 text-xs hover:text-brand transition-colors">{m}</Link>
            ))}
          </div>
          <div>
            <p className="font-head font-bold text-navy-text mb-3">PPDB 2026/2027</p>
            <p className="text-xs font-bold text-navy-text py-1">Informasi</p>
            {[['Informasi PPDB', '/ppdb'], ['Persyaratan', '/ppdb'], ['Mulai Pendaftaran', '/ppdb/daftar'], ['Cek Status', '/ppdb/status'], ['Pengumuman', '/berita'], ['Kegiatan Sekolah', '/berita'], ['Kontak', '/ppdb']].map(([m, to]) => (
              <Link key={m} to={to} className="block py-1 text-xs hover:text-brand transition-colors">{m}</Link>
            ))}
          </div>
          <div>
            <p className="font-head font-bold text-navy-text mb-3">Lokasi & Kontak</p>
            <p className="text-xs leading-relaxed">{KONTAK.alamat}</p>
            <p className="text-xs mt-2">{KONTAK.wa}</p>
            <p className="text-xs">{KONTAK.email}</p>
            <div className="mt-3 h-20 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 text-xs">Map Preview</div>
            <a href="https://maps.google.com/?q=Ponpes+Darul+Ulum+Rejoso+Peterongan+Jombang" target="_blank" rel="noreferrer" className="text-brand font-bold text-xs mt-2 inline-block">Buka di Maps →</a>
          </div>
        </div>
        <div className="border-t border-line">
          <div className="mx-auto max-w-6xl px-4 py-4 flex flex-col sm:flex-row gap-2 justify-between text-[11px] text-gray-400">
            <span>© 2026 SMK Telekomunikasi Darul Ulum • {cfg.appVersion}</span>
            <span>Privacy Policy · Terms & Conditions</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
