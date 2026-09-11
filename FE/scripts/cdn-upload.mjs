// Guard upload CDN: allowlist saja. FE/Figma tidak pernah boleh lolos.
// Jalankan: npm run cdn:upload  (default --dry-run, tidak upload)
// Contoh nyata (nanti): node scripts/cdn-upload.mjs --prod --dir FE/public/img
import fs from 'node:fs';
import path from 'node:path';

const args = new Set(process.argv.slice(2));
const dryRun = !args.has('--prod');
// Bisa jalan dari root repo (FE/public/img) maupun dari FE/ (public/img).
const candidates = [path.resolve('FE/public/img'), path.resolve('public/img')];
const dir = candidates.find((d) => fs.existsSync(d)) ?? candidates[0];

const DENY = [/figma/i, /\.psd$/i, /\.fig$/i];
const ALLOW_EXT = new Set(['.webp', '.avif', '.jpg', '.jpeg', '.png', '.svg']);

function walk(d) {
  if (!fs.existsSync(d)) return [];
  return fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(d, e.name);
    if (e.isDirectory()) return walk(p);
    return [p];
  });
}

const files = walk(dir);
let blocked = 0;
for (const f of files) {
  const rel = path.relative(process.cwd(), f);
  if (DENY.some((re) => re.test(rel))) {
    console.error(`[BLOCKED] ${rel} — pola Figma/psd/fig dilarang`);
    blocked++;
    continue;
  }
  if (!ALLOW_EXT.has(path.extname(f).toLowerCase())) {
    console.error(`[SKIP] ${rel} — ekstensi tidak diizinkan`);
    continue;
  }
  console.log(`[${dryRun ? 'DRY-RUN' : 'UPLOAD'}] ${rel}`);
}

if (blocked > 0) {
  console.error(`\nGagal: ${blocked} file masuk daftar hitam. Perbaiki allowlist sebelum --prod.`);
  process.exit(1);
}
console.log(`\nOK: ${files.length} file diperiksa. Mode: ${dryRun ? 'dry-run (tidak upload)' : 'prod'}.`);
