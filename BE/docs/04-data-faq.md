# 04 — Data FAQ (ketat-data tanpa coding)

Bot hanya boleh menjawab dari `BE/src/data/faq.json`. Mengubah data = edit file itu + restart (dev auto-reload).

## Format satu entri

```json
{
  "id": "faq-31",
  "q": "Pertanyaan contoh?",
  "a": "Jawaban resmi maksimal 2-3 kalimat.",
  "tags": ["kata", "kunci", "tambahan"]
}
```

Aturan:

- `id` unik format `faq-NN` (lanjutkan nomor terakhir).
- `q` tulis seperti user bertanya (singkat, Bahasa Indonesia).
- `a` jawaban final: faktual, tanpa janji palsu, tanpa info di luar kewenangan (cantumkan kontak/jam bila relevan).
- `tags` 2–5 kata kunci untuk membantu retrieval.

## Cara tambah / ubah

1. Edit `BE/src/data/faq.json` (tetap valid JSON — koma, kutip ganda).
2. Simpan. Dev mode reload otomatis; prod: rebuild + restart (lihat `06-deploy.md`).
3. Cek `GET /api/v1/health` → `faq_count` bertambah.
4. Uji di `/test/`: tanya dengan kata mirip TAPI tidak sama persis (retrieval fuzzy, bukan exact-match).

## Cara kerja retrieval (agar nulis FAQ efektif)

- `src/lib/retriever.ts`: Fuse.js (bobot Q 0.6 / A 0.25 / tags 0.15) + overlap kata → skor 0–1.
- `src/lib/guard.ts`: salam dibalas lokal; injeksi ("lupakan instruksi...") diabaikan → fallback; skor < `RETRIEVAL_THRESHOLD` (default 0.35) → fallback tanpa panggil LLM (hemat kuota).
- Hanya top-`RETRIEVAL_TOP_K` (default 3) yang jadi konteks LLM.

Tips menulis agar mudah ketemu:

- Satu entri = satu topik. Jangan gabung 3 topik dalam satu jawaban.
- Masukkan sinonim di `tags` (mis. `["biaya","harga","gratis","tarif"]`).
- Hindari 2 FAQ dengan pertanyaan hampir identik (rebutan skor).

## Tuning ketegasan

| Gejala | Setelan |
|---|---|
| Terlalu sering fallback padahal jawaban ada | Turunkan `RETRIEVAL_THRESHOLD` ke `0.25` |
| Sering jawab ngawur / salah ambil FAQ | Naikkan ke `0.45`–`0.5`, perbaiki redaksi FAQ yang mirip |
| Jawaban LLM kepanjangan | Itu di system prompt (`guard.ts`, maks ~120 kata); ubah bila disepakati tim |

## Mode offline (`OFFLINE_FALLBACK=true`)

Saat semua provider tanpa key / gagal, balasan = jawaban FAQ teratas + `(Sumber: ...)`, `provider: local-offline`. Cocok untuk demo tanpa internet/kuota. Matikan (`false`) bila ingin FE menerima `502` eksplisit.
