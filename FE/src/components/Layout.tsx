import { Link, useLocation } from 'react-router-dom';
import { loadConfig } from '../lib/config';

const NAV = [
  { to: '/', label: 'Beranda' },
  { to: '/jurusan', label: 'Jurusan' },
  { to: '/berita', label: 'Berita' },
  { to: '/bkk', label: 'BKK' },
  { to: '/ppdb', label: 'PPDB 2026' },
  { to: '/kesehatan', label: 'Kesehatan' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const loc = useLocation();
  const cfg = loadConfig();
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur border-b">
        <nav className="mx-auto max-w-6xl flex items-center gap-2 px-4 py-3">
          <Link to="/" className="font-extrabold text-sm sm:text-base">
            SMK <span className="text-sky-600">TELEKOMUNIKASI</span> DARUL ULUM
          </Link>
          <div className="ml-auto flex flex-wrap gap-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold ${loc.pathname === n.to ? 'bg-slate-900 text-white' : 'hover:bg-slate-100'}`}
              >
                {n.label}
              </Link>
            ))}
          </div>
        </nav>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-6 flex-1">{children}</main>
      <footer className="border-t bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-6 grid gap-4 sm:grid-cols-4 text-xs text-slate-600">
          <div>
            <p className="font-bold text-slate-900">SMK Telekomunikasi Darul Ulum</p>
            <p>Ponpes Darul Ulum Rejoso Peterongan Jombang</p>
            <p>{cfg.waNumber} • {cfg.waEmail}</p>
          </div>
          <div>
            <p className="font-bold text-slate-900">Menu</p>
            <p>Profil • Jurusan • BKK • Berita • PPDB</p>
          </div>
          <div>
            <p className="font-bold text-slate-900">PPDB 2026/2027</p>
            <p>Alur • Syarat • Cek Status</p>
          </div>
          <div>
            <p className="font-bold text-slate-900">Build</p>
            <p>{cfg.appVersion} • {cfg.beProtocol}://{cfg.beHost}{cfg.bePort ? `:${cfg.bePort}` : ''}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
