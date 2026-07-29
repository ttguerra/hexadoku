// Hexadoku Service Worker — offline play, with a working update path.
//
// IMPORTANT: bump VERSION whenever you deploy. The old worker was cache-first
// with a fixed cache name, so players were permanently stuck on whatever build
// they happened to load first — deployed updates never reached them.
const VERSION = 'v3';
const CACHE = 'hexadoku-' + VERSION;
const ASSETS = ['./', './index.html', './manifest.json',
                './icon-192.png', './icon-512.png', './apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache =>
      // cache:'reload' bypasses the browser's HTTP cache, so precaching can
      // never bake in a stale copy of a file we just deployed.
      cache.addAll(ASSETS.map(u => new Request(u, { cache: 'reload' }))).catch(() => {})
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const isHTML = req.mode === 'navigate' ||
                 (req.headers.get('accept') || '').includes('text/html');

  if (isHTML) {
    // Network-first: a new deploy is picked up on the next visit.
    // Falls back to cache so offline play still works.
    e.respondWith((async () => {
      const cache = await caches.open(CACHE);
      try {
        const res = await fetch(req);
        e.waitUntil(cache.put('./index.html', res.clone()).catch(() => {}));
        return res;
      } catch (err) {
        return (await cache.match(req)) || (await cache.match('./index.html'));
      }
    })());
  } else {
    // Static assets: serve from cache, refresh the copy for next time.
    e.respondWith((async () => {
      const cache = await caches.open(CACHE);
      const cached = await cache.match(req);
      const network = fetch(req)
        .then(res => cache.put(req, res.clone()).catch(() => {}).then(() => res))
        .catch(() => null);
      if (cached) {
        // Keep the worker alive until the refresh finishes, otherwise it is
        // killed as soon as respondWith settles and the cache never updates.
        e.waitUntil(network);
        return cached;
      }
      return (await network) || Response.error();
    })());
  }
});
