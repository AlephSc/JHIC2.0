# Session 2026-09-12 — Replika Figma penuh (25 route)

Kelanjutan `2026-09-11-fe-resilient-foundation.md`. Fondasi (config, outbox, CdnImage, SW,
blacklist, workflow) tidak diubah; yang dibangun: isi replika 33 PNG.

## Cakupan route (HashRouter, 1 artefak L0/L1/L2)

- `/` Landing Page.png penuh: hero navy, kepala sekolah, video profil, program + tab PF/TKJ/RPL/DKV,
  statistik, mitra industri, berita featured, alumni.
- `/jurusan` Jurusan.png: hero, panel navy cek potensi, tab 4 jurusan, 6 kompetensi RPL,
  fasilitas standar industri, CTA.
- `/fasilitas` Fasilitas.png (4 kartu), `/ekstrakurikuler` Ekstrakulikuler.png (filter + 4 kartu + panel navy),
  `/produk` Produk Unggulan.png (filter, 3+1 kartu, alur Belajar-Praktik-Produksi-Hasil).
- `/berita` Berita.png (featured + search/filter + grid + pagination), `/berita/:id` Berita Lengkap.png
  (body KITN/E-Waste Connect, quote, sidebar Berita Lainnya + Paling Dibaca + Kategori).
- `/bkk` BKK.png (hero, 3 pilar, 3 kartu layanan, filter lowongan, cara melamar 01-03, agenda, CTA),
  `/bkk/:id` BKK Perusahaan.png (detail Junior Web Developer + sidebar pendaftaran + mailto).
- `/ppdb` PPDB Page.png (hero + info), `/login` + `/register` (split navy),
  `/ppdb/daftar` wizard 4 step (Data Siswa + SMP + jurusan → Ortu + Wali → 5 Berkas → Review + pernyataan),
  `/ppdb/dashboard` (status + progress 5 tahap + tiket), `/ppdb/tiket` PPDP Tiket.png,
  `/ppdb/status` PPDB Status.png (jejak + apa yang harus dilakukan), `/ppdb/lulus` PPDP Pernyatan.png.
- `/cek-potensi` + `/cek-potensi/quiz` (8 soal, progress) + `/cek-potensi/hasil` (RPL 86%).
- `/profil` Html → Body-2.png (visi/misi/nilai), `/alumni` Html → Body.png (highlight + grid + langkah lulus).
- Navbar pill + footer 4 kolom disamakan ke Figma di `Layout.tsx`.

## Batasan jujur

- Foto asli belum ada (Figma hanya screenshot full-page) → komponen `Photo` gradien berlabel di
  `components/ui.tsx`; ganti ke URL ImageKit/Cloudinary tanpa ubah pemanggil saat aset siap.
- Copy diambil dari hasil baca 33 PNG (12 Sep); teks kecil yang buram di thumbnail diisi wajar.
- `Html → Body-1.png` hanya footer Inggris → tidak dibuatkan route (sudah terwakili footer Layout).
- `template.png` blank + dropdown `Tentang Kami.png`/`Program.png` → jadi bagian navbar, bukan halaman.

## Verifikasi

- `npm run typecheck` hijau (1 error `PpdbLain.tsx` diperbaiki), `npm run build` hijau
  (JS 259KB/gzip 78KB, CSS 27KB). `dist/` tanpa Figma, guard `cdn:upload` OK.
