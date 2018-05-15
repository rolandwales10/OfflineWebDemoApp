var CACHE_NAME = 'my-site-cache-v1.01';

//  use sw.state to find out the state

var urlsToCache = [
    //'/'
    'Scripts/App/HomeBase.js',
    'Scripts/App/sitesEdit.js',
    'Scripts/App/sitesIndex.js',
    'Scripts/App/sitesInsert.js',
    'Scripts/App/OpenCamplotsOfflineDB.js',
    'Scripts/App/UpdateSite.js',
    'Scripts/CustomUtility/Edits.js',
    'Scripts/CustomUtility/messageDisplay.js',
    'Scripts/DBScripts/deleteAll.js',
    'Scripts/DBScripts/deleteRow.js',
    'Scripts/DBScripts/getAll.js',
    'Scripts/DBScripts/getRow.js',
    'Scripts/bootstrap.min.js',
    'Scripts/jquery-3.1.1.min.js',
    'Scripts/jquery.validate.min.js',
    'Scripts/jquery.validate.unobtrusive.min.js',
    'Home/Index',
    'sites/Menu',
    'sites/Edit',
    'sites/IndexOffline'
];
self.addEventListener('install', event => {
    // Bypass the waiting lifecycle stage,
    // just in case there's an older version of this SW registration.
    console.log('install');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            }).catch(function (error) {
                console.log('install error: ' + error);
            })
    );
});

self.addEventListener('updatefound', function () {
    console.log('update found in app cache service worker');
});

//self.addEventListener('activate', event => {
//    // Take control of all pages under this SW's scope immediately,
//    // instead of waiting for reload/navigation.
//    event.waitUntil(self.clients.claim());
//});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request, { ignoreSearch: true }).then(function (response) {
            if (response) {
                console.log('match ' + event.request.url);
                return response;
            }
            else {
                console.log('no match ' + event.request.url);
                return fetch(event.request);
            }
            //else {
            //    console.log('no match ' + event.request.url);

            //    // Fetch from the network
            //    return fetch(event.request).then(function (fResponse) {
            //        // Open the cache
            //        return caches.open(CACHE_NAME).then(function (cache) {
            //            // Put a clone of the fetched response into the cache
            //            return cache.put(event.request, fResponse.clone()).then(function () {
            //                //  Return the fetched response back to the browser
            //                return fResponse;
            //            });
            //        });
            //    });
            //}
        })
        .catch(function (error) {
            console.log('fetch error: ' + error);
        })
    )
});

/*
 * The following code grabs files as they are fetched and caches them.  Slick idea, but it hasn't worked on a server, and there are no error messages.
 */
            //else {
            //    console.log('no match ' + event.request.url);

            //    // Fetch from the network
            //    return fetch(event.request).then(function (fResponse) {
            //        // Open the cache
            //        return caches.open(CACHE_NAME).then(function (cache) {
            //            // Put a clone of the fetched response into the cache
            //            return cache.put(event.request, fResponse.clone()).then(function () {
            //                //  Return the fetched response back to the browser
            //                return fResponse;
            //            });
            //        });
            //    });
            //})