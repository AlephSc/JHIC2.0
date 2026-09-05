# 00 — Gambaran Backend (Role BE)

Dokumen ini menjelaskan peran folder `BE/` untuk seluruh tim.

## Peran kami (Backend)

- Menyediakan **API chatbot CS** untuk dipakai frontend (FE) dan web tester internal.
- Menjamin bot **hanya menjawab dari data FAQ resmi** (ketat-data, mode semi-lentur: salam boleh, topik inti wajib dari data).
- Menyediakan **mini-router LLM**: OpenRouter → Groq → Gemini dengan auto-fallback + pelacak RPM sendiri.
- Menegakkan **rate limit**: 15 chat/menit/user, 100/jam/user, 300/menit global.

## Yang BUKAN tugas BE (prototype ini)

- UI/UX, halaman, styling → itu `FE/`.
- Auth/login permanen, database permanen, dashboard admin, analytics → di luar scope prototype.

## Struktur folder

```
BE/
  README.md              # indeks dokumentasi (file ini diringkas, detail di docs/)
  openapi.yaml           # source of truth kontrak FE-BE (mesin + manusia)
  .env.example           # contoh env (salin ke .env, JANGAN commit .env asli)
  package.json           # scripts: dev / build / start / typecheck
  tsconfig.json
  src/
    server.ts            # Fastify + CORS + /test + /api/v1 + /api alias
    config.ts            # baca env + definisi rantai provider
    routes/
      chat.ts            # POST /api/v1/chat, POST /api/v1/conversations/:id/messages
      knowledge.ts       # GET /api/v1/knowledge (cursor pagination)
      health.ts          # GET /api/v1/health
    lib/
      retriever.ts       # Fuse.js top-K + threshold
      guard.ts           # smalltalk, injection guard, system prompt, offline reply
      miniRouter.ts      # custom provider + auto-fallback + RPM tracker
      rateLimit.ts       # sliding window in-memory
      sessions.ts        # history 6 pesan terakhir per session_id
    data/
      faq.json           # 30 FAQ dummy, ganti tanpa coding
  public/
    index.html           # web tester internal (GET /test/)
  docs/
    00-gambaran.md       # file ini
    01-install-setup.md
    02-konfigurasi.md
    03-api.md
    04-data-faq.md
    05-arsitektur.md
    06-deploy.md
    07-tester.md
```

## Glosarium singkat

| Istilah | Arti |
|---|---|
| Provider | Layanan LLM (OpenRouter, Groq, Gemini). Semua OpenAI-compatible. |
| Mini-router | Modul `src/lib/miniRouter.ts` yang memilih provider + fallback otomatis. |
| Retrieval | Pencarian FAQ paling relevan sebelum panggil LLM. |
| Threshold | Skor minimum (default 0.35) agar hasil retrieval dipakai; di bawah itu = fallback. |
| Fallback | Jawaban penolakan halus saat di luar data / semua provider mati. |
| `session_id` | ID percakapan dari FE (`sess_*`, huruf/angka/`_`/`-`, maks 64). |
| Idempotency-Key | Header opsional agar retry aman (tidak dobel efek). |

## Aturan main (dari `RULES.md` root)

- Kerja BE hanya di `BE/`, jangan campur ke `FE/`.
- Jangan commit `.env` asli, `node_modules/`, `dist/` (sudah di `BE/.gitignore`).
- Ubah kontrak API = usulan perubahan di `COMMUNICATION.md` dulu, lalu catat `CHANGELOGS.md` saat PR.
- Dilarang push langsung ke `main`; via branch + PR + review.
