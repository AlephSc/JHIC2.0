import { Link, useLocation } from 'react-router-dom';
import { loadConfig } from '../lib/config';
import { KONTAK } from '../data';

const NAV = [
  { to: '/', label: 'Beranda' },
  { to: '/profil', label: 'Tentang Kami' },
  { to: '/jurusan', label: 'Program' },
  { to: '/bkk', label: 'BKK' },
  { to: '/berita', label: 'Informasi' },
  { to: '/ppdb', label: 'PPDB 2026' },
];

export default function Layout({ children, wide }: { children: React.ReactNode; wide?: boolean }) {
  const loc = useLocation();
  const cfg = loadConfig();
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <div className="mx-auto w-full max-w-6xl px-4">
        <header className="sticky top-3 z-20 bg-white rounded-full shadow-lg border px-4 py-2.5 flex items-center gap-2">
          <Link to="/" className="font-extrabold text-sm sm:text-base whitespace-nowrap">
            SMK <span className="text-sky-500">TELEKOMUNIKASI</span> DARUL ULUM
          </Link>
          <nav className="ml-auto hidden md:flex items-center gap-4 text-xs font-bold text-slate-700">
            {NAV.slice(0, 5).map((n) => (
              <Link key={n.to} to={n.to} className={loc.pathname === n.to || (n.to !== '/' && loc.pathname.startsWith(n.to)) ? 'text-sky-700' : 'hover:text-sky-700'}>
                {n.label.toUpperCase()}
              </Link>
            ))}
          </nav>
          <Link to="/ppdb" className="ml-auto md:ml-4 bg-sky-600 text-white text-xs font-bold px-4 py-2 rounded-full">PPDB 2026</Link>
        </header>
      </div>
      <main className={`mx-auto w-full ${wide ? 'max-w-7xl' : 'max-w-6xl'} px-4 py-6 flex-1`}>{children}</main>
      <footer className="border-t bg-white mt-8">
        <div className="mx-auto max-w-6xl px-4 py-10 grid gap-8 sm:grid-cols-4 text-xs text-slate-600">
          <div>
            <p className="font-extrabold text-slate-900 text-sm">SMK <span className="text-sky-500">TELEKOMUNIKASI</span> DARUL ULUM</p>
            <p className="mt-2">Mempersiapkan generasi unggul melalui pendidikan berbasis teknologi, karakter Islami, dan kolaborasi industri.</p>
          </div>
          <div>
            <p className="font-bold text-slate-900 mb-2">Menu Utama</p>
            {['Beranda', 'Profil Sekolah', 'Jurusan', 'BKK', 'Berita', 'Lab Tour', 'Trial Class', 'PPDB'].map((m) => <p key={m} className="py-0.5">{m}</p>)}
          </div>
          <div>
            <p className="font-bold text-slate-900 mb-2">PPDB 2026/2027</p>
            <p className="font-semibold">Informasi</p>
            {['Informasi PPDB', 'Persyaratan', 'Alur Pendaftaran', 'Pilihan Jurusan', 'Mulai Pendaftaran', 'Cek Status', 'Pengumuman', 'Kegiatan Sekolah', 'Kontak'].map((m) => <p key={m} className="py-0.5">{m}</p>)}
          </div>
          <div>
            <p className="font-bold text-slate-900 mb-2">Lokasi & Kontak</p>
            <p>{KONTAK.alamat}</p>
            <p className="mt-1">{KONTAK.wa}</p>
            <p>{KONTAK.email}</p>
            <div className="mt-2 h-20 bg-slate-200 rounded-lg flex items-center justify-center text-slate-400">Map Preview</div>
            <p className="text-sky-700 font-semibold mt-1">Buka di Maps →</p>
          </div>
        </div>
        <div className="border-t">
          <div className="mx-auto max-w-6xl px-4 py-3 flex justify-between text-[11px] text-slate-400">
            <span>© 2026 SMK Telekomunikasi Darul Ulum • {cfg.appVersion}</span>
            <span>Privacy Policy • Terms & Conditions</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
