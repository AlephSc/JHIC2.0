# Session 2026-09-11 — FE resilient foundation (L0/L1/L2)

Keputusan (sinkron dengan COMMUNICATION.md):
- Framework: Vite + React + TS + Tailwind, output `FE/dist` statis. 1 artefak untuk L0/L1/L2.
- Hosting: L0 primer framework host, L1 Vercel (build identik), L2 GitHub Pages static degraded + banner mode ringan. Router: Worker L0→L1→L2 + SW cache-first.
- Gambar: publik ke ImageKit/Cloudinary via `CdnImage` (CDN-1 → retry → `/img/fallback.svg` lokal). Berkas PPDB (KK/Akta/KTP/Ijazah/Foto) DILARANG ke CDN publik → bucket privat + presigned.
- Config: IP/port terpisah runtime `FE/public/config.js` (`beProtocol/beHost/bePort/beBasePath`) > `VITE_*` > localhost:3000. Ganti tanpa rebuild. Halaman `#/kesehatan` untuk tes + override sementara.
- Resilient: `GET /api/v1/health` fail 2x + timeout/network/5xx = down → cache/antre, copy tanpa kata "down/500". Tulis PPDB → outbox `ANTRE-2026-XXXX` + `Idempotency-Key` + WA manual 085649400339.
- Blacklist: root `.gitignore` `FE/Figma/`, `**/Figma/`, `*.psd/*.fig`; guard `npm run cdn:upload` (allowlist `public/img/**`); CI GH Pages fail bila ada `*figma*` di dist.

Cakupan branch `feat/fe-resilient-foundation`:
- Scaffold FE + 6 route (/, /jurusan, /berita, /bkk, /ppdb, /kesehatan) + Layout + Chatbot (POST /api/v1/chat) + CdnImage + SW + config + outbox.
- Verifikasi: `npm run typecheck` hijau, `npm run build` hijau (187KB JS gzip 61KB), `node scripts/cdn-upload.mjs` OK, `git check-ignore FE/Figma` ignored, `dist/` berisi config.js/sw.js/img/fallback.svg tanpa Figma.
- Belum: 33 halaman penuh (baru representatif), IndexedDB file biner (baru metadata nama), Worker router, tabel BE PPDB/Berita/BKK (BE masih chatbot saja).

Next:
1. Review PR → squash merge → catat CHANGELOGS.
2. `feat/ppdb-full-form` (4 step + upload IndexedDB + sync worker).
3. `feat/cdn-manifest` (crop Figma → public/img → upload ImageKit) + `feat/cf-worker-router`.
