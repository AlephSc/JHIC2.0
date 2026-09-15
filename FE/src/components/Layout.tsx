import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { loadConfig } from '../lib/config';
import { KONTAK } from '../data';

// Navbar + footer disalin struktur & style dari Example/index.tsx:
// menu Lexend Bold #003366 uppercase, CTA pill #2669c0, dropdown TENTANG KAMI,
// footer 4 kolom (logo+desc+sosmed | Menu Utama | PPDB 2026/2027 + Informasi | Lokasi & Kontak + Map)
// dengan menu aktif #2c57ae, bottom bar Privacy Policy · Terms & Conditions.

const NAV: Array<{ label: string; to?: string; items?: Array<{ label: string; to: string }> }> = [
  { label: 'BERANDA', to: '/' },
  {
    label: 'TENTANG KAMI',
    items: [
      { label: 'Profil Sekolah', to: '/profil' },
      { label: 'Jurusan', to: '/jurusan' },
    ],
  },
  { label: 'PROGRAM', to: '/jurusan' },
  { label: 'BKK', to: '/bkk' },
  { label: 'INFORMASI', to: '/berita' },
];

const MAIN_MENU: Array<[string, string]> = [
  ['Beranda', '/'],
  ['Profil Sekolah', '/profil'],
  ['Jurusan', '/jurusan'],
  ['BKK', '/bkk'],
  ['Berita', '/berita'],
  ['Lab Tour', '/fasilitas'],
  ['Trial Class', '/kesehatan'],
  ['PPDB', '/ppdb'],
];

const ADMISSION: Array<[string, string]> = [
  ['Informasi PPDB', '/ppdb'],
  ['Persyaratan', '/ppdb'],
  ['Alur Pendaftaran', '/ppdb'],
  ['Pilihan Jurusan', '/jurusan'],
  ['Mulai Pendaftaran', '/register'],
  ['Cek Status', '/ppdb/status'],
];

const INFORMATION: Array<[string, string]> = [
  ['Pengumuman', '/berita'],
  ['Kegiatan Sekolah', '/berita'],
  ['Kontak', '/ppdb'],
];

export default function Layout({ children, wide }: { children: React.ReactNode; wide?: boolean }) {
  const loc = useLocation();
  const cfg = loadConfig();
  const [aboutOpen, setAboutOpen] = useState(false);
  const aktif = (to: string) => loc.pathname === to || (to !== '/' && loc.pathname.startsWith(to));

  return (
    <div className="min-h-screen flex flex-col bg-white text-body-text">
      <div className="mx-auto w-full max-w-6xl px-4">
        <header className="sticky top-3 z-30 bg-white rounded-[38px] shadow-[0px_4px_14px_#0000002e] border border-line-soft px-5 py-2.5 flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2 whitespace-nowrap" aria-label="SMK Telekomunikasi Darul Ulum, beranda">
            <span className="w-9 h-9 rounded-full bg-navy text-white text-[11px] font-extrabold flex items-center justify-center shrink-0">DU</span>
            <span className="font-head font-bold text-sm text-navmenu leading-tight">SMK <span className="text-link">TELEKOMUNIKASI</span> DARUL ULUM</span>
          </Link>
          <nav className="ml-auto hidden lg:flex items-center gap-6 text-[13px] font-bold text-navmenu tracking-[0.8px]" aria-label="Navigasi utama">
            {NAV.map((n) => (
              <div key={n.label} className="relative">
                {n.items ? (
                  <>
                    <button
                      type="button"
                      aria-expanded={aboutOpen}
                      onClick={() => setAboutOpen((o) => !o)}
                      className={`flex items-center gap-1 py-2 ${n.items.some((i) => aktif(i.to)) ? 'text-link' : 'hover:text-link'}`}
                    >
                      {n.label}
                      <span className={`text-[9px] transition-transform ${aboutOpen ? 'rotate-180' : ''}`} aria-hidden="true">▾</span>
                    </button>
                    {aboutOpen && (
                      <div className="absolute top-full left-0 pt-2 animate-fade-in">
                        <div className="w-44 rounded-lg bg-white border border-line-soft shadow-[0px_4px_14px_#00000033] py-2">
                          {n.items.map((i) => (
                            <Link key={i.label} to={i.to} role="menuitem" onClick={() => setAboutOpen(false)} className="block px-4 py-2 text-sm font-normal text-body-text hover:text-link">{i.label}</Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <Link to={n.to!} className={`py-2 ${aktif(n.to!) ? 'text-link' : 'hover:text-link'}`}>{n.label}</Link>
                )}
              </div>
            ))}
          </nav>
          <Link to="/ppdb" aria-label="PPDB 2026" className="ml-auto lg:ml-4 h-11 w-32 flex items-center justify-center bg-brand hover:bg-brand-hover text-white text-sm font-semibold rounded-full transition-colors">PPDB 2026</Link>
        </header>
      </div>
      <main className={`mx-auto w-full ${wide ? 'max-w-7xl' : 'max-w-6xl'} px-4 py-8 flex-1`}>{children}</main>
      <footer className="bg-white border-t border-line-soft mt-12">
        <div className="mx-auto max-w-6xl px-4 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 text-sm text-body-text">
          <section aria-label="Tentang sekolah">
            <div className="flex items-center gap-2">
              <span className="w-10 h-10 rounded-full bg-navy text-white text-[11px] font-extrabold flex items-center justify-center">DU</span>
              <p className="font-head font-bold text-sm text-navy">SMK <span className="text-link">TELEKOMUNIKASI</span> DARUL ULUM</p>
            </div>
            <p className="mt-4 text-sm leading-[1.63]">Mempersiapkan generasi unggul<br />melalui pendidikan berbasis teknologi,<br />karakter Islami, dan kolaborasi<br />industri.</p>
            <div className="flex items-center gap-4 pt-3" aria-label="Media sosial">
              <a href="https://www.instagram.com" aria-label="Instagram" className="w-8 h-8 rounded-full bg-blue-badge text-link text-[10px] font-bold flex items-center justify-center hover:bg-link hover:text-white transition-colors">IG</a>
              <a href="https://www.youtube.com" aria-label="YouTube" className="w-8 h-8 rounded-full bg-blue-badge text-link text-[10px] font-bold flex items-center justify-center hover:bg-link hover:text-white transition-colors">YT</a>
              <a href="https://www.facebook.com" aria-label="Facebook" className="text-link font-semibold text-sm hover:underline">Facebook</a>
            </div>
          </section>
          <section aria-labelledby="menu-utama">
            <h2 id="menu-utama" className="font-head font-bold text-navy text-lg">Menu Utama</h2>
            <ul className="mt-4 list-none m-0 p-0">
              {MAIN_MENU.map(([item, to], i) => (
                <li key={item} className={i > 0 ? 'pt-2' : ''}>
                  <Link to={to} className={`text-sm leading-[21px] ${i === 0 ? 'font-semibold text-link' : 'text-body-text hover:text-link'}`}>{item}</Link>
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="ppdb-footer">
            <h2 id="ppdb-footer" className="font-head font-bold text-navy text-lg">PPDB 2026/2027</h2>
            <ul className="mt-4 list-none m-0 p-0">
              {ADMISSION.map(([item, to]) => (
                <li key={item} className="pt-2 first:pt-0"><Link to={to} className="text-sm leading-[21px] text-body-text hover:text-link">{item}</Link></li>
              ))}
            </ul>
            <h3 className="font-head font-bold text-navy text-sm mt-4">Informasi</h3>
            <ul className="mt-2 list-none m-0 p-0">
              {INFORMATION.map(([item, to]) => (
                <li key={item} className="pt-2 first:pt-0"><Link to={to} className="text-sm leading-[21px] text-body-text hover:text-link">{item}</Link></li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="kontak-footer">
            <h2 id="kontak-footer" className="font-head font-bold text-navy text-lg">Lokasi & Kontak</h2>
            <address className="not-italic mt-4">
              <div className="flex items-start gap-2">
                <span aria-hidden="true" className="text-link mt-0.5">📍</span>
                <p className="text-sm leading-[1.25]">{KONTAK.alamat.replace('Ponpes Darul Ulum ', 'Ponpes Darul Ulum\n').replace(' Rejoso ', '\nRejoso ')}</p>
              </div>
              <div className="pt-3">
                <a href={`tel:${KONTAK.wa}`} className="flex items-center gap-2 text-sm hover:text-link"><span aria-hidden="true" className="text-link">📞</span>{KONTAK.wa}</a>
              </div>
              <div className="pt-3">
                <a href={`mailto:${KONTAK.email}`} className="flex items-center gap-2 text-sm hover:text-link"><span aria-hidden="true" className="text-link">✉</span>{KONTAK.email}</a>
              </div>
            </address>
            <div className="mt-4">
              <div className="w-[200px] h-[120px] flex items-center justify-center bg-[#e5e2e1] rounded-lg border border-line-soft text-line-soft text-xs">Map Preview</div>
              <a className="flex items-center w-fit text-link font-medium text-sm mt-2 hover:underline" href="https://maps.google.com/?q=Ponpes+Darul+Ulum+Rejoso+Peterongan+Jombang" target="_blank" rel="noreferrer">Buka di Maps →</a>
            </div>
          </section>
        </div>
        <div className="border-t border-line-soft">
          <div className="mx-auto max-w-6xl px-4 h-11 flex items-center justify-between text-xs text-body-text">
            <span>© 2026 SMK Telekomunikasi Darul Ulum • {cfg.appVersion}</span>
            <span className="inline-flex items-center gap-4">
              <Link to="/privacy-policy" className="hover:text-link">Privacy Policy</Link>
              <span aria-hidden="true">·</span>
              <Link to="/terms-and-conditions" className="hover:text-link">Terms & Conditions</Link>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
