$(document).ready(function () {
    // Check if a new cache is available on page load.
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/AppCacheSW.js', { scope: '/' })
            .then(function (reg) {
            // registration worked
            console.log('Registration succeeded. Scope is ' + reg.scope);
        }).catch(function (error) {
            // registration failed
            console.log('Registration failed with ' + error);
        });
    }
});
//# sourceMappingURL=HomeBase.js.map