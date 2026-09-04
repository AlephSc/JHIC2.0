# JHIC2.0
A Full Stack Web App Developed By Moh Limo Team

## Deskripsi
JHIC2.0 adalah aplikasi web full-stack yang dikembangkan oleh Tim Moh Limo untuk lomba. Proyek ini dipisahkan menjadi Frontend (FE), Backend (BE), dan dokumentasi sesi/riset (Session).

## Struktur Direktori

```
JHIC2.0/
├── FE/               # Frontend — seluruh kode antarmuka (UI/UX, pages, components, assets)
├── BE/               # Backend — API, database, autentikasi, business logic
├── Session/          # Catatan sesi — riset, hasil diskusi, notulen, referensi, draft
├── README.md         # Dokumen ini
├── RULES.md          # Aturan kerja & aturan Git/GitHub (WAJIB DIBACA)
├── CHANGELOGS.md     # Catatan setiap perubahan/fitur (WAJIB DIISI)
└── COMMUNICATION.md  # Tempat bertanya, memberi saran, mengusulkan perubahan
```

### Penjelasan Folder
- **FE/** : Kode frontend saja. Jangan taruh kode backend di sini.
- **BE/** : Kode backend saja. Jangan taruh kode frontend di sini.
- **Session/** : File pendukung non-kode. Contoh: `Session/2026-09-04-riset-auth.md`, `Session/notulen-rapat.md`, screenshot, referensi API.

## Cara Mulai

1. Clone repository:
   ```bash
   git clone <URL-REPO-JHIC2.0>
   cd JHIC2.0
   ```
2. Baca aturan kerja di [RULES.md](./RULES.md) sebelum menulis kode.
3. Buat branch baru untuk setiap tugas (lihat aturan penamaan branch di `RULES.md`).
4. Lihat riwayat perubahan di [CHANGELOGS.md](./CHANGELOGS.md).
5. Punya pertanyaan/saran? Tulis di [COMMUNICATION.md](./COMMUNICATION.md), jangan hanya di chat yang mudah hilang.

## Alur Kerja Singkat

1. `git pull origin main` — sinkronkan dulu sebelum mulai.
2. `git checkout -b <tipe>/<nama-singkat>` — kerja di branch sendiri.
3. Kerjakan perubahan di `FE/` atau `BE/` sesuai bagianmu.
4. Update `CHANGELOGS.md` — setiap fitur/perbaikan wajib dicatat.
5. Push + buat Pull Request ke `main` — minta review minimal 1 orang.
6. Merge hanya setelah PR di-approve.

> Aturan lengkap ada di [RULES.md](./RULES.md). Pelanggaran aturan (misal push langsung ke `main` atau lupa isi changelog) akan diminta untuk diperbaiki sebelum merge.

## Kontak & Komunikasi
Gunakan [COMMUNICATION.md](./COMMUNICATION.md) untuk:
- Pertanyaan teknis / non-teknis
- Saran fitur atau perbaikan
- Usulan perubahan besar (breaking change)

## Tim
Moh Limo Team — JHIC2.0
