const CACHE_NAME = "nullworks-weenis-v0.2.0";
const CORE_ASSETS = [
  "/weenis",
  "/weenis-manifest.webmanifest",
  "/weenis-icon.svg",
  "/remote-eye-v3/index.html?embed=weenis&v=3.2.1",
  "/remote-eye-v3/styles.css?v=3.1.0",
  "/remote-eye-v3/weenis-embed.css?v=3.2.0",
  "/remote-eye-v3/app-core.js?v=3.0.0",
  "/remote-eye-v3/app-source.js?v=3.0.0",
  "/remote-eye-v3/app-session.js?v=3.0.0",
  "/remote-eye-v3/app-controls.js?v=3.2.1",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() =>
          caches.match(request).then((match) => match || caches.match("/weenis")),
        ),
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        if (!response || response.status !== 200 || response.type !== "basic") return response;
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        return response;
      });
    }),
  );
});

self.addEventListener("message", (event) => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});
