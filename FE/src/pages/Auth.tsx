import { useState } from 'react';

// SMKT_Style Auth: split-screen — kiri navy branding, kanan form putih.
// Input abu muda radius, ikon prefix, checkbox, submit full-width navy.
export default function Auth({ mode }: { mode: 'login' | 'register' }) {
  const login = mode === 'login';
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { setErr('Format email tidak valid.'); return; }
    if (pass.length < 6) { setErr('Kata sandi minimal 6 karakter.'); return; }
    setErr(null);
    window.location.hash = '#/ppdb/dashboard';
  };

  return (
    <div className="max-w-4xl mx-auto rounded-[2rem] overflow-hidden grid md:grid-cols-2 shadow-xl shadow-navy-950/10">
      <div className="bg-navy-950 text-white p-10 flex flex-col justify-center relative overflow-hidden">
        <div className="blob w-64 h-64 -left-16 -bottom-16 opacity-20" />
        <div className="relative z-10 text-center">
          <span className="w-12 h-12 rounded-full bg-white/10 text-white font-extrabold flex items-center justify-center mx-auto">DU</span>
          <h1 className="text-3xl font-extrabold mt-5 leading-tight">Selamat Datang di Portal PPDB</h1>
          <p className="text-sm text-white/60 mt-4 leading-relaxed">
            {login
              ? 'Silakan masuk ke akun Anda untuk melanjutkan proses pendaftaran peserta didik baru SMK Telekomunikasi Darul Ulum.'
              : 'Silahkan daftar akun Anda untuk login ke portal PPDB dan melanjutkan pendaftaran peserta didik baru SMK Telekomunikasi Darul Ulum.'}
          </p>
        </div>
      </div>
      <div className="bg-white p-8 sm:p-10">
        <p className="font-head font-extrabold text-sm">SMK <span className="text-brand">TELEKOMUNIKASI</span> DARUL ULUM</p>
        <h2 className="font-head font-extrabold text-2xl mt-6">{login ? 'Masuk ke Akun' : 'Daftar Akun Baru'}</h2>
        <p className="text-xs text-muted mt-1">{login ? 'Masuk menggunakan akun yang telah Anda daftarkan untuk melanjutkan pendaftaran.' : 'Daftar akun baru untuk mengakses formulir pendaftaran PPDB.'}</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <label className="block text-xs font-bold">
            Email
            <div className="mt-1.5 flex items-center bg-gray-100 rounded-xl px-3.5 focus-within:ring-2 ring-brand/30">
              <span className="text-gray-400">✉</span>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="nama@email.com" className="flex-1 bg-transparent py-3 pl-2.5 text-sm font-normal outline-none" />
            </div>
          </label>
          <label className="block text-xs font-bold">
            Kata Sandi
            <div className="mt-1.5 flex items-center bg-gray-100 rounded-xl px-3.5 focus-within:ring-2 ring-brand/30">
              <span className="text-gray-400">🔒</span>
              <input value={pass} onChange={(e) => setPass(e.target.value)} type={show ? 'text' : 'password'} placeholder="••••••••" className="flex-1 bg-transparent py-3 pl-2.5 text-sm font-normal outline-none" />
              <button type="button" onClick={() => setShow(!show)} className="text-gray-400 text-sm px-1">👁</button>
            </div>
          </label>
          {!login && (
            <label className="block text-xs font-bold">
              Konfirmasi Kata Sandi
              <div className="mt-1.5 flex items-center bg-gray-100 rounded-xl px-3.5 focus-within:ring-2 ring-brand/30">
                <span className="text-gray-400">🔒</span>
                <input type={show ? 'text' : 'password'} placeholder="••••••••" className="flex-1 bg-transparent py-3 pl-2.5 text-sm font-normal outline-none" />
              </div>
            </label>
          )}
          <div className="flex justify-between items-center text-xs">
            <label className="flex gap-1.5 items-center text-muted"><input type="checkbox" /> Ingat saya</label>
            {login && <a href="#/login" className="text-brand font-bold">Lupa kata sandi?</a>}
          </div>
          {err && <p className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl p-3">{err}</p>}
          <button type="submit" className="w-full bg-navy-950 hover:bg-navy-900 text-white rounded-xl py-3.5 text-sm font-bold transition-colors">{login ? 'Login' : 'Register'}</button>
        </form>
        <p className="text-xs text-center mt-5">
          {login ? <>Belum memiliki akun? <a href="#/register" className="text-brand font-bold">Buat Akun</a></> : <>Sudah punya akun? <a href="#/login" className="text-brand font-bold">Masuk di sini</a></>}
        </p>
        <p className="text-[11px] text-gray-400 mt-6 border-t border-line pt-4 flex items-start gap-1.5"><span>ⓘ</span> Akun diperlukan sebelum Anda dapat mengakses formulir pendaftaran PPDB.</p>
      </div>
    </div>
  );
}
