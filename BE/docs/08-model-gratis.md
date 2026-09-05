# 08 — Model Gratis OpenRouter (auto-fetch, free-only)

Modul: `src/lib/openrouterModels.ts`. Prinsip: **wajib free-only**, anti MACET karena model diganti OpenRouter.

## Cara kerja singkat

1. BE mengambil `GET {OPENROUTER_BASE_URL}/models` (timeout 20 dtk, singleflight agar tidak dobel).
2. Filter gratis: `pricing.prompt == 0 && pricing.completion == 0` ATAU id berakhiran `:free` / mengandung `-free`.
3. Simpan di memory + file `BE/.cache/openrouter-models.json` (git-ignored). TTL **12 jam** (`OPENROUTER_MODELS_TTL_H`).
4. Tiap request chat kaki OpenRouter memakai model aktif hasil seleksi, bukan `OPENROUTER_MODEL` mentah.

## Urutan prioritas (kesepakatan tim)

`OPENROUTER_MODEL_PREFER=auto,nemotron,nvidia,qwen,llama,glm` — substring case-insensitive pada id.
Tie-break: `context_length` besar, lalu alfabetis (deterministik).

## Cooldown model bermasalah (kesepakatan tim)

| Kejadian | Aksi |
|---|---|
| 404 / "model not found" / "No endpoints" / decommissioned / invalid model | Eksklusi sampai fetch berikut + **refetch background segera** + coba model berikut sekali |
| 429 / 402 / quota / rate-limit / insufficient credit, **strike ke-1** | Cooldown **10 menit**, switch + log |
| Sama, **strike ke-2 dalam 1 siklus 12 jam** | Cooldown **6 jam**, switch + log |
| Sukses memakai model | Strike model itu reset ke 0 |
| Fetch 12-jaman sukses | Strike reset, cooldown yang belum kedaluwarsa **tetap dipertahankan** |

Selama cooldown model dilewati total (tidak dicoba). Jika semua free sedang cooldown → kaki OpenRouter dilewati, lanjut Groq/Gemini atau `local-offline`.

## Log pergantian model (wajib)

- File JSONL: `BE/.cache/model-switches.log` (git-ignored), 1 baris per switch:
  `{ at, from, to, reason, http_status, strike, cooldown_until }`.
- Ring buffer 50 terakhir di memory → tampil di `GET /api/v1/models` (`meta.recent_switches`) dan panel `/test/`.
- Tidak ada secret yang ditulis ke log.

## Endpoint terkait

- `GET /api/v1/models?q=&limit=&cursor=` — list free (cursor opaque) + `meta`: active, free_count, fetched_at, expires_in_sec, stale, model_status (`ok|stale|no-free|all-cooldown`), cooldowns, recent_switches.
- `POST /api/v1/admin/models/refresh` + header `X-Admin-Token: <ADMIN_TOKEN>` — paksa fetch. `ADMIN_TOKEN` kosong = 403 nonaktif. Naturally idempotent (dipanggil 2x aman).
- `GET /api/v1/health` — kini ada blok `openrouter_models` ringkas.

## Uji manual

```bash
curl http://localhost:3000/api/v1/models?limit=5
curl -X POST http://localhost:3000/api/v1/admin/models/refresh -H "X-Admin-Token: isi-token"
tail BE/.cache/model-switches.log   # di Git Bash / Linux
```
