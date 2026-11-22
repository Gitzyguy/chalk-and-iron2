/* Chalk & Iron service worker: caches the app so it runs fully offline. */
const CACHE = 'chalk-iron-3.6.1';
const ASSETS = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './maskable-512.png'];
self.addEventListener('install', e => {
  /* cache each file on its own so one missing file never blocks the app */
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(ASSETS.map(a => c.add(a).catch(() => null)))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  if (req.mode === 'navigate') {
    /* Network first so updates arrive. On a weak connection, open the saved app after 3 seconds.
       Only a good page replaces the saved copy, so a server error never breaks offline use. */
    const net = fetch(req).then(r => {
      if (r.ok) { const c = r.clone(); caches.open(CACHE).then(x => x.put('./index.html', c)); }
      return r;
    });
    const saved = () => caches.match('./index.html');
    e.respondWith(new Promise(resolve => {
      let sent = false;
      const send = r => { if (!sent && r) { sent = true; resolve(r); } };
      const t = setTimeout(() => saved().then(send), 3000);   // no saved copy yet: keep waiting for the network
      net.then(r => { clearTimeout(t); if (r.ok) send(r); else saved().then(c => send(c || r)); })
        .catch(() => { clearTimeout(t); saved().then(c => send(c || Response.error())); });
    }));
    e.waitUntil(net.catch(() => null));   // keep caching the fresh page even if the saved copy was shown
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
    if (r.ok) { const c = r.clone(); caches.open(CACHE).then(x => x.put(req, c)); }
    return r;
  })));
});
