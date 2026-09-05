# 02 — Konfigurasi (.env)

Semua konfigurasi lewat environment. Salin `.env.example` → `.env`, lalu edit nilainya.
Tidak perlu coding untuk ganti model, tambah provider, ubah limit, atau ubah threshold.

## Tabel env lengkap

| Key | Default | Arti |
|---|---|---|
| `PORT` | `3000` | Port HTTP server. |
| `HOST` | `0.0.0.0` | Bind address. `0.0.0.0` = bisa diakses LAN/docker. |
| `CORS_ORIGIN` | `*` | Domain FE yang diizinkan, koma-pisah. Prod: isi domain asli, mis. `https://jhic.web.id`. |
| `OFFLINE_FALLBACK` | `true` | `true` = saat semua LLM mati, jawab dari template FAQ lokal. `false` = balas `502 LLM_UNAVAILABLE`. Demo biarkan `true`. |
| `RETRIEVAL_TOP_K` | `3` | Jumlah FAQ diambil sebagai konteks. |
| `RETRIEVAL_THRESHOLD` | `0.35` | Skor minimum 0–1. Di bawah ini = fallback. Turunkan (0.25) = lebih longgar, naikkan (0.5) = lebih ketat. |
| `RATE_USER_PER_MIN` | `15` | Batas chat per menit per user (kesepakatan tim). |
| `RATE_USER_PER_HOUR` | `100` | Batas per jam per user (anti-abuse jangka panjang). |
| `RATE_GLOBAL_PER_MIN` | `300` | Batas total semua user per menit (proteksi kuota provider). |
| `OPENROUTER_API_KEY` | _(kosong)_ | Key OpenRouter. Kosong = provider nonaktif otomatis. |
| `OPENROUTER_MODEL` | `meta-llama/llama-3.1-8b-instruct:free` | Model OpenRouter. Ganti model gratis lain cukup edit ini. |
| `OPENROUTER_BASE_URL` | `https://openrouter.ai/api/v1` | Jangan ubah kecuali proxy sendiri. |
| `OPENROUTER_RPM` | `15` | Batas internal agar pindah ke provider berikut SEBELUM kena 429 asli. |
| `GROQ_API_KEY` / `GROQ_MODEL` / `GROQ_BASE_URL` / `GROQ_RPM` | `llama-3.1-8b-instant` / 25 | Provider cadangan 1. Daftar gratis di Groq. |
| `GEMINI_API_KEY` / `GEMINI_MODEL` / `GEMINI_BASE_URL` / `GEMINI_RPM` | `gemini-1.5-flash` / 50 | Provider cadangan 2 (endpoint OpenAI-compatible Gemini). |
| `APP_URL` | `http://localhost:3000` | Wajib untuk header `HTTP-Referer` OpenRouter. Prod: isi URL publik BE. |
| `APP_TITLE` | `JHIC2.0 CS Chatbot Prototype` | Header `X-Title` OpenRouter. |
| `ROUTER_CONFIG_JSON` | _(kosong)_ | Rantai provider custom (lihat bawah). Menggantikan 3 provider default bila diisi. |

## Contoh `.env` dev (tanpa key, tetap bisa demo)

```ini
PORT=3000
OFFLINE_FALLBACK=true
```

## Contoh `.env` dengan 2 provider aktif

```ini
OPENROUTER_API_KEY=sk-or-v1-xxx
OPENROUTER_MODEL=meta-llama/llama-3.1-8b-instruct:free
GROQ_API_KEY=gsk_xxx
GROQ_MODEL=llama-3.1-8b-instant
OFFLINE_FALLBACK=true
APP_URL=http://localhost:3000
```

## Custom provider tanpa coding (`ROUTER_CONFIG_JSON`)

Satu string JSON array, urut `priority` kecil = dicoba dulu. Field wajib: `id`, `baseUrl`, `apiKey`, `model`, `rpm`, `priority`.

```json
[
  {"id":"openrouter","baseUrl":"https://openrouter.ai/api/v1","apiKey":"sk-or-xxx","model":"meta-llama/llama-3.1-8b-instruct:free","rpm":15,"priority":1},
  {"id":"groq","baseUrl":"https://api.groq.com/openai/v1","apiKey":"gsk_xxx","model":"llama-3.1-8b-instant","rpm":25,"priority":2}
]
```

Syarat provider custom: endpoint **OpenAI-compatible** (`POST {baseUrl}/chat/completions` dengan `{model, messages}`).

## Identitas user untuk rate limit

- Jika FE mengirim header `X-User-Id`, itu dipakai sebagai kunci limit (`u:<id>`).
- Jika tidak, dipakai `IP + session_id` (`s:<ip>:<session>`).
- Saran FE: kirim `X-User-Id` tetap per akun agar limit adil antar user di belakang NAT yang sama.
