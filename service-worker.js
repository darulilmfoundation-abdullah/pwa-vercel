const CACHE_NAME = 'ar-ams-v5.1.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/96 x 96.png',
  '/icons/192 x 192.png',
  '/icons/256 x 256.png',
  '/icons/512 x 512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // only GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cachedResp => {
      if (cachedResp) return cachedResp;
      return fetch(event.request).catch(() => {
        // Only return index.html fallback for navigation requests (page loads)
        // NOT for API calls or assets
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
        // For API calls, let the error propagate
        throw new Error('Network request failed');
      });
    })
  );
});