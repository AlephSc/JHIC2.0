# FE — SMK Telekomunikasi Darul Ulum (Vite React statis resilient)

Artefak `dist/` deploy identik ke L0 / L1 Vercel / CF Pages / L2 GitHub Pages (HashRouter, tanpa rewrite).

## Dev

```bash
cd FE
cp .env.example .env   # sekali saja
npm install
npm run dev            # http://localhost:5173
```

BE beda device: edit `public/config.js` (`beHost`, `bePort`) lalu reload — tanpa rebuild.
Atau sementara via halaman `#/kesehatan`.

## Env

Lihat `.env.example` + `public/config.js.example`. Prioritas: `window.__APP_CONFIG__` > `VITE_*` > default localhost:3000.

## Guard CDN

`FE/Figma/` masuk `.gitignore` root — tidak boleh ke repo/CDN/build.
Cek: `npm run cdn:upload` (dry-run, allowlist `public/img/**`).

## Deploy

- Vercel: Root `FE`, build `npm run build`, output `dist` (`vercel.json` sudah disediakan).
- Cloudflare Pages: Root `FE`, build sama.
- GitHub Pages: workflow `.github/workflows/deploy-gh-pages.yml` build `FE/dist` (HashRouter, base `./`).
