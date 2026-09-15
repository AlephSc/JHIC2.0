import { BtnDark, BtnOutline, Card } from '../components/ui';
import { loadOutbox } from '../lib/outbox';
import { KONTAK } from '../data';

// SMKT_Style PPDB lainnya: dashboard (topbar + progress + tiket), Tiket (center sukses),
// Status (2 kolom + jejak + checklist), Lulus (panel terang + panel navy).
export function PpdbDashboard() {
  const outbox = loadOutbox();
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center text-xs border-b border-line-soft pb-3">
        <span className="font-head font-extrabold">SMK TELEKOMUNIKASI DARUL ULUM</span>
        <span className="flex items-center gap-3">🔔 <span className="flex items-center gap-1.5"><span className="w-6 h-6 rounded-full bg-blue-badge text-brand flex items-center justify-center font-bold">👤</span> User</span> | <span className="text-red-600 font-bold">Keluar</span></span>
      </div>
      <div>
        <h1 className="text-3xl font-extrabold">Selamat datang, User 👋</h1>
        <p className="text-sm text-body-text/80 mt-1">Kelola proses pendaftaran PPDB Anda dari halaman ini.</p>
      </div>
      <div className="grid gap-5 md:grid-cols-[1fr_2fr]">
        <Card className="p-6">
          <div className="flex justify-between items-center"><p className="font-head font-bold">Status Pendaftaran</p><span className="text-[11px] bg-blue-badge text-brand rounded-full px-2.5 py-1 font-bold">Belum Selesai</span></div>
          <p className="text-xs text-body-text/80 mt-2 leading-relaxed">Lengkapi data pendaftaran dan upload berkas untuk melanjutkan proses PPDB.</p>
          <BtnDark to="/ppdb/daftar"><span className="w-full">Lanjutkan Pendaftaran →</span></BtnDark>
        </Card>
        <Card className="p-6">
          <p className="text-[11px] font-bold uppercase tracking-widest text-body-text/80">Progress Pendaftaran</p>
          <div className="flex items-center justify-between mt-4 text-[10px] text-center">
            {([['01 Akun', true], ['02 Data Diri', true], ['03 Berkas', false], ['04 Verifikasi', false], ['05 Seleksi', false]] as Array<[string, boolean]>).map(([l, done], idx) => (
              <div key={l} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <span className={`w-9 h-9 rounded-full flex items-center justify-center font-bold ${done ? 'bg-brand text-white' : idx === 2 ? 'bg-white ring-[3px] ring-brand text-brand' : 'bg-gray-100 text-gray-400'}`}>{done ? '✓' : idx + 1}</span>
                  <p className={`mt-1.5 font-bold ${done ? 'text-brand' : idx === 2 ? 'text-brand' : 'text-gray-400'}`}>{l}</p>
                </div>
                {idx < 4 && <div className={`flex-1 h-0.5 mx-1 mb-5 ${idx < 1 ? 'bg-brand' : 'bg-gray-100'}`} />}
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card className="p-6">
        <p className="font-head font-bold">🎟 Tiket Pendaftaran</p>
        <p className="text-xs text-body-text/80 mt-1">Gunakan tiket pendaftaran untuk memantau proses verifikasi dan hasil seleksi.</p>
        <p className="mt-3 bg-gray-100 border-dashed border-[1.5px] border-line-soft rounded-xl px-4 py-3 text-xs flex justify-between items-center"><span className="text-gray-400">ID TIKET</span><b>{outbox[0]?.antreId ?? 'PPDB-2026-001245'}</b></p>
        <p className="text-[11px] italic text-gray-400 mt-2">* Tiket akan tersedia setelah pendaftaran berhasil dikirim.</p>
        <div className="flex gap-3 mt-3">
          <BtnOutline to="/ppdb/status">Cek Status</BtnOutline>
          <BtnDark to="/ppdb/daftar">Lanjutkan Pendaftaran →</BtnDark>
        </div>
        {outbox.length > 0 && <p className="text-[11px] mt-3 bg-amber-50 border border-amber-200 rounded-xl p-3">Antrean perangkat: {outbox.map((o) => o.antreId).join(', ')}</p>}
      </Card>
      <div className="bg-navy text-white rounded-3xl p-5 text-xs flex flex-wrap justify-between gap-2">
        <span>📞 {KONTAK.wa}</span><span>✉ {KONTAK.email}</span>
      </div>
    </div>
  );
}

export function PpdbTiket() {
  return (
    <div className="max-w-2xl mx-auto text-center py-6">
      <p className="w-20 h-20 mx-auto rounded-full bg-brand text-white text-3xl flex items-center justify-center font-bold">✓</p>
      <h1 className="text-4xl font-extrabold mt-5">Pendaftaran Berhasil!</h1>
      <p className="text-sm text-body-text/80 mt-2">Terima kasih. Data pendaftaran Anda telah kami terima dan sedang dalam proses.</p>
      <Card className="p-8 mt-6 bg-gray-100 text-left">
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.2em] text-body-text/80">Nomor Pendaftaran</p>
        <p className="text-center text-brand font-extrabold text-2xl tracking-[0.15em] mt-1">PPDB-2026-001245</p><hr className="my-4 border-line-soft" />
        <div className="grid grid-cols-2 gap-3 text-xs">
          <p><span className="text-body-text/80">Nama Lengkap</span><br /><b>Budi Santoso</b></p>
          <p><span className="text-body-text/80">Jurusan</span><br /><b>Teknik Komputer dan Jaringan</b></p>
          <p><span className="text-body-text/80">Tanggal Daftar</span><br /><b>24 Oktober 2025</b></p>
          <p><span className="text-body-text/80">Status</span><br /><span className="bg-brand text-white rounded-full px-2.5 py-1 font-bold">Menunggu Verifikasi</span></p>
        </div>
      </Card>
      <p className="bg-blue-badge text-xs rounded-2xl p-4 mt-4 text-left text-navy"><b>ⓘ Simpan nomor pendaftaran untuk memantau status.</b> Anda dapat menggunakan nomor ini untuk login dan melihat perkembangan seleksi.</p>
      <div className="flex gap-3 justify-center mt-5 text-sm">
        <BtnDark to="/ppdb/status">👁 Lihat Status Pendaftaran</BtnDark>
        <BtnOutline to="/">🏠 Kembali ke Beranda</BtnOutline>
      </div>
    </div>
  );
}

export function PpdbStatus() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <p className="font-head font-extrabold text-2xl leading-tight">Status<br /><span className="text-brand">Pendaftaran</span></p>
        <Card className="p-7 mt-4">
          <p className="text-[11px] font-bold uppercase tracking-widest text-body-text/80">Status Saat Ini</p>
          <p className="font-head font-bold text-lg mt-2">⏳ Menunggu Proses Seleksi</p>
          <p className="text-sm text-body-text/80 mt-2 leading-relaxed">Dokumen pendaftaran Anda telah berhasil kami terima dan saat ini sedang dalam tahap verifikasi administrasi oleh tim panitia penerimaan siswa baru.</p>
          <button className="bg-navy hover:bg-brand-hover text-white text-xs font-bold rounded-full px-6 py-3 mt-5 transition-colors">⟳ Refresh Status</button>
        </Card>
      </div>
      <div className="space-y-5">
        <Card className="p-6 bg-gray-100">
          <p className="font-head font-extrabold text-lg">Jejak Pendaftaran</p>
          <div className="flex justify-between mt-4 text-[10px] text-center">
            {[['Pendaftaran Dikirim', true], ['Dokumen Diterima', true], ['Verifikasi Administrasi', false], ['Proses Seleksi', false], ['Hasil Seleksi', false]].map(([l, done]) => (
              <div key={l as string} className="w-16">
                <span className={`w-9 h-9 mx-auto rounded-full flex items-center justify-center font-bold ${done ? 'bg-brand text-white' : l === 'Verifikasi Administrasi' ? 'bg-white ring-[3px] ring-brand text-brand' : 'bg-white border border-line-soft text-gray-400'}`}>{done ? '✓' : '•'}</span>
                <p className={`mt-1.5 font-bold leading-tight ${l === 'Verifikasi Administrasi' ? 'text-brand' : done ? 'text-navy' : 'text-gray-400'}`}>{l as string}</p>
              </div>
            ))}
          </div>
        </Card>
        <div>
          <p className="font-head font-extrabold text-lg">Apa yang harus dilakukan?</p>
          {[['⏰', 'Pastikan nomor telepon dan email yang Anda daftarkan aktif untuk menerima notifikasi jadwal seleksi.'], ['📚', 'Pelajari materi dasar sesuai Program Keahlian yang Anda pilih sebagai persiapan tes masuk.'], ['📖', 'Cek halaman ini secara berkala atau tunggu email resmi dari panitia PPDB.']].map(([ic, t]) => (
            <Card key={t} className="p-4 mt-2.5 text-xs text-body-text/80 flex gap-3 items-start">
              <span className="w-9 h-9 shrink-0 rounded-xl bg-blue-badge text-brand flex items-center justify-center">{ic}</span>{t}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PpdbLulus() {
  return (
    <div className="text-center max-w-3xl mx-auto py-6">
      <p className="w-16 h-16 mx-auto rounded-full bg-brand text-white text-2xl flex items-center justify-center font-bold">✓</p>
      <h1 className="text-4xl font-extrabold mt-4 leading-tight">Selamat!<br />Anda Dinyatakan Lulus Seleksi</h1>
      <p className="text-sm text-body-text/80 mt-3">Pencapaian luar biasa. Selamat bergabung dengan ekosistem profesional SMK Telekomunikasi Darul Ulum.</p>
      <div className="grid sm:grid-cols-2 gap-5 mt-8 text-left">
        <Card className="p-6 text-sm">
          <div className="flex justify-between items-center"><p className="font-head font-extrabold">Detail Peserta</p><span className="text-[11px] bg-[var(--success-bg)] text-[var(--success-text)] rounded-full px-2.5 py-1 font-bold">DITERIMA</span></div>
          <div className="text-xs mt-4 space-y-3">
            <p><span className="text-body-text/80">NOMOR REGISTRASI</span><br /><b>REG-2026-8924A</b></p>
            <p><span className="text-body-text/80">NAMA LENGKAP</span><br /><b>Bima Satria</b></p>
            <p><span className="text-body-text/80">PROGRAM KEAHLIAN</span><br /><b className="text-brand">Rekayasa Perangkat Lunak</b> &nbsp; TAHUN AKADEMIK <b>2026/2027</b></p>
          </div>
        </Card>
        <div className="bg-navy text-white rounded-3xl p-6 text-sm text-left">
          <p className="font-head font-extrabold">Langkah Selanjutnya</p>
          <p className="text-xs text-white/60 mt-1.5 leading-relaxed">Proses penerimaan belum selesai. Silakan lakukan daftar ulang untuk mengamankan posisi Anda.</p>
          <ul className="text-xs mt-4 space-y-2.5 text-white/90">
            <li className="flex gap-2"><span className="text-[#7db3e8]">✓</span> Lengkapi dokumen administrasi yang dipersyaratkan.</li>
            <li className="flex gap-2"><span className="text-[#7db3e8]">✓</span> Lakukan pembayaran biaya administrasi awal.</li>
            <li className="flex gap-2"><span className="text-[#7db3e8]">📅</span> Batas akhir daftar ulang: <b>15 Agustus 2026</b></li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center gap-3 mt-7 text-sm">
        <BtnDark to="/ppdb">Lihat Informasi Daftar Ulang</BtnDark>
        <BtnOutline onClick={() => window.print()}>🖨 Cetak Bukti Kelulusan</BtnOutline>
      </div>
    </div>
  );
}
