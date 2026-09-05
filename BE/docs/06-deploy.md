# 06 — Deploy

## 1. Build & run standar (VPS / laptop juri)

```bash
cd BE
npm install --omit=dev
npm run build
PORT=3000 HOST=0.0.0.0 npm start
```

Health check setelah start:

```bash
curl http://localhost:3000/api/v1/health
```

## 2. Env produksi (wajib dicek)

```ini
PORT=3000
HOST=0.0.0.0
CORS_ORIGIN=https://domain-fe.kamu
APP_URL=https://domain-be.kamu
OPENROUTER_API_KEY=isi-asli
GROQ_API_KEY=isi-asli
OFFLINE_FALLBACK=true
```

Jangan pernah commit `.env` prod. Jangan print key di log/COMMUNICATION/PR.

## 3. PM2 (auto-restart + cluster)

```bash
npm i -g pm2
pm2 start dist/server.js --name jhic-be -i max
pm2 save
pm2 startup
```

- `-i max` = cluster per CPU (stateless, aman untuk prototype).
- Update: `git pull && npm install --omit=dev && npm run build && pm2 reload jhic-be`.

## 4. Nginx reverse proxy (contoh)

```nginx
server {
  listen 80;
  server_name domain-be.kamu;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

Aktifkan HTTPS (certbot) sebelum demo publik. `trustProxy: true` sudah aktif di `server.ts` agar `req.ip` benar di belakang proxy (penting untuk rate limit).

## 5. Docker (opsional, bila juri minta)

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
RUN npm run build
ENV PORT=3000 HOST=0.0.0.0
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

```bash
docker build -t jhic-be .
docker run -d -p 3000:3000 --env-file .env --name jhic-be jhic-be
```

## 6. Checklist sebelum demo / lomba

- [ ] `npm run typecheck` hijau.
- [ ] `GET /api/v1/health` → `faq_count` sesuai, `router` ada yang `active: true` (atau sengaja offline).
- [ ] `/test/` bisa dibuka dari perangkat juri.
- [ ] `CORS_ORIGIN` berisi domain FE (bukan `*` untuk publik).
- [ ] Spam 16x cepat → `429` + countdown (bukti limit jalan).
- [ ] Tanya OOT → fallback halus (bukti ketat-data).
- [ ] Matikan key (simulasi) → tetap jawab via `local-offline` bila `OFFLINE_FALLBACK=true`.
- [ ] `CHANGELOGS.md` + `COMMUNICATION.md` di root sudah diisi via PR (aturan tim).

## 7. Rollback cepat

Setiap rilis = 1 commit/PR. Rollback = revert PR di GitHub lalu `pull + build + pm2 reload`.
Jangan `push --force` ke `main` (RULES.md 2.5).
