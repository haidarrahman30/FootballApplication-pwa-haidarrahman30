const CACHE_NAME = 'GTball v1'
const urlToCache = [
    "/",
    "/nav.html",
    "/index.html",
    "/detail_match.html",
    "/detail_player.html",
    "/detail_team.html",
    "/pages/home.html",
    "/pages/jadwal.html",
    "/pages/klasemen.html",
    "/pages/tentang.html",
    "/pages/favorit.html",
    "/images/icon.png",
    "/images/1.jpg",
    "/images/icon-512.jpg",
    "/images/jumbotron.jpg",
    "/images/profil.jpg",
    "/css/fontawesome/fontawesome.min.css",
    "/css/fontawesome/all.min.css",
    "/css/materialize.min.css",
    "/css/main.css",
    "/js/materialize.min.js",
    "/js/jquery.min.js",
    "/js/nav.js",
    "/js/main.js",
    "/js/klasemen.js", "/js/matchleague.js",
    "/js/detail_team.js", "/js/detail_match.js",
    "/js/idb.js", "/js/dbfootball.js",
    "/js/dbfunction.js",
    "https://fonts.googleapis.com/icon?family=Material+Icons"
]
const base_url = 'https://api.football-data.org/v2'

// * install
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlToCache)
        })
    )
})

// * fetch
self.addEventListener('fetch', event => {
    if (event.request.url.indexOf(base_url) > -1) {
        event.respondWith(
            (async() => {
                const cache = await caches.open(CACHE_NAME)
                const res = await fetch(event.request)
                cache.put(event.request.url, res.clone())
                return res
            })()
        )
    } else {
        event.respondWith(
            (async() => {
                return await caches.match(event.request.url, {
                    ignoreSearch: true
                }) || await fetch(event.request)
            })()
        )
    }
})

// *delete
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('cache ' + cacheName + ' dihapus')
                        return caches.delete(cacheName)
                    }
                })
            )
        })
    )
})

// * push notification
self.addEventListener('push', event => {
    console.log(event);
    let body;
    if (event.data) {
        body = event.data.text()
    } else {
        body = "push message no payload"
    }

    let opt = {
        body,
        icon: './images/icon.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    }

    event.waitUntil(
        self.registration.showNotification('Push notification', opt)
    )
})