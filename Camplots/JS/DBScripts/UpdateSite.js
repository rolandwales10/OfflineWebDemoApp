function UpdateSite(site) {
    let deferred = $.Deferred();
    let interval = null;
    let gt = "";
    if (typeof db === 'object') {
        let transaction = db.instance.transaction([db.storeNames.sites], db.transactionTypes.readwrite);
        let store = transaction.objectStore(db.storeNames.sites);
        // force camplotId to be an number without the quotes
        site.CAMPLOT_ID = site.CAMPLOT_ID * 1;
        let camplotId = site.CAMPLOT_ID;
        if (site.CAMPLOT_ID > 0) {
            let gt = store.put(site, site.CAMPLOT_ID);
            gt.onsuccess = function () {
                deferred.resolve(site.CAMPLOT_ID);
            };
            gt.onerror = function (e) {
                deferred.reject('Update failed: ' + e.srcElement.error);
            };
        }
        else {
            let maxNbrResult = getMaxNumber(transaction);
            console.log('about to insert camplot ' + maxNbrResult);
            maxNbrResult.done(function (camplotId) {
                site.CAMPLOT_ID = camplotId * 1 + 1; // force it to be a number
                gt = store.put(site, site.CAMPLOT_ID);
                gt.onsuccess = function () {
                    deferred.resolve("site saved");
                };
                gt.onerror = function (e) {
                    deferred.reject('Update failed: ' + e.srcElement.error);
                };
            });
            maxNbrResult.fail(function (e) {
                deferred.reject('getMaxNumber failed: ' + e);
            });
        }
    }
    else
        deferred.reject("updateSite error: db is not an object");
    return deferred.promise();
}
function getMaxNumber(transaction) {
    let deferred = $.Deferred();
    var objectStore = transaction.objectStore(db.storeNames.sites);
    var index = objectStore.index('CAMPLOT_ID');
    var openCursorRequest = index.openCursor(null, 'prev');
    var maxRevisionObject = 0;
    openCursorRequest.onsuccess = function (event) {
        if (event.target.result) {
            maxRevisionObject = event.target.result.value.CAMPLOT_ID; //the object with max revision
            console.log('max revision is ' + maxRevisionObject);
            deferred.resolve(maxRevisionObject);
        }
        else
            deferred.reject('event.target.result is null');
    };
    openCursorRequest.onerror = function (event) {
        if (event.target.result) {
            deferred.reject('cursor error in getMaxNumber: ' + event);
        }
        ;
    };
    return deferred.promise();
}
//async function waitSleep() {
//    console.log('wait sleep');
//    await sleep2(500);
//}
//function sleep2(ms) {
//    console.log('sleep: ' + ms);
//    return new Promise(resolve => setTimeout(resolve, ms));
//} 
//# sourceMappingURL=UpdateSite.js.map