# CHANGELOGS.md — Riwayat Perubahan JHIC2.0

> **WAJIB DIISI.** Setiap Pull Request yang menambah/mengubah/memperbaiki fitur, API, atau perilaku aplikasi harus menambah satu entri di file ini. PR tanpa entri changelog akan diminta revisi (lihat `RULES.md` bagian 3).

## Cara Mengisi

1. Tambahkan entri **baru di paling atas** (di bawah baris ini), jangan di bawah.
2. Salin template di bawah, isi semua kolom.
3. Kategori pilih salah satu: `Added` (fitur baru) / `Changed` (perubahan perilaku) / `Fixed` (perbaikan bug) / `Removed` (penghapusan).
4. Area pilih: `FE` / `BE` / `Docs` / `Session`.
5. Satu entri = satu perubahan logis. Jika PR berisi 2 fitur berbeda, buat 2 entri.

### Template (salin ini)

```markdown
## [YYYY-MM-DD] — Judul singkat perubahan
- **Kategori:** Added / Changed / Fixed / Removed
- **Area:** FE / BE / Docs / Session
- **Deskripsi:** Penjelasan 1–3 kalimat. Apa yang berubah dan dampaknya (mis. endpoint apa, halaman apa).
- **Branch/PR:** `nama-branch` / #NN
- **Penulis:** @nama-github
```

---

## Riwayat

## [2026-09-12] — Replika Figma penuh (25 route)
- **Kategori:** Added
- **Area:** FE / Session
- **Deskripsi:** Replika 33 PNG jadi 25 route (landing, jurusan, fasilitas, ekstra, produk, berita+detail, BKK+detail, PPDB landing/auth/wizard/dashboard/tiket/status/lulus, quiz 3 layar, profil, alumni) + navbar pill & footer Figma. Foto masih placeholder gradien. Build/typecheck hijau.
- **Branch/PR:** `feat/fe-figma-replica` → `main` (squash, pengecualian darurat)
- **Penulis:** @moh-limo

## [2026-09-11] — Merge fondasi FE ke main + lengkapi log komunikasi
- **Kategori:** Changed
- **Area:** Docs / Session
- **Deskripsi:** Q-002 → Done, tambah C-002 (Done) + 2 baris Log Keputusan; merge darurat `feat/fe-resilient-foundation` ke `main` (`996c374`) tanpa reviewer + hapus branch (pengecualian RULES 2.4 atas permintaan pemilik agar tim cukup `pull main`).
- **Branch/PR:** `main` langsung (pengecualian darurat, tanpa nomor PR)
- **Penulis:** @moh-limo

## [2026-09-11] — FE resilient foundation (Vite statis + config IP/port + fallback)
- **Kategori:** Added
- **Area:** FE
- **Deskripsi:** Scaffold FE Vite+React+TS+Tailwind (6 route), config runtime IP/port terpisah tanpa rebuild, CdnImage fallback + SW, outbox PPDB ANTRE- + WA manual, blacklist FE/Figma, guard CDN, workflow GH Pages L2. Build/typecheck hijau.
- **Branch/PR:** `feat/fe-resilient-foundation` / #NN
- **Penulis:** @moh-limo

### Contoh (hapus setelah entri asli pertama masuk)

## [2026-09-04] — Tambah halaman login FE
- **Kategori:** Added
- **Area:** FE
- **Deskripsi:** Menambah halaman `/login` dengan validasi email + password dan integrasi awal ke `POST /api/auth/login`.
- **Branch/PR:** `feat/login-page` / #1
- **Penulis:** @contoh

<!-- Tambahkan entri baru DI ATAS baris ini (tepat di bawah "## Riwayat"), contoh di atas boleh dihapus setelah ada entri asli. -->
