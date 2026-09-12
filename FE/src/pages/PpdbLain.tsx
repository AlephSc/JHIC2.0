import { BtnPrimer, Card } from '../components/ui';
import { loadOutbox } from '../lib/outbox';

// Replika ppdb dashboard.png + PPDP Tiket.png + PPDB Status.png + PPDP Pernyatan.png
// digabung navigasinya; tiap layar tetap sesuai Figma.
export function PpdbDashboard() {
  const outbox = loadOutbox();
  return (
    <div className="space-y-6">
      <div className="flex justify-between text-xs border-b pb-2"><span className="font-extrabold">SMK TELEKOMUNIKASI DARUL ULUM</span><span>User 👤 | <span className="text-red-600">Keluar</span></span></div>
      <div>
        <h1 className="text-2xl font-extrabold">Selamat datang, User 👋</h1>
        <p className="text-sm text-slate-500">Kelola proses pendaftaran PPDB Anda dari halaman ini.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-[1fr_2fr]">
        <Card className="p-5">
          <div className="flex justify-between items-center"><p className="font-bold">Status Pendaftaran</p><span className="text-[11px] bg-sky-100 text-sky-700 rounded-full px-2 py-0.5 font-bold">Belum Selesai</span></div>
          <p className="text-xs text-slate-500 mt-2">Lengkapi data pendaftaran dan upload berkas untuk melanjutkan proses PPDB.</p>
          <a href="#/ppdb/daftar" className="block text-center bg-black text-white rounded-lg py-2.5 mt-4 text-xs font-bold">Lanjutkan Pendaftaran →</a>
        </Card>
        <Card className="p-5">
          <p className="text-[11px] font-bold">PROGRESS PENDAFTARAN</p>
          <div className="flex justify-between mt-3 text-[10px] text-center">
            {([['01 Akun', true], ['02 Data Diri', true], ['03 Berkas', false], ['04 Verifikasi', false], ['05 Seleksi', false]] as Array<[string, boolean]>).map(([l, done], idx) => (
              <div key={l}><span className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center font-bold ${done ? 'bg-sky-700 text-white' : 'bg-slate-200 text-slate-500'}`}>{done ? '✓' : idx + 3}</span><p className="mt-1">{l}</p></div>
            ))}
          </div>
        </Card>
      </div>
      <Card className="p-5">
        <p className="font-bold">🎟 Tiket Pendaftaran</p>
        <p className="text-xs text-slate-500">Gunakan tiket pendaftaran untuk memantau proses verifikasi dan hasil seleksi.</p>
        <p className="mt-2 bg-stone-100 border-dashed border rounded-lg px-3 py-2.5 text-xs flex justify-between"><span className="text-slate-400">ID TIKET</span><b>PPDB-2026-001245</b></p>
        <p className="text-[11px] italic mt-2">* Tiket akan tersedia setelah pendaftaran berhasil dikirim.</p>
        <a href="#/ppdb/status" className="block text-center border border-sky-700 text-sky-700 rounded-lg py-2.5 mt-2 text-xs">Cek Status</a>
        {outbox.length > 0 && <p className="text-[11px] mt-2">Antrean perangkat: {outbox.map((o) => o.antreId).join(', ')}</p>}
        <div className="mt-2"><BtnPrimer to="/ppdb/daftar">Lanjutkan Pendaftaran →</BtnPrimer></div>
      </Card>
    </div>
  );
}

export function PpdbTiket() {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <p className="w-16 h-16 mx-auto rounded-full bg-sky-100 text-sky-700 text-2xl flex items-center justify-center font-bold">✓</p>
      <h1 className="text-3xl font-extrabold mt-4">Pendaftaran Berhasil!</h1>
      <p className="text-sm text-slate-500">Terima kasih. Data pendaftaran Anda telah kami terima dan sedang dalam proses.</p>
      <Card className="p-6 mt-4 bg-stone-100 text-left">
        <p className="text-center text-[11px] tracking-widest">NOMOR PENDAFTARAN</p>
        <p className="text-center text-sky-700 font-extrabold text-xl tracking-widest">PPDB-2026-001245</p><hr className="my-3" />
        <div className="grid grid-cols-2 gap-2 text-xs">
          <p>Nama Lengkap<br /><b>Budi Santoso</b></p><p>Jurusan<br /><b>Teknik Komputer dan Jaringan</b></p>
          <p>Tanggal Daftar<br /><b>24 Oktober 2025</b></p><p>Status<br /><span className="bg-sky-600 text-white rounded-full px-2 py-0.5 font-bold">Menunggu Verifikasi</span></p>
        </div>
      </Card>
      <p className="bg-sky-100 text-xs rounded-xl p-3 mt-3 text-left"><b>ⓘ Simpan nomor pendaftaran untuk memantau status.</b> Anda dapat menggunakan nomor ini untuk login dan melihat perkembangan seleksi.</p>
      <div className="flex gap-2 justify-center mt-4 text-sm">
        <a href="#/ppdb/status" className="bg-black text-white rounded-lg px-5 py-2.5 font-bold">👁 Lihat Status Pendaftaran</a>
        <a href="#/" className="border border-sky-700 text-sky-700 rounded-lg px-5 py-2.5 font-bold">🏠 Kembali ke Beranda</a>
      </div>
    </div>
  );
}

export function PpdbStatus() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <p className="font-bold">Status<br /><span className="text-sky-700">Pendaftaran</span></p>
        <Card className="p-6 mt-3">
          <p className="text-[11px] font-bold tracking-widest">STATUS SAAT INI</p>
          <p className="font-bold mt-2">Menunggu Proses Seleksi</p>
          <p className="text-sm text-slate-600 mt-2">Dokumen pendaftaran Anda telah berhasil kami terima dan saat ini sedang dalam tahap verifikasi administrasi oleh tim panitia penerimaan siswa baru.</p>
          <button className="bg-black text-white text-xs font-bold rounded-full px-5 py-2.5 mt-4">⟳ Refresh Status</button>
        </Card>
      </div>
      <div className="space-y-4">
        <Card className="p-5 bg-stone-100">
          <p className="font-extrabold text-lg">Jejak Pendaftaran</p>
          <div className="flex justify-between mt-3 text-[10px] text-center">
            {[['Pendaftaran Dikirim', true], ['Dokumen Diterima', true], ['Verifikasi Administrasi', false], ['Proses Seleksi', false], ['Hasil Seleksi', false]].map(([l, done]) => (
              <div key={l as string} className="w-16"><span className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center font-bold ${done ? 'bg-sky-700 text-white' : l === 'Verifikasi Administrasi' ? 'border-2 border-sky-700 text-sky-700' : 'bg-white border text-slate-400'}`}>{done ? '✓' : '•'}</span><p className={`mt-1 font-bold ${l === 'Verifikasi Administrasi' ? 'text-sky-700' : done ? '' : 'text-slate-400'}`}>{l as string}</p></div>
            ))}
          </div>
        </Card>
        <div>
          <p className="font-extrabold text-lg">Apa yang harus dilakukan?</p>
          {['Pastikan nomor telepon dan email yang Anda daftarkan aktif untuk menerima notifikasi jadwal seleksi.', 'Pelajari materi dasar sesuai Program Keahlian yang Anda pilih sebagai persiapan tes masuk.', 'Cek halaman ini secara berkala atau tunggu email resmi dari panitia PPDB.'].map((t) => (
            <Card key={t} className="p-3 mt-2 text-xs text-slate-600">{t}</Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PpdbLulus() {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <p className="w-12 h-12 mx-auto rounded-full bg-sky-700 text-white text-xl flex items-center justify-center font-bold">✓</p>
      <h1 className="text-4xl font-extrabold mt-3">Selamat!<br />Anda Dinyatakan Lulus Seleksi</h1>
      <p className="text-sm text-slate-500 mt-2">Pencapaian luar biasa. Selamat bergabung dengan ekosistem profesional SMK Telekomunikasi Darul Ulum.</p>
      <div className="grid sm:grid-cols-2 gap-4 mt-6 text-left">
        <Card className="p-5 text-sm">
          <div className="flex justify-between items-center"><p className="font-extrabold text-base">Detail Peserta</p><span className="text-[11px] bg-green-100 text-green-700 rounded-full px-2 py-0.5 font-bold">DITERIMA</span></div>
          <div className="text-xs mt-3 space-y-2">
            <p>NOMOR REGISTRASI<br /><b>REG-2026-8924A</b></p>
            <p>NAMA LENGKAP<br /><b>Bima Satria</b></p>
            <p>PROGRAM KEAHLIAN<br /><b className="text-sky-700">Rekayasa Perangkat Lunak</b> &nbsp; TAHUN AKADEMIK <b>2026/2027</b></p>
          </div>
        </Card>
        <div className="bg-slate-900 text-white rounded-2xl p-5 text-sm text-left">
          <p className="font-extrabold text-base">Langkah Selanjutnya</p>
          <p className="text-xs opacity-70 mt-1">Proses penerimaan belum selesai. Silakan lakukan daftar ulang untuk mengamankan posisi Anda.</p>
          <ul className="text-xs mt-3 space-y-2 opacity-90">
            <li>✓ Lengkapi dokumen administrasi yang dipersyaratkan.</li>
            <li>◉ Lakukan pembayaran biaya administrasi awal.</li>
            <li>📅 Batas akhir daftar ulang: <b>15 Agustus 2026</b></li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-6 text-sm">
        <span className="bg-slate-900 text-white rounded-lg px-5 py-2.5 font-bold">Lihat Informasi Daftar Ulang</span>
        <span className="border border-sky-700 text-sky-700 rounded-lg px-5 py-2.5 font-bold">🖨 Cetak Bukti Kelulusan</span>
      </div>
    </div>
  );
}
