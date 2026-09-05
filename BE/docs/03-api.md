# 03 — API Contract (untuk FE)

Source of truth mesin: `BE/openapi.yaml`. Dokumen ini versi manusianya.
Base URL dev: `http://localhost:3000`. Semua versi di bawah `/api/v1` (alias `/api/chat` = `/api/v1/chat`).

Kontrak umum (stabil, jangan diubah tanpa diskusi di `COMMUNICATION.md`):

- Sukses: `{ "data": { ... } }`.
- Gagal: `{ "error": { "code", "message", "retry_after?", "scope?", "details?" } }`.
- ID: `session_id` pola `^[A-Za-z0-9_-]+$` maks 64; balasan punya `id: msg_xxxxxxxx`, waktu `at` ISO-8601 UTC.
- Casing: `snake_case` di semua field.

---

## POST /api/v1/chat — kirim pesan (endpoint utama FE)

Juga tersedia kanonis `POST /api/v1/conversations/:id/messages` (body cukup `{message}`, `session_id` diambil dari path).

**Request**

```json
{ "session_id": "sess_demo01", "message": "Jam operasional CS?" }
```

Batasan: `message` 1–1000 karakter.

**Headers opsional**

| Header | Fungsi |
|---|---|
| `Idempotency-Key: <uuid>` | Retry aman. Key sama + body sama = respons lama di-replay. Key sama + body beda = `409 IDEMPOTENCY_CONFLICT`. |
| `X-User-Id: <id-akun>` | Kunci rate limit per akun (disarankan). |

**Response 200**

```json
{
  "data": {
    "id": "msg_a1b2c3d4",
    "session_id": "sess_demo01",
    "reply": "CS online Senin–Jumat ...",
    "sources": [{ "id": "faq-02", "score": 0.82 }],
    "provider": "openrouter",
    "model": "meta-llama/llama-3.1-8b-instruct:free",
    "fallback": false,
    "at": "2026-09-05T04:00:00.000Z"
  }
}
```

Arti `provider`: `openrouter|groq|gemini` (LLM asli), `local-smalltalk` (salam), `local-fallback|local-guard` (penolakan halus), `local-offline` (template FAQ karena semua LLM mati). `fallback: true` berarti jawaban BUKAN dari LLM penuh — FE boleh tampilkan badge "jawaban otomatis".

**Contoh curl**

```bash
curl -X POST http://localhost:3000/api/v1/chat ^
  -H "Content-Type: application/json" ^
  -H "Idempotency-Key: 11111111-2222-3333-4444-555555555555" ^
  -d "{\"session_id\":\"sess_demo01\",\"message\":\"Cara daftar akun?\"}"
```

**Contoh fetch (untuk tim FE)**

```js
const res = await fetch('http://localhost:3000/api/v1/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Idempotency-Key': crypto.randomUUID(),
    // 'X-User-Id': user.id, // disarankan saat sudah login
  },
  body: JSON.stringify({ session_id: 'sess_demo01', message: text }),
});
const json = await res.json();
if (!res.ok) {
  if (res.status === 429) showTunggu(json.error.retry_after); // countdown
  else showError(json.error.message);
} else {
  tampilkan(json.data.reply, json.data.sources);
}
```

---

## GET /api/v1/knowledge — daftar FAQ (cursor pagination)

```
GET /api/v1/knowledge?q=daftar&limit=5&cursor=
```

- `q` opsional (filter substring case-insensitive), `limit` 1–50 default 10, `cursor` opaque dari `paging.next_cursor`.
- Jangan bikin offset manual; selalu pakai `next_cursor`.

**Response 200**

```json
{
  "data": [{ "id": "faq-03", "q": "...", "a": "...", "tags": ["daftar"] }],
  "paging": { "has_more": true, "next_cursor": "MTA", "total": 12 }
}
```

## GET /api/v1/health — status

```
GET /api/v1/health
```

```json
{ "data": { "status": "ok", "time": "...", "faq_count": 30, "router": [
  { "id": "openrouter", "model": "...", "rpm": 15, "used_min": 3, "active": true }
]}}
```

FE bisa pakai ini untuk indikator "CS online" dan sisa kuota router.

## Tabel error

| HTTP | `code` | Arti | Aksi FE |
|---|---|---|---|
| 400 | `BAD_REQUEST` / `BAD_QUERY` | Validasi gagal | Tampilkan pesan, jangan retry otomatis |
| 404 | `NOT_FOUND` | Salah path | Cek base URL / versi |
| 409 | `IDEMPOTENCY_CONFLICT` | Key dipakai ulang beda body | Generate key baru per pesan baru |
| 429 | `RATE_LIMITED` | Kena limit (`scope`: `user_min`/`user_hour`/`global_min`) | Tampilkan countdown `retry_after` detik |
| 502 | `LLM_UNAVAILABLE` | Semua provider gagal + offline fallback mati | Tampilkan "coba lagi 20 detik" |
| 500 | `INTERNAL` | Error tak terduga | Laporkan ke BE sertakan waktu + `session_id` |

## Kebijakan evolusi (janji ke FE)

- Tambah field opsional / endpoint baru: langsung di `v1`, FE lama aman.
- Ubah/hapus/rename field, ketatkan validasi: HANYA di versi baru (`/api/v2`), `v1` tidak diubah di tempat.
