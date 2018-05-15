/*
 *  Delete all data from a table in IndexedDB
 */
function deleteAll(objectStoreName) {
    let deferred = $.Deferred();
    let transaction = db.instance.transaction([db.storeNames.sites], db.transactionTypes.readwrite);
    let store = transaction.objectStore(db.storeNames.sites);
    let deleteRequest = store.clear();
    deleteRequest.onsuccess = function (event) {
        deferred.resolve();
    };
    deleteRequest.onerror = function (err) {
        deferred.reject("deleteRowRequest failed: " + err);
    };
    return deferred.promise();
}