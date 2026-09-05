# 05 — Arsitektur

## Alur satu chat

```
FE / Tester
  | POST /api/v1/chat {session_id, message} (+Idempotency-Key, +X-User-Id)
  v
[Validasi Zod] --gagal--> 400
  |
[Idempotency] --key sama+body beda--> 409, --sama persis--> replay
  |
[Rate limit] --penuh--> 429 + retry_after
  |
[Guard]
  |-- injeksi? --> fallback (local-guard)
  |-- salam?   --> balasan lokal (local-smalltalk)
  |
[Retriever top-K + threshold] --kosong/rendah--> fallback (local-fallback, tanpa panggil LLM)
  |
[System prompt + konteks + 6 pesan terakhir]
  |
[Mini-router] openrouter -> groq -> gemini (skip tanpa-key / RPM penuh)
  |-- sukses --> reply + sources + provider/model
  |-- semua gagal + OFFLINE_FALLBACK=true  --> template FAQ (local-offline)
  |-- semua gagal + OFFLINE_FALLBACK=false --> 502
```

## Komponen dan file

| Komponen | File | Catatan |
|---|---|---|
| HTTP + CORS + static `/test/` + envelope error | `src/server.ts` | Satu envelope error untuk semua route |
| Validasi + handler chat + idempotency | `src/routes/chat.ts` | Session history didorong tiap sukses |
| List FAQ paginated | `src/routes/knowledge.ts` | Cursor opaque base64url, bukan offset mentah |
| Health + status router | `src/routes/health.ts` | Dipakai tester + indikator FE |
| Retrieval | `src/lib/retriever.ts` | Fuse.js + overlap kata, in-memory (cepat, non-blocking) |
| Guard/prompt | `src/lib/guard.ts` | Smalltalk, regex injeksi, system prompt ID, template offline |
| Mini-router | `src/lib/miniRouter.ts` | Prioritas, skip RPM-penuh, timeout 25 dtk, error dirantai |
| Rate limit | `src/lib/rateLimit.ts` | Sliding window memory: user/menit, user/jam, global/menit |
| Session | `src/lib/sessions.ts` | Memory, 12 pesan (6 pasang) terakhir per session |
| Config | `src/config.ts` | Semua dari env + `ROUTER_CONFIG_JSON` |

## Keputusan desain penting

1. **Fastify (Node 20+)** karena chatbot I/O-bound (menunggu LLM). Non-blocking menangani ribuan koneksi idle tanpa thread per request.
2. **Retrieval dulu, LLM kemudian.** Tanpa hasil retrieval yang lolos threshold, LLM tidak dipanggil — anti-halusinasi + hemat kuota.
3. **RPM tracker internal.** Router tidak menunggu 429 provider; provider yang jatah menitannya habis langsung dilewati.
4. **Stateless-ish.** Tidak ada DB; scale horizontal tinggal duplikasi proses + LB. Konsekuensi: session/rate-limit reset saat restart (pindah ke Redis saat scale beneran — di luar prototype).

## Batasan prototype yang disadari

- Session, rate-limit, RPM counter **in-memory** (hilang saat restart, tidak sinkron antar instance).
- Knowledge **file JSON** (cocok < ±5.000 entri; di atas itu pindah ke pgvector/Qdrant).
- History hanya teks terakhir, tanpa persistensi dan tanpa multi-user auth.
- Timeout LLM 25 detik; tidak ada antrean/background job (tambah BullMQ saat scale).
