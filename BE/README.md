# BE — Chatbot CS Prototype (JHIC2.0)

> Scope: prototype backend saja (API + tester internal `/test/`). Frontend asli milik tim FE di `FE/`.
> Aturan tim: `RULES.md` root. Kontrak mesin: `openapi.yaml`.

## Mulai 3 langkah

```bash
cd BE
copy .env.example .env   # sekali saja; jangan commit .env asli
npm install
npm run dev
```

- Tester: http://localhost:3000/test/
- Health: http://localhost:3000/api/v1/health
- Tanpa API key tetap bisa demo (mode `local-offline`).

## Dokumentasi peran BE (`BE/docs/`)

| Dok | Isi |
|---|---|
| `docs/00-gambaran.md` | Peran BE, struktur folder, glosarium, aturan main |
| `docs/01-install-setup.md` | Install, run dev/prod, cek cepat, troubleshooting |
| `docs/02-konfigurasi.md` | Tabel `.env` lengkap + custom provider tanpa coding |
| `docs/03-api.md` | Kontrak FE: chat, knowledge, health, error, contoh fetch/curl |
| `docs/04-data-faq.md` | Format `faq.json`, cara tambah data, tuning threshold |
| `docs/05-arsitektur.md` | Alur request, mini-router, guard, batasan prototype |
| `docs/06-deploy.md` | Build, PM2, Nginx, Docker, checklist lomba, rollback |
| `docs/07-tester.md` | Skenario uji 5 menit di `/test/` |
| `docs/08-model-gratis.md` | Auto-fetch free OpenRouter, cooldown 10 mnt/6 jam, log switch |

## Endpoint ringkas

```
POST /api/v1/chat                          # utama untuk FE {session_id, message}
POST /api/v1/conversations/:id/messages    # kanonis resource-oriented
GET  /api/v1/knowledge?q=&limit=&cursor=   # list FAQ paginated
GET  /api/v1/health                        # status + faq_count + router
GET  /test/                                # web tester internal (bukan produk)
```

Contoh:

```bash
curl -X POST http://localhost:3000/api/v1/chat -H "Content-Type: application/json" -d "{\"session_id\":\"sess_demo01\",\"message\":\"Jam operasional CS?\"}"
```

## Untuk tim FE (baca ini dulu)

1. Base URL dev `http://localhost:3000`, kontrak penuh di `docs/03-api.md` + `openapi.yaml`.
2. Kirim `Idempotency-Key` (uuid baru per pesan) + `X-User-Id` (saat login).
3. Tangani `429` dengan countdown `retry_after`, tampilkan badge saat `fallback: true`.
4. Ubah kontrak = usulan di `COMMUNICATION.md` root dulu sebelum coding.

## Catatan GIT (penting)

- Kerja hanya di `BE/`. File ini + `docs/` boleh diubah di branch fitur BE.
- File root (`CHANGELOGS.md`, `COMMUNICATION.md`) hanya lewat PR.
- Jangan commit `.env`, `node_modules/`, `dist/` (lihat `BE/.gitignore`).
