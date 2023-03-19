const staticCacheName = 'dictionary'

const cacheAssets = [
	'/',
	'/js/ui.js',
	'/js/app.js',
	'/index.html',
	'/style/style.css',
	'/image/cover.png',
	'/image/search.svg',
	'https://cdn.jsdelivr.net/npm/toastify-js',
	'https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css',
]

self.addEventListener('install', evt => {
	console.log('install')
	evt.waitUntil(
		caches
			.open(staticCacheName)
			.then(cache => {
				console.log('caching assets...')
				cache.addAll(cacheAssets)
			})
			.catch(err => {})
	)
})

self.addEventListener('activate', evt => {
	evt.waitUntil(
		caches.keys().then(keys => {
			return Promise.all(
				keys
					.filter(key => key !== staticCacheName)
					.map(key => caches.delete(key))
			)
		})
	)
})

self.addEventListener('fetch', evt => {
	evt.respondWith(
		caches.match(evt.request).then(res => res || fetch(evt.request))
	)
})
