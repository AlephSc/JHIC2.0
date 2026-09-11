# COMMUNICATION.md — Papan Komunikasi Tim JHIC2.0

> Semua **pertanyaan, saran, dan usulan perubahan** dicatat di sini agar tidak tenggelam di chat. Chat boleh untuk diskusi cepat, tapi **keputusan final wajib dirangkum di file ini**.
>
> Aturan respons: entri berstatus `Open` wajib direspons maksimal **1x24 jam** (lihat `RULES.md` bagian 4).

## Cara Pakai

- Pilih salah satu bagian: **Pertanyaan**, **Saran**, atau **Usulan Perubahan**.
- Salin template yang tersedia, isi, dan letakkan di **paling atas** bagian tersebut (terbaru di atas).
- Status: `Open` → `Answered` / `Discussed` / `Done` / `Rejected`.
- Setiap entri wajib punya: tanggal, penulis, status. Usulan perubahan besar wajib didiskusikan dulu sebelum dikerjakan.

---

## 1. Pertanyaan (Q&A)

### Template Pertanyaan

```markdown
### Q-XXX — Judul pertanyaan singkat
- **Tanggal:** YYYY-MM-DD
- **Penanya:** @nama
- **Status:** Open
- **Pertanyaan:** ...
- **Konteks:** (link file/baris, screenshot, error log bila ada)
- **Jawaban:** (diisi penjawab + tanggal + nama)
```

### Daftar Pertanyaan

<!-- Tambahkan pertanyaan baru di bawah baris ini (terbaru paling atas). -->

### Q-002 — Kunci arsitektur FE resilient L0/L1/L2 + CDN + config IP
- **Tanggal:** 2026-09-11
- **Penanya:** @moh-limo
- **Status:** Open
- **Pertanyaan:** Setuju? Framework Vite statis 1 artefak (L0/L1/L2), CDN publik ImageKit/Cloudinary + berkas PPDB privat, config IP/port runtime `config.js`, outbox ANTRE- + WA 085649400339, blacklist FE/Figma. Detail: `Session/2026-09-11-fe-resilient-foundation.md`.
- **Konteks:** Branch `feat/fe-resilient-foundation`, 33 Figma sudah dibaca, BE masih chatbot saja (`BE/openapi.yaml`).
- **Jawaban:** -

### Q-001 — Contoh: kontrak API auth seperti apa?
- **Tanggal:** 2026-09-04
- **Penanya:** @contoh
- **Status:** Answered
- **Pertanyaan:** FE butuh format request/response untuk `POST /api/auth/login`. Field apa saja?
- **Konteks:** `BE/` belum ada kontrak tertulis.
- **Jawaban:** (2026-09-04, @contoh) Disepakati: request `{email, password}`, response `{token, user:{id,name,email}}`. Detail ditulis di `Session/kontrak-api-auth.md`.

---

## 2. Saran

### Template Saran

```markdown
### S-XXX — Judul saran singkat
- **Tanggal:** YYYY-MM-DD
- **Pengusul:** @nama
- **Status:** Open
- **Saran:** ...
- **Alasan/Manfaat:** ...
- **Tindak lanjut:** (diisi setelah diskusi)
```

### Daftar Saran

<!-- Tambahkan saran baru di bawah baris ini (terbaru paling atas). -->

### S-001 — Contoh: tambah validasi email di sisi FE
- **Tanggal:** 2026-09-04
- **Pengusul:** @contoh
- **Status:** Open
- **Saran:** Tambahkan validasi format email sebelum submit form login.
- **Alasan/Manfaat:** Mengurangi request gagal ke BE.
- **Tindak lanjut:** -

---

## 3. Usulan Perubahan (termasuk Breaking Change)

> Perubahan besar (ubah skema DB, ganti library inti, ubah kontrak API FE-BE, rombak struktur folder) **wajib** lewat bagian ini dan disetujui dulu sebelum dikerjakan.

### Template Usulan

```markdown
### C-XXX — Judul usulan singkat
- **Tanggal:** YYYY-MM-DD
- **Pengusul:** @nama
- **Status:** Open
- **Jenis:** Breaking / Non-breaking
- **Area terdampak:** FE / BE / Keduanya / Docs
- **Deskripsi perubahan:** ...
- **Alasan:** ...
- **Alternatif yang dipertimbangkan:** ...
- **Keputusan:** (diisi setelah diskusi + tanggal + siapa yang menyetujui)
```

### Daftar Usulan

<!-- Tambahkan usulan baru di bawah baris ini (terbaru paling atas). -->

### C-001 — Contoh: ganti format respons error BE
- **Tanggal:** 2026-09-04
- **Pengusul:** @contoh
- **Status:** Discussed
- **Jenis:** Breaking
- **Area terdampak:** Keduanya
- **Deskripsi perubahan:** Samakan semua respons error menjadi `{code, message, details}`.
- **Alasan:** FE butuh format konsisten untuk menampilkan pesan error.
- **Alternatif yang dipertimbangkan:** Tetap per-endpoint berbeda (ditolak karena menyulitkan FE).
- **Keputusan:** (2026-09-04) Disetujui, dikerjakan di branch `feat/error-format`, dicatat di `CHANGELOGS.md`.

---

## 4. Log Keputusan Singkat

Catat keputusan final yang sudah disepakati agar mudah dicari (opsional tapi dianjurkan).

| Tanggal | Keputusan | Penanggung jawab |
|---------|-----------|------------------|
| 2026-09-04 | Contoh: format error BE `{code, message, details}` | @contoh |
