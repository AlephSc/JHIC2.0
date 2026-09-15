# Session 2026-09-15 — Redesign SMKT_Style (Skills/SMKT_Style.md)

Kelanjutan `2026-09-12-fe-figma-replica.md`. Branch `feat/fe-smkt-style`.

## Sumber gaya
`Skills/SMKT_Style.md` — "Modern Institutional Navy": krem #FAF6F0 berselang navy #0A1628,
aksen biru #2563EB untuk semua CTA, radius besar 16-24px, navbar pill, blob dekoratif,
font Plus Jakarta Sans (judul) + Inter (body), tanpa shadow tebal.

Tambahan 2026-09-15 (sore): disamakan ke `Example/index.tsx` sebagai sumber kebenaran final —
font Lexend, menu #003366, link aktif #0059bb/#2c57ae, CTA #2669c0, FAB chatbot #215a9f,
teks body #44474d, border #c5c6cd, footer 4 kolom persis struktur Example.

## Yang diubah
- `FE/src/index.css` — design tokens lengkap (navy/blue/cream/gray/success) + `@theme` Tailwind
  (navy-950/900/800, brand, blue-soft, blue-badge, cream, line, muted, font-head/font-body) + class `.blob` blur.
- `FE/src/components/ui.tsx` — Tag (eyebrow uppercase + dot biru), BtnPrimer/BtnOutline/BtnDark,
  PillFilter (aktif navy solid), Photo + PhotoBlob (blob di belakang foto), Card radius-3xl,
  IconBox (blue-badge), StatCard, Stepper (ring biru + garis penghubung).
- `FE/src/components/Layout.tsx` — navbar pill dengan dropdown chevron (Tentang Kami/Program sesuai
  Figma dropdown PNG) + logo emblem; footer 4 kolom + sosmed + link Maps aktif.
- Landing `Home.tsx` — ritme krem→navy→krem→biru muda→navy CTA; hero 45/55 + blob; program tab
  checklist 2x2; mitra grid putih; berita featured + 2 kartu kecil; alumni bintang ★★★★★; CTA banner navy.
- `Jurusan.tsx` — kompetensi per jurusan (RPL/DKV/TKJ/PF masing-masing 6 kartu, sebelumnya hanya RPL),
  panel navy cek potensi, fasilitas ikon, CTA navy.
- `Fasilitas.tsx` — scroll anchor, kartu ikon blue-badge.
- `Ekstra.tsx` — filter Olahraga kini fungsional (4 ekstra baru), section beige Figma.
- `Produk.tsx` — filter fungsional, badge kategori overlay, spotlight Produk Pilihan, timeline 01-04,
  portofolio 4 kartu + arrows, CTA navy.
- `Berita.tsx` — FIX filter (kat upper-case), search ikon, badge overlay, judul uppercase, pagination state.
- `BeritaDetail.tsx` — sidebar Berita Lainnya 5 item baru (AKADEMIK/SEMINAR/ALUMNI/...), share ikon lingkaran.
- `Bkk.tsx` — hero biru muda + bullet, value-prop ikon, steps 01 biru/02-03 outline, agenda date-box
  biru/beige selang-seling, link Panduan CV di CTA.
- `BkkDetail.tsx` — deadline badge merah, checklist grid abu, sidebar Informasi Pendaftaran + footnote.
- `Ppdb.tsx` — kartu jalur + alur 4 langkah navy.
- `Auth.tsx` — split navy/putih sesuai style guide: input gray-100 + ikon prefix, validasi email/password,
  judul terpisah Login/Register, register punya link balik.
- `PpdbDaftar.tsx` — field terkontrol penuh (tempat/tgl/JK/WA/alamat/SMP + ortu ayah/ibu + wali kondisional),
  validasi NIK 16/NISN 10/WA 08xx, upload cek ukuran 5MB/2MB, review live dari state, Edit → setStep.
- `PpdbLain.tsx` — dashboard topbar bell/avatar, progress garis penghubung + numbering benar 01-05,
  tiket/status/lulus panel terang + navy, footer kontak hitam.
- `Quiz.tsx` — scoring nyata dari 8 jawaban (skor per jurusan), hasil dinamis + simpan sessionStorage,
  landing diamond staggered, microcopy rekomendasi awal.
- `Profil.tsx` — overlay quote foto, visi/misi 2 kolom, nilai ikon, Identitas Sekolah, Lingkungan navy.
- `Alumni.tsx` — highlight quote, filter badge tahun, Risky (bukan Rizky), CTA navy + 98% badge.

## Verifikasi
- `npm run typecheck` hijau, `npm run build` hijau (JS 284KB/gzip 84KB, CSS 39KB).
- `node FE/scripts/cdn-upload.mjs` guard OK, dist tanpa Figma.
- Foto tetap placeholder (aset Figma belum diekstrak) — komponen Photo siap diganti CdnImage.

## Next
1. Push branch + merge ke main (pola darurat yang sudah disepakati tim).
2. Ekstraksi foto Figma → public/img → upload CDN → ganti Photo → CdnImage.
3. BE: kontrak PPDB/Auth/Berita/BKK via COMMUNICATION.md.
