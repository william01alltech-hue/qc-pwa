// 安裝時，把這三個檔案存到手機快取記憶體中
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('qc-store-v1').then((cache) => {
      return cache.addAll([
        './',
        './index.html',
        './icon.png',
        'https://cdn.tailwindcss.com' // 把外部樣式表也存起來
      ]);
    })
  );
});

// 攔截請求：如果沒網路，就從快取拿資料
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});