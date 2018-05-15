$(document).ready(function () {
    registerSW();
});

function registerSW() {
/*
 *  Register a service worker to handle fetching of software when offline
 */
    console.log('Begin service worker registration');
    if ('serviceWorker' in navigator) {
        /*  Note: url.action does not give us exactly what we need for scope.  Scope does not include the host name.
         */
        var scope = '/ACF/Farmshare/';
        if (window.location.href.indexOf("localhost") >= 0)
            scope = '/';
        console.log('scope = ' + scope);
        var appCacheFile = scope + 'AppCacheSW.js';
        navigator.serviceWorker.register(appCacheFile, { scope: scope })
            .then(function (reg) {
                console.log('Registration state is ' + reg.active.state);
            }).catch(function (error) {
                // registration failed
                console.log('Service worker registration exception: ' + error);
            });
    }
    else {
        appendMessage($('ul.errorMessages'), 'Offline use is not supported by your current browser');
    }
}