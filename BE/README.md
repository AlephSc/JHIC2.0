# BE — Chatbot CS Prototype (JHIC2.0)

> Scope: prototype backend saja. Frontend asli dikerjakan tim FE. Folder ini hanya berisi API + web tester internal `/test/`.

## Struktur (di dalam `BE/`)

```
BE/
  src/server.ts          # Fastify + /test + /api/v1
  src/config.ts          # env + rantai provider
  src/routes/chat.ts     # POST /api/v1/chat + POST /api/v1/conversations/:id/messages
  src/routes/knowledge.ts# GET /api/v1/knowledge (cursor pagination)
  src/routes/health.ts   # GET /api/v1/health
  src/lib/retriever.ts   # Fuse.js top-K + threshold
  src/lib/guard.ts       # smalltalk, injection guard, system prompt, offline reply
  src/lib/miniRouter.ts  # Custom Provider + auto-fallback + RPM tracker
  src/lib/rateLimit.ts   # 15/menit/user, 100/jam/user, 300/menit global
  src/lib/sessions.ts    # history 6 pesan terakhir (memory)
  src/data/faq.json      # 30 FAQ dummy (ganti tanpa coding)
  public/index.html      # web tester internal (GET /test/)
  openapi.yaml           # source of truth kontrak FE-BE
```

## Cara jalan (Windows cmd)

```bash
cd BE
copy .env.example .env
npm install
npm run dev
```

Buka:

- Tester: http://localhost:3000/test/
- Health: http://localhost:3000/api/v1/health
- OpenAPI: `openapi.yaml`

Tanpa API key pun tetap bisa didemo (mode `local-offline` jawab dari FAQ).

## Contoh curl

```bash
curl -X POST http://localhost:3000/api/v1/chat -H "Content-Type: application/json" -d "{\"session_id\":\"sess_demo01\",\"message\":\"Jam operasional CS?\"}"
curl "http://localhost:3000/api/v1/knowledge?q=daftar&limit=5"
```

## Tambah provider baru (tanpa coding)

Edit `.env` atau set `ROUTER_CONFIG_JSON`:

```json
[{"id":"openrouter","baseUrl":"https://openrouter.ai/api/v1","apiKey":"...","model":"meta-llama/llama-3.1-8b-instruct:free","rpm":15,"priority":1}]
```

## Catatan RULES.md

- Kerja hanya di `BE/`. Jangan campur ke `FE/`.
- Jangan commit `.env` asli / `node_modules/` (lihat `.gitignore`).
- Perubahan kontrak API wajib didiskusikan via `COMMUNICATION.md` + catat `CHANGELOGS.md` saat PR.
