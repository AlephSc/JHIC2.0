// SW cache-first untuk gambar + halaman (L1/L2 tetap tampil saat CDN/BE hiccup).
const CACHE = 'jhic2-fe-v1';
const CORE = ['./', './index.html', './config.js', './img/fallback.svg'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  // Gambar: cache-first, fallback ke fallback.svg lokal
  if (/\.(png|jpe?g|webp|avif|svg|gif)$/i.test(url.pathname)) {
    e.respondWith(
      caches.match(e.request).then(
        (hit) =>
          hit ||
          fetch(e.request)
            .then((res) => {
              const copy = res.clone();
              caches.open(CACHE).then((c) => c.put(e.request, copy));
              return res;
            })
            .catch(() => caches.match('./img/fallback.svg')),
      ),
    );
    return;
  }
  // Navigasi: network-first, gagal → index cache
  if (e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request).catch(() => caches.match('./index.html')));
  }
});
