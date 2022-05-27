const CACHE_NAME = "version-1";
const urlsToCache = ["index.html", "offline.html"];
//install service worker(sw)
self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			console.log("opened cache");
			return cache.addAll(urlsToCache);
		})
	);
});
//listen for requests
self.addEventListener("fetch", (event) => {
	event.respondWith(
		caches
			.match(event.request)
			.then((cache) => {
				return fetch(event.request);
			})
			.catch(() => caches.match("offline.html"))
	);
});
//Activate service worker file
self.addEventListener("activate", (event) => {
	const cacheWhiteList = [];
	cacheWhiteList.push(CACHE_NAME);
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			Promise.all(
				cacheNames.map((cacheName) => {
					if (!cacheWhiteList.includes(cacheName)) {
						return cache.delete(cacheName);
					}
				})
			);
		})
	);
});
