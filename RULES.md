# RULES.md — Aturan Kerja Proyek JHIC2.0

> Semua anggota tim **WAJIB** membaca dan menaati dokumen ini. Aturan ini dibuat agar kerja tim rapi, riwayat Git bersih, dan tidak ada pekerjaan yang hilang.

## 1. Struktur Proyek

- `FE/` — kode frontend saja.
- `BE/` — kode backend saja.
- `Session/` — catatan, riset, notulen, referensi. Bukan tempat kode produksi.
- File root (`README.md`, `RULES.md`, `CHANGELOGS.md`, `COMMUNICATION.md`) hanya diubah bila perlu dan lewat PR.

Dilarang mencampur kode FE ke `BE/` dan sebaliknya. File sementara (`.tmp`, `node_modules/`, `.env` asli) tidak boleh di-commit. Gunakan `.gitignore`.

## 2. Aturan Dasar Git / GitHub

### 2.1 Branch
- **Branch `main` adalah branch produksi.** Dilarang commit/push langsung ke `main`.
- Semua pekerjaan dilakukan di branch fitur/perbaikan lalu digabung via **Pull Request (PR)**.
- Format nama branch (huruf kecil, tanda hubung):
  ```
  <tipe>/<deskripsi-singkat>
  ```
  Tipe yang diizinkan: `feat`, `fix`, `docs`, `refactor`, `chore`, `session`.
  Contoh:
  ```
  feat/login-page
  fix/auth-token-expired
  docs/update-rules
  session/riset-payment-gateway
  ```
- Satu branch = satu tujuan. Jangan campur banyak fitur dalam satu branch.
- Branch yang sudah di-merge harus dihapus (GitHub: centang *Delete branch* atau `git branch -d <nama>`).

### 2.2 Sinkronisasi
- Selalu sinkron sebelum mulai kerja dan sebelum push:
  ```bash
  git pull origin main
  # jika sedang di branch fitur:
  git fetch origin
  git rebase origin/main
  # atau merge bila rebase bermasalah:
  git merge origin/main
  ```
- Selesaikan conflict secara lokal. Jangan push kode yang masih conflict.
- Jangan commit file hasil conflict (`<<<<<<<`, `=======`, `>>>>>>>`) yang belum dibereskan.

### 2.3 Commit
- Commit kecil dan fokus: satu commit = satu perubahan logis.
- Gunakan Bahasa Indonesia atau Inggris yang jelas. Format yang dianjurkan (Conventional Commits):
  ```
  <tipe>: <deskripsi singkat> 
  ```
  Contoh:
  ```
  feat: tambah halaman login di FE
  fix: perbaiki validasi token expired di BE
  docs: tambah template changelog
  refactor: rapikan struktur folder BE/routes
  chore: tambah .gitignore untuk node_modules
  ```
- Tipe: `feat` (fitur baru), `fix` (perbaikan bug), `docs` (dokumentasi), `refactor`, `chore`, `session`.
- Dilarang commit dengan pesan kosong/tidak jelas seperti `update`, `fix bug`, `asdf`, `final fix`.
- Periksa dulu sebelum commit:
  ```bash
  git status
  git diff
  git add <file-terkait>   # hindari `git add .` membabi buta
  git commit -m "tipe: deskripsi jelas"
  ```

### 2.4 Push & Pull Request
- Push ke branch milikmu, bukan ke `main`:
  ```bash
  git push -u origin feat/nama-fitur
  ```
- Buat PR dengan:
  - **Title jelas**: contoh `[FE] Tambah halaman login`.
  - **Deskripsi**: apa yang diubah, kenapa, cara mengetes, screenshot bila ada perubahan UI.
  - **Link issue** (jika ada): `Closes #12`.
  - **Checklist**: kode sudah dites lokal, `CHANGELOGS.md` sudah diupdate, tidak ada secret terbawa.
- Minimal **1 reviewer** harus approve sebelum merge.
- Merge menggunakan **Squash and merge** (default) agar riwayat `main` bersih, kecuali disepakati lain.
- Dilarang me-merge PR sendiri tanpa review, kecuali kondisi darurat dan sudah diinformasikan di `COMMUNICATION.md`.

### 2.5 Larangan Keras
1. Push langsung ke `main` (`git push origin main` dari branch main untuk fitur).
2. Commit secret: password, API key, token, file `.env` asli. Gunakan `.env.example`.
3. Commit dependency besar (`node_modules/`, `vendor/`, file build) kecuali disepakati.
4. `git push --force` ke `main` atau branch milik orang lain. Force push hanya untuk branch sendiri dan dengan pemberitahuan.
5. Mengubah riwayat `main` (`rebase`/`reset` pada `main` yang sudah di-push).

## 3. Kewajiban Mencatat di CHANGELOGS.md

- **Setiap PR yang mengubah fitur, perilaku, API, atau perbaikan bug WAJIB menambah entri di `CHANGELOGS.md`.**
- PR tanpa update changelog akan diminta revisi / tidak di-merge.
- Format entri (lihat template di `CHANGELOGS.md`):
  ```markdown
  ## [Tanggal — YYYY-MM-DD] — Judul Perubahan
  - **Kategori:** Added / Changed / Fixed / Removed
  - **Area:** FE / BE / Docs / Session
  - **Deskripsi:** ...
  - **Branch/PR:** `feat/xxx` / #NN
  - **Penulis:** @nama
  ```
- Pengecualian (tidak wajib changelog): typo kecil di komentar kode, format whitespace saja. Selain itu tetap wajib.
- Urutan: entri terbaru paling atas.

## 4. Kewajiban Menggunakan COMMUNICATION.md

- Jika ada **pertanyaan, saran, atau usulan perubahan** (terutama perubahan besar/breaking change), **tulis di `COMMUNICATION.md`** — jangan hanya di chat.
- Alasannya: chat mudah tenggelam, file ini jadi arsip keputusan tim.
- Format tersedia di `COMMUNICATION.md` (Pertanyaan / Saran / Usulan Perubahan + tabel status Open → Answered/Discussed → Done/Rejected).
- Perubahan besar (ubah skema DB, ganti library inti, ubah kontrak API FE-BE) **wajib** dibuka dulu sebagai "Usulan Perubahan" dan didiskusikan sebelum dikerjakan.
- Respons: anggota lain wajib merespons entri `Open` maksimal **1x24 jam** (beri jawaban atau jadwal diskusi).

## 5. Review & Kualitas

- Pastikan kode berjalan lokal sebelum push (FE bisa di-build/run, BE endpoint dites).
- Hapus `console.log` / debug yang tidak perlu.
- Ikuti struktur yang sudah ada di `FE/` dan `BE/`. Jangan membuat struktur tandingan tanpa diskusi.
- PR yang gagal review harus diperbaiki di branch yang sama, bukan branch baru.

## 6. Sanksi Ringan (Kesepakatan Tim)

- Push ke `main` tanpa izin → pelaku wajib revert + catat kejadian di `COMMUNICATION.md`.
- Lupa isi changelog → PR dikembalikan (request changes) sampai dilengkapi.
- Membawa secret ke repo → segera cabut/rotasi kredensial + hapus dari riwayat bila perlu + catat di `COMMUNICATION.md`.

---

Dengan mengikuti aturan ini, riwayat Git tetap bersih, setiap perubahan terlacak, dan kolaborasi tetap lancar. Jika aturan ini perlu diubah, ajukan lewat `COMMUNICATION.md` → bagian Usulan Perubahan.
