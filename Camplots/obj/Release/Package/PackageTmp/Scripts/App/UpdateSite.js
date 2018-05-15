function UpdateSite(site) {
    /*
     *  Update a site in indexedDB.  This will either do an insert or an update.  If it has a camplot id > 0, it will do an update.
     */
    let deferred = $.Deferred();
    let interval = null;
    let putRequest = "";
    if (typeof db === 'object') {
        let transaction = db.instance.transaction([db.storeNames.sites], db.transactionTypes.readwrite);
        let store = transaction.objectStore(db.storeNames.sites);
        // force camplotId to be an number without the quotes
        site.CAMPLOT_ID = site.CAMPLOT_ID * 1;
        let camplotId = site.CAMPLOT_ID;
        if (site.CAMPLOT_ID > 0) {
            let putRequest = store.put(site, site.CAMPLOT_ID);
            putRequest.onsuccess = function () {
                deferred.resolve(site.CAMPLOT_ID);
            };
            putRequest.onerror = function (e) {
                deferred.reject('Update failed: ' + e.srcElement.error);
            };
        }
        else {
            let maxNbrResult = getMaxNumber(transaction);
            console.log('about to insert camplot ' + maxNbrResult);

            maxNbrResult.done(function (camplotId) {
                site.CAMPLOT_ID = camplotId * 1 + 1;      // force it to be a number
                putRequest = store.put(site, site.CAMPLOT_ID);
                putRequest.onsuccess = function () {
                    deferred.resolve("site saved");
                };
                putRequest.onerror = function (e) {
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
    /*
     *  Get the highest used number.  The new inserted number will be 1 greater than the highest.
     */
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
        //  If there is no data, return 0
        else deferred.resolve(maxRevisionObject);
    };
    openCursorRequest.onerror = function (event) {
        if (event.target.result) {
            deferred.reject('cursor error in getMaxNumber: ' + event);
        };
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