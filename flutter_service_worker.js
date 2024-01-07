'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "dfca989108f3e990a0ccb496df732ab9",
"assets/AssetManifest.bin.json": "118cee729cca2a673c473c374f6c5770",
"assets/AssetManifest.json": "cd869ae2f539e1f27ea9b0fd037088af",
"assets/assets/dart.png": "7775ce4715317d98925003b44e3a9b7d",
"assets/assets/fishing.jpeg": "c8d7b6401ff4b9ee7a22343fc1b4815c",
"assets/assets/flutter.png": "1fe8622ec2919a56e002f23539f29419",
"assets/assets/ios.png": "6a57dee255ee0aba8ddd7c2743fb355d",
"assets/assets/logo.png": "5ed429326c0b550fefc7d0aa8c3cb8ec",
"assets/assets/self.JPG": "fe63be66fd790a17b905f322b2a6afb9",
"assets/assets/swift.png": "30d51a2094249e8845794b05e3314b33",
"assets/FontManifest.json": "1af402b7eb2f655ec52c7ea4e980f20d",
"assets/fonts/DancingScript-VariableFont_wght.ttf": "d58bb592345e95e81157b07c2db7bc00",
"assets/fonts/kanit/Kanit-Black.ttf": "98e93fc09832d3891a57162b83ecb930",
"assets/fonts/kanit/Kanit-Bold.ttf": "69646b07726772636b613cc5e12a1f28",
"assets/fonts/kanit/Kanit-ExtraBold.ttf": "41df63b2d1938bf065ba71700f32b623",
"assets/fonts/kanit/Kanit-ExtraLight.ttf": "8b786d6635f731d5bfe226e9f776531b",
"assets/fonts/kanit/Kanit-Italic.ttf": "681198abb02b3001bcd92b9437894450",
"assets/fonts/kanit/Kanit-Light.ttf": "eb18967912c9c66c98deec24bfe1efbd",
"assets/fonts/kanit/Kanit-Medium.ttf": "2fedce7deb446c41cc5274c226b43c04",
"assets/fonts/kanit/Kanit-Regular.ttf": "ba95370355da928d1c09da6a0a49a1d6",
"assets/fonts/kanit/Kanit-SemiBold.ttf": "efc1b35c18175cae0b8a3d06e3025cbe",
"assets/fonts/kanit/Kanit-Thin.ttf": "c0b1b7e615614217544a2f588cc18188",
"assets/fonts/MaterialIcons-Regular.otf": "9e43e3f4f3487108e591d0d456198530",
"assets/fonts/RubikGlitch-Regular.ttf": "31084a1e50a2f7d4ac413234d0e674c1",
"assets/NOTICES": "f29e880a14bb5700e12887b5c6324042",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "ada587154dfad326d209a418a5812c3c",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "36980b2896cc9830a65fa6cb6fb110a4",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "c035afdf602638cfd18deb2fbb515b89",
"assets/shaders/ink_sparkle.frag": "4096b5150bac93c41cbc9b45276bd90f",
"canvaskit/canvaskit.js": "eb8797020acdbdf96a12fb0405582c1b",
"canvaskit/canvaskit.wasm": "73584c1a3367e3eaf757647a8f5c5989",
"canvaskit/chromium/canvaskit.js": "0ae8bbcc58155679458a0f7a00f66873",
"canvaskit/chromium/canvaskit.wasm": "143af6ff368f9cd21c863bfa4274c406",
"canvaskit/skwasm.js": "87063acf45c5e1ab9565dcf06b0c18b8",
"canvaskit/skwasm.wasm": "2fc47c0a0c3c7af8542b601634fe9674",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"favicon.png": "7a49ef076775b27720782d1c044ca717",
"flutter.js": "59a12ab9d00ae8f8096fffc417b6e84f",
"icons/Icon-192.png": "f450ac80d20be0aa5be64655a8b5b2cb",
"icons/Icon-512.png": "0e1acb44fae6b875b363945e52704f44",
"icons/Icon-maskable-192.png": "f450ac80d20be0aa5be64655a8b5b2cb",
"icons/Icon-maskable-512.png": "0e1acb44fae6b875b363945e52704f44",
"index.html": "ea79b8ec6353cc90a5d9068c6e15a7d1",
"/": "ea79b8ec6353cc90a5d9068c6e15a7d1",
"main.dart.js": "3d0e48ca393d363064ea3bd7a31633dc",
"manifest.json": "26d0bca62513eccdc05226317e6b87d7",
"version.json": "3cc42e93fd10d2ba5fa90093e3aaff40"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
