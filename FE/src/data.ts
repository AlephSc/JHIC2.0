// Data konten replika Figma — 1 sumber untuk semua halaman.
// Foto asli belum diekstrak (Figma hanya PNG full-page) → Photo placeholder dulu,
// nanti ganti src CdnImage ke URL ImageKit/Cloudinary tanpa ubah komponen.

export const JURUSAN = [
  { kode: 'RPL', nama: 'Rekayasa Perangkat Lunak', desc: 'Menjadi ahli pengembangan perangkat lunak dengan kurikulum standar industri. Fokus: programming, web development, database, aplikasi.' },
  { kode: 'TKJ', nama: 'Teknik Komputer & Jaringan', desc: 'Mempelajari infrastruktur jaringan, server, dan keamanan siber.' },
  { kode: 'DKV', nama: 'Desain Komunikasi Visual', desc: 'Eksplorasi kreativitas melalui desain grafis, ilustrasi, dan branding.' },
  { kode: 'PF', nama: 'Produksi Film (PF)', desc: 'Seni penyutradaraan, sinematografi, dan pasca-produksi video.' },
];

export const RPL_KOMPETENSI = [
  { t: 'Pemrograman Dasar', d: 'Penguasaan logika pemrograman dan struktur data untuk solusi perangkat lunak.' },
  { t: 'Web Development', d: 'Membangun platform web responsif dengan teknologi frontend dan backend modern.' },
  { t: 'Database Management', d: 'Arsitektur dan pengelolaan data skala besar menggunakan sistem manajemen database.' },
  { t: 'Mobile App Development', d: 'Pengembangan aplikasi mobile native dan cross-platform untuk kebutuhan industri.' },
  { t: 'API & Integrasi Sistem', d: 'Menghubungkan berbagai layanan digital melalui integrasi API yang aman.' },
  { t: 'Project Software Development', d: 'Implementasi siklus pengembangan perangkat lunak dalam proyek nyata.' },
];

export const FASILITAS = [
  { t: 'Laboratorium Komputer', d: 'Tersedia 7 laboratorium komputer untuk mendukung kegiatan praktik dan pembelajaran teknologi siswa.' },
  { t: 'Gedung Serba Guna (GSG)', d: 'Digunakan untuk seminar, presentasi, kegiatan siswa, dan berbagai acara sekolah.' },
  { t: 'Laboratorium Axioo', d: 'Laboratorium berbasis industri yang mendukung pembelajaran teknologi dan praktik sesuai kebutuhan dunia kerja.' },
  { t: 'Monitoring Panel Surya', d: 'Fasilitas monitoring panel surya untuk pembelajaran energi terbarukan dan sistem monitoring real-time.' },
];

export const EKSTRA = [
  { t: 'Desain Website', d: 'Pelajari UI/UX dan bangun website responsif yang menarik secara visual dan fungsional.' },
  { t: 'Robotik', d: 'Rancang, rakit, dan program robot otonom untuk berbagai tantangan inovatif.' },
  { t: 'Servis HP & Perangkat', d: 'Kuasai perbaikan perangkat keras dan lunak mobile, skill praktis yang siap kerja.' },
  { t: 'Pemrograman', d: 'Asah logika dan bangun aplikasi perangkat lunak dari dasar hingga tingkat lanjut.' },
];

export const BERITA = [
  { id: 'pensla-fest', kat: 'PRESTASI', tgl: '12 Agustus 2026', judul: 'Siswa SMK Telekomunikasi Darul Ulum Raih Prestasi di Kompetisi Teknologi Nasional', ringkas: 'Tim robotika meraih juara pertama National Tech Innovation Showcase 2026.' },
  { id: 'ziarah-wali', kat: 'KEGIATAN SEKOLAH', tgl: '02 Agustus 2026', judul: 'Ziarah Wali 5 (Jatim)', ringkas: 'Guru dan siswa ziarah wali lima Jawa Timur.' },
  { id: 'tka-2025', kat: 'KEGIATAN SEKOLAH', tgl: '02 Agustus 2026', judul: 'TKA 2025 Kelas 12', ringkas: 'Tes kemampuan akademik siswa kelas 12.' },
  { id: 'axioo-class', kat: 'KEMITRAAN & KERJASAMA', tgl: '28 Juli 2026', judul: 'AXIO Class', ringkas: 'Kolaborasi kelas industri bersama Axioo.' },
  { id: 'pjj-pens', kat: 'KEMITRAAN & KERJASAMA', tgl: '20 Juli 2026', judul: 'PJJ PENS', ringkas: 'Kuliah tamu dan penjajakan kerja sama dengan PENS.' },
  { id: 'hari-guru', kat: 'KEGIATAN SEKOLAH', tgl: '02 Agustus 2026', judul: 'Hari Guru Nasional', ringkas: 'Perayaan hari guru nasional di sekolah.' },
  { id: 'juara-pensla', kat: 'PRESTASI', tgl: '02 Agustus 2026', judul: 'Juara 1 Pensla', ringkas: 'Juara 1 Pensla Fest 2025 kategori aplikasi.' },
  { id: 'upacara-17', kat: 'KEGIATAN SEKOLAH', tgl: '17 Agustus 2026', judul: 'Upacara 17 Agustus', ringkas: 'Peringatan kemerdekaan Indonesia.' },
  { id: 'peresmian-plts', kat: 'PENGUMUMAN', tgl: '20 Juli 2026', judul: 'Peresmian PLTS', ringkas: 'Peresmian PLTS di lantai 2 sekolah.' },
];

export const LOWONGAN = [
  { id: 'junior-web-dev', jurusan: 'RPL', tipe: 'Full-time', posisi: 'Junior Web Developer', perush: 'SYNEX', lokasi: 'Sidoarjo', deskripsi: 'Bergabunglah dengan tim SYNEX untuk membangun aplikasi web inovatif. Kami mencari lulusan SMK berbakat yang siap belajar di bawah bimbingan senior developer.', tugas: ['Pengembangan UI responsif (HTML/CSS/JS)', 'Integrasi API dan layanan backend', 'Testing dan debugging aplikasi', 'Dokumentasi teknis proyek'], kualifikasi: ['Lulusan SMK RPL atau setara', 'Dasar Web (HTML, CSS, JavaScript)', 'Pemahaman SQL/NoSQL (nilai tambah)', 'Kemampuan kerja tim yang baik', 'Semangat belajar teknologi baru'], deadline: '30 Agustus 2026' },
  { id: 'graphic-design-intern', jurusan: 'DKV', tipe: 'Internship', posisi: 'Graphic Design Intern', perush: 'Kreatif Studio Makmur', lokasi: 'Surabaya, Jawa Timur', deskripsi: 'Magang desain grafis untuk portofolio industri kreatif.', tugas: ['Desain konten media sosial', 'Membantu tim branding'], kualifikasi: ['Siswa/alumni DKV', 'Menguasai Figma/Canva'], deadline: '15 September 2026' },
  { id: 'network-support', jurusan: 'TKJ', tipe: 'Full-time', posisi: 'Network Support Technician', perush: 'PT Jaringan Cepat Indonesia', lokasi: 'Gresik, Jawa Timur', deskripsi: 'Dukungan teknis jaringan untuk klien korporat.', tugas: ['Troubleshooting jaringan', 'Instalasi perangkat'], kualifikasi: ['Lulusan TKJ', 'Memahami TCP/IP dan mikrotik'], deadline: '30 September 2026' },
  { id: 'junior-video-editor', jurusan: 'PF', tipe: 'Contract', posisi: 'Junior Video Editor', perush: 'Visual Sinergi Production', lokasi: 'Jakarta Selatan', deskripsi: 'Editing video komersial dan dokumenter.', tugas: ['Editing dan color grading', 'Motion grafis dasar'], kualifikasi: ['Portofolio video', 'Menguasai Premiere/DaVinci'], deadline: '20 September 2026' },
];

export const TESTIMONI = [
  { nama: 'Fajar Nugraha', peran: 'Alumni RPL • Software Engineer', teks: 'Kurikulum dan project akhir sangat terpakai di industri. Saya siap kerja sejak lulus.' },
  { nama: 'Aulia Rahma', peran: 'Alumni TKJ • Network Engineer', teks: 'Lab standar industri membuat saya tidak kaget saat magang dan bekerja.' },
  { nama: 'Nabila Putri', peran: 'Alumni DKV • UI/UX Designer', teks: 'Sekolah bukan hanya mengajarkan skill, tapi cara berpikir kreatif.' },
];

export const LOGO_MITRA = ['Google', 'Microsoft', 'Toyota', 'GoTo', 'Bukalapak', 'Traveloka', 'Bibit', 'Ojek', 'Kredivo', 'Jenius', 'Halodoc'];

export const QUIZ = [
  { q: 'Aktivitas mana yang paling membuat kamu tertarik?', opsi: ['Membuat website atau aplikasi', 'Mengatur komputer, jaringan, atau perangkat', 'Membuat desain, ilustrasi, atau visual kreatif', 'Mengambil video, membuat cerita, atau editing film'] },
  { q: 'Saat ada masalah, kamu biasanya?', opsi: ['Menulis kode untuk mengotomatisasi solusi', 'Mengecek kabel, jaringan, dan perangkat', 'Membuat sketsa visual penjelas', 'Merekam dan menyusun cerita'] },
  { q: 'Pelajaran favoritmu?', opsi: ['Informatika / pemrograman', 'Fisika / elektro', 'Seni / desain', 'Bahasa / sinematografi'] },
  { q: 'Proyek impianmu?', opsi: ['Aplikasi yang dipakai banyak orang', 'Jaringan sekolah yang cepat dan aman', 'Brand dan kampanye visual', 'Film pendek festival'] },
  { q: 'Waktu luang paling sering dipakai untuk?', opsi: ['Ngoding / eksplorasi aplikasi', 'Oprek PC / server / jaringan', 'Gambar / desain poster', 'Nonton dan analisis film'] },
  { q: 'Kamu paling bangga saat?', opsi: ['Program berjalan tanpa bug', 'Jaringan pulih dan stabil', 'Desain dipuji orang', 'Video ditonton banyak orang'] },
  { q: 'Tim seperti apa yang kamu mau?', opsi: ['Tim developer produk digital', 'Tim infrastruktur IT', 'Tim kreatif studio', 'Tim produksi film'] },
  { q: 'Setelah lulus ingin jadi?', opsi: ['Software engineer', 'Network engineer', 'Desainer profesional', 'Filmmaker'] },
];

export const KONTAK = {
  alamat: 'Ponpes Darul Ulum Rejoso Peterongan Jombang',
  wa: '085649400339',
  email: 'smktelkomdujbg@gmail.com',
};
