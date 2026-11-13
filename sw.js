const CACHE='my-ot-tracker-v12-mobile-startup';
const ASSETS=['./','./index.html','./app.mjs','./core.mjs','./style.css','./manifest.webmanifest','./icon.svg','./contoh-roster.csv'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('my-ot-tracker-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;
 const url=new URL(e.request.url);
 const staticAsset=ASSETS.slice(1).some(path=>url.pathname.endsWith(path.slice(2)));
 if(staticAsset){
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(cached=>cached||fetch(e.request).then(response=>{
   if(response.ok){const copy=response.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));}return response;
  })));
  return;
 }
 // Installed app: open the cached shell immediately instead of waiting on a slow network.
 if(e.request.mode==='navigate'){
  e.respondWith((async()=>{
   const cached=await caches.match('./');
   if(cached) return cached;
   try{
    const response=await fetch(e.request);
    if(response.ok){const copy=response.clone();e.waitUntil(caches.open(CACHE).then(c=>c.put('./',copy)));}
    return response;
   }catch{return Response.error();}
  })());
 }

});
