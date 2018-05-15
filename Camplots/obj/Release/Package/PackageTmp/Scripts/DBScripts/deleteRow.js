    /*
     *  Delete a single row from a table in IndexedDB
     */
function deleteRow(objectStoreName, key) {
    let deferred = $.Deferred();
    let transaction = db.instance.transaction([db.storeNames.sites], db.transactionTypes.readwrite);
    let store = transaction.objectStore(db.storeNames.sites);
    let getRequest = store.get(key);
    getRequest.onsuccess = function (event) {
        let deleteRequest = store.delete(key);
        deleteRequest.onsuccess = function (event) {
            getRequest = getRow(objectStoreName, key);
            getRequest.done(function (result) {
                if (result === "notFound") {} else console.log('old record still there: ' + key);
            });
            getRequest.fail(function (result) {
                console.log('deleteRow.js: get failed for : ' + key);
            });
            deferred.resolve();
        };
        deleteRequest.onerror = function (err) {
            deferred.reject("deleteRowRequest failed: " + err);
        };
        //transaction.oncomplete = function () {
        //    deferred.resolve();
        //};
        //transaction.onerror = function (err) {
        //    console.log('delete ransaction reject');
        //    deferred.reject("deleteRowRequest failed: " + err);
        //};
    }
    return deferred.promise();
}