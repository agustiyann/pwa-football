importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"
);

if (workbox) console.log("Workbox berhasil dimuat");
else console.log("Workbox gagal dimuat");

workbox.precaching.precacheAndRoute([
  { url: "/index.html", revision: "1" },
  { url: "/nav.html", revision: "1" },
  { url: "/detailclub.html", revision: "1" },
  { url: "/push.js", revision: "1" },
  { url: "/service-worker.js", revision: "1" },
  { url: "/manifest.json", revision: "1" },
  { url: "/img/icon-192.png", revision: "1" },
  { url: "/img/icon-521.png", revision: "1" },
  { url: "/css/materialize.min.css", revision: "1" },
  { url: "/css/materialize.css", revision: "1" },
  { url: "/css/style.css", revision: "1" },
  { url: "/font/fontface.css", revision: "1" },
  { url: "/font/materialfont.woff2", revision: "1" },
  { url: "/js/materialize.min.js", revision: "1" },
  { url: "/js/materialize.js", revision: "1" },
  { url: "/js/api.js", revision: "1" },
  { url: "/js/db.js", revision: "1" },
  { url: "/js/idb.js", revision: "1" },
  { url: "/js/jquery-3.4.1.min.js", revision: "1" },
  { url: "/js/match.js", revision: "1" },
  { url: "/js/nav.js", revision: "1" },
  { url: "/js/swregister.js", revision: "1" },
  { url: "/pages/favorite.html", revision: "1" },
  { url: "/pages/home.html", revision: "1" },
  { url: "/pages/scheduled.html", revision: "1" },
  { url: "/pages/standing.html", revision: "1" }
]);

workbox.routing.registerRoute(
  new RegExp(".(png|svg|jpg|jpeg)$"),
  workbox.strategies.cacheFirst({
    cacheName: "cache-image",
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 7,
        maxEntries: 50,
        purgeOnQuotaError: true
      })
    ]
  })
);

workbox.routing.registerRoute(
  new RegExp('https://api.football-data.org/v2/'),
  workbox.strategies.staleWhileRevalidate({
    cacheName: 'cache-url',
    cacheExpiration: {
      maxAgeSeconds: 60 * 30 //cache the news content for 30mn
    }
  })
);

workbox.routing.registerRoute(
  /^https:\/\/upload\.wikimedia\.org/,
  workbox.strategies.cacheFirst({
    cacheName: "logo-team",
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 30,
        maxEntries: 30
      })
    ]
  })
);

self.addEventListener("push", function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push message no payload";
  }
  var options = {
    body: body,
    icon: "img/icon-512.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});
