self.addEventListener('install', function ( event ) {
    console.log('[Service worker] Installing service worker ...', event);
    event.waitUntil(
        caches.open('pre-cache')
            .then(function ( cache ) {
                console.log('[Service Worker] Precaching App Shell');
                cache.add('/src/js/app.js');
            }));
});

self.addEventListener('activate', function ( event ) {
    console.log('[Service worker] Activating service worker ...', event);
    return self.clients.claim();
});

self.addEventListener('fetch', function ( event ) {
    event.respondWith(
        caches.match(event.request)
            .then(function ( response ) {
                if ( response ) {
                    return response;
                } else {
                    return fetch(event.request)
                }
            })
    );
});
