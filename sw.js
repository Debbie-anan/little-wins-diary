const CACHE = 'little-wins-shell-v6';
const ASSETS = ['./', './index.html', './style.css', './scattered-notes.css', './bear-animation.css', './assets/bear/pose-1.jpg', './assets/bear/pose-2.jpg', './assets/bear/pose-3.jpg', './assets/bear/pose-4.jpg', './assets/bear/pose-5.jpg', './assets/bear/pose-6.jpg', './app.js', './manifest.webmanifest', './diary-icon-192.png', './diary-icon-512.png', './diary-icon-maskable.png', './diary-apple-touch-icon.png'];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('little-wins-shell-') && key !== CACHE).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(fetch(event.request).then(response => {
    if (response.ok) { const copy = response.clone(); event.waitUntil(caches.open(CACHE).then(cache => cache.put(event.request, copy))); }
    return response;
  }).catch(async () => (await caches.match(event.request)) || (event.request.mode === 'navigate' ? await caches.match('./index.html') : Response.error())));
});




