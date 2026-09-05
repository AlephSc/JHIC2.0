# 01 — Install & Setup (Windows / Linux)

## 1. Prasyarat

- Node.js **>= 20** (`node --version`). Direkomendasikan Node 20/22 LTS.
- npm bawaan Node (`npm --version`).
- Git.
- Tanpa API key pun bisa jalan (mode `local-offline` jawab dari FAQ).

## 2. Install pertama kali

```bash
cd BE
copy .env.example .env   # Windows cmd
# cp .env.example .env   # Linux/macOS
npm install
```

> `copy` hanya sekali. Selanjutnya edit `.env` langsung. Jangan commit `.env` asli.

## 3. Jalan mode dev (auto-reload)

```bash
npm run dev
```

Output normal:

```
BE chatbot listening on http://0.0.0.0:3000 | tester: /test/
```

Buka:

- Tester: http://localhost:3000/test/
- Health: http://localhost:3000/api/v1/health

## 4. Cek cepat (wajib sebelum push)

```bash
npm run typecheck
curl -X POST http://localhost:3000/api/v1/chat -H "Content-Type: application/json" -d "{\"session_id\":\"sess_demo01\",\"message\":\"Jam operasional CS?\"}"
curl "http://localhost:3000/api/v1/knowledge?q=daftar&limit=5"
```

Balasan chat normal berisi `data.reply`, `data.sources`, `data.provider`, `data.model`.

## 5. Jalan mode produksi lokal

```bash
npm run build
npm start
```

`build` mengisi `dist/` (di-ignore git). `start` menjalankan `node dist/server.js`.

## 6. Troubleshooting

| Gejala | Penyebab umum | Solusi |
|---|---|---|
| `PORT already in use` | Port 3000 dipakai proses lain | Ganti `PORT=3001` di `.env`, atau matikan proses lama |
| `/test/` 404 | `BE/public/index.html` hilang / jalan dari folder salah | Jalankan dari `BE/`, pastikan file ada |
| Chat selalu `local-offline` | Semua provider tanpa API key | Isi minimal satu key di `.env` (lihat `02-konfigurasi.md`) |
| Chat selalu fallback "di luar data" | Pertanyaan tidak ada di FAQ / threshold terlalu tinggi | Tambah FAQ (`04-data-faq.md`) atau turunkan `RETRIEVAL_THRESHOLD` ke 0.25 |
| `429 RATE_LIMITED` | Kena limit 15/menit (normal saat spam test) | Tunggu `retry_after` detik, ganti `session_id` untuk test lain |
| `502 LLM_UNAVAILABLE` | Semua provider gagal + `OFFLINE_FALLBACK=false` | Set `OFFLINE_FALLBACK=true` untuk demo, atau cek key/kuota provider |
| CORS error dari FE | `CORS_ORIGIN` belum memuat domain FE | Isi `CORS_ORIGIN=https://domain-fe.kamu` di `.env` prod |
| `tsc` error | Dependensi belum install / Node < 20 | `npm install`, upgrade Node, `npm run typecheck` lagi |
