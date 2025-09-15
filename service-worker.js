self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('dif-attendance-cache-v1').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.php',
        '/assets/css/admin.css',
        '/assets/images/dif_logo.png'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
