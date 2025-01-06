const CACHE_NAME = "driflux-cache-v1";
const filesToCache = [
  "/",
  "/index.html",
  "/sounds/*",
];

//cache files for offline usage
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(filesToCache);
    })
  );
});

//remove old caches
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

//serve cached content when offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      //return cached response if found, otherwise fetch from network
      return (
        response ||
        fetch(event.request).then((networkResponse) => {
          //cache the fetched response for future use
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
      );
    }).catch(() => {
      //fallback for when both cache and network fail
      if (event.request.destination === 'document') {
        return caches.match("/index.html");
      }
    })
  );
});
