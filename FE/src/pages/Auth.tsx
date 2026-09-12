import { useState } from 'react';

// Replika Login page.png / register.png — split navy + form.
export default function Auth({ mode }: { mode: 'login' | 'register' }) {
  const login = mode === 'login';
  const [show, setShow] = useState(false);
  return (
    <div className="rounded-3xl overflow-hidden grid md:grid-cols-2 border shadow-xl">
      <div className="bg-slate-900 text-white p-10 flex flex-col justify-center text-center">
        <h1 className="text-3xl font-extrabold">Selamat Datang di Portal PPDB</h1>
        <p className="text-sm opacity-80 mt-4">{login ? 'Silakan masuk ke akun Anda untuk melanjutkan proses pendaftaran peserta didik baru SMK Telekomunikasi Darul Ulum.' : 'Silahkan daftar akun Anda untuk login ke portal PPDB dan melanjutkan pendaftaran peserta didik baru SMK Telekomunikasi Darul Ulum.'}</p>
      </div>
      <div className="p-8 sm:p-10">
        <p className="font-extrabold">SMK <span className="text-sky-500">TELEKOMUNIKASI</span> DARUL ULUM</p>
        <h2 className="font-extrabold text-xl mt-6">Masuk ke Akun</h2>
        <p className="text-xs text-slate-600 mt-1">{login ? 'Masuk menggunakan akun yang telah Anda daftarkan untuk melanjutkan pendaftaran.' : 'Daftar akun baru untuk mengakses formulir pendaftaran PPDB.'}</p>
        <label className="block text-xs font-bold mt-6">Email
          <input placeholder="nama@email.com" className="mt-1 w-full bg-stone-100 rounded-lg px-3 py-2.5 font-normal" />
        </label>
        <label className="block text-xs font-bold mt-4">Kata Sandi
          <div className="mt-1 flex items-center bg-stone-100 rounded-lg px-3">
            <input type={show ? 'text' : 'password'} placeholder="••••••••" className="flex-1 bg-transparent py-2.5 font-normal outline-none" />
            <button onClick={() => setShow(!show)} className="text-lg">👁</button>
          </div>
        </label>
        <div className="flex justify-between items-center mt-3 text-xs">
          <label className="flex gap-1 items-center text-slate-500"><input type="checkbox" /> Ingat saya</label>
          {login && <a href="#/login" className="text-sky-700 font-bold">Lupa kata sandi?</a>}
        </div>
        <a href="#/ppdb/dashboard" className="block text-center bg-slate-900 text-white rounded-lg py-3 mt-4 text-sm font-bold">{login ? 'Login' : 'Register'}</a>
        {login && <p className="text-xs text-center mt-4">Belum memiliki akun? <a href="#/register" className="text-sky-700 font-bold">Buat Akun</a></p>}
        <p className="text-[11px] text-slate-400 mt-6 border-t pt-3">ⓘ Akun diperlukan sebelum Anda dapat mengakses formulir pendaftaran PPDB.</p>
      </div>
    </div>
  );
}
