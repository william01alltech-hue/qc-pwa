self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('qc-store-v1').then((cache) => {
      return cache.addAll([
        './',
        './index.html',
        './icon.png',
        'https://cdn.tailwindcss.com'
      ]);
    })
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});