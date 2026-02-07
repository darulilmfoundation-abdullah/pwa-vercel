// Fetch cache version from server
const getCacheVersion = async () => {
  try {
    const response = await fetch('/versions.json?t=' + Date.now(), { cache: 'no-store' });
    const data = await response.json();
    return `ar-ams-v${data.version}`;
  } catch (e) {
    console.error('Could not fetch version:', e);
    return 'ar-ams-v5.2.0';
  }
};

let CACHE_NAME = 'ar-ams-v5.2.0';

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/versions.json',
  '/service-worker.js',
  '/attendance-verification-popup.js',
  '/report-problem.js',
  '/icons/96 x 96.png',
  '/icons/192 x 192.png',
  '/icons/256 x 256.png',
  '/icons/512 x 512.png'
];

self.addEventListener('install', event => {
  console.log('Service Worker installing...');
  event.waitUntil(
    getCacheVersion().then(version => {
      CACHE_NAME = version;
      return caches.open(CACHE_NAME)
        .then(cache => {
          console.log('Caching files with version:', CACHE_NAME);
          return cache.addAll(urlsToCache);
        })
        .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {
  console.log('Service Worker activating...');
  event.waitUntil(
    getCacheVersion().then(version => {
      CACHE_NAME = version;
      return caches.keys().then(keys => {
        console.log('Existing caches:', keys);
        return Promise.all(keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('Deleting old cache:', key);
            return caches.delete(key);
          }
        }));
      }).then(() => self.clients.claim());
    })
  );
});

self.addEventListener('fetch', event => {
  // only GET requests
  if (event.request.method !== 'GET') return;

  // Always fetch index.html fresh for navigation
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request, { cache: 'no-store' })
        .then(response => {
          // Cache the new version
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          return caches.match(event.request);
        })
    );
    return;
  }

  // For other assets, use cache-first strategy with network fallback
  event.respondWith(
    caches.match(event.request).then(cachedResp => {
      return fetch(event.request, { cache: 'no-store' }).then(networkResp => {
        // Update cache with new version
        if (networkResp && networkResp.status === 200) {
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResp.clone());
          });
        }
        return networkResp;
      }).catch(() => {
        return cachedResp;
      });
    })
  );
});