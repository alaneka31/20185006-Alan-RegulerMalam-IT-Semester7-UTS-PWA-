// service-worker.js

const namacache = 'utspwa';
const filecache = [
    '/',
    'index.html',
    'style.css',
    'manifest.json',
    'foto-diri.png',
    // Daftarkan semua file yang perlu di-cache di sini
];

self.addEventListener('install', e => {
    console.log('Service Worker Terpasang');
    e.waitUntil(
      caches.open(namacache).then(cache => {
        console.log('Service Worker: Caching files');
        cache.addAll(filecache);
      }).then(() => self.skipWaiting())
    );
  });
  
  self.addEventListener('activate', e => {
    console.log('Service Worker Aktif');
  
    e.waitUntil(
      caches.keys().then(namacache => {
        return Promise.all(
          namacache.map(cache => {
            if (cache !== namacache) {
              console.log('Service Worker: Menghapus cache lama');
              return caches.delete(filecache);
            }
          })
        );
      })
    );
  });
  
  // call fetch
  self.addEventListener('fetch', e =>{
  console.log('Service Worker : Fetching');
  e.respondWith(
    fetch(e.request)
    .then(res => {
  
     const resClone = res.clone();
     caches
     .open(namacache)
     .then(cache => {
  
      cache.put(e.request, resClone);
     });
     return res;
    })
    .catch(err => caches.match(e.request)
    .then(res => res)
    )
  );
  
  
  });
  // service-worker.js

self.addEventListener('push', function(event) {
  const options = {
      body: event.data.text(),
      icon: 'icon.png',
      badge: 'badge.png'
  };

  event.waitUntil(
      self.registration.showNotification('Pemberitahuan', options)
  );
});
