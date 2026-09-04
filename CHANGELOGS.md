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

### Contoh (hapus setelah entri asli pertama masuk)

## [2026-09-04] — Tambah halaman login FE
- **Kategori:** Added
- **Area:** FE
- **Deskripsi:** Menambah halaman `/login` dengan validasi email + password dan integrasi awal ke `POST /api/auth/login`.
- **Branch/PR:** `feat/login-page` / #1
- **Penulis:** @contoh

<!-- Tambahkan entri baru DI ATAS baris ini (tepat di bawah "## Riwayat"), contoh di atas boleh dihapus setelah ada entri asli. -->
