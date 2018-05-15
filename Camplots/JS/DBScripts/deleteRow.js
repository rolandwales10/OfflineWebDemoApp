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
                if (result === "notFound") { }
                else
                    console.log('old record still there: ' + result.CAMPLOT_ID);
            });
            getRequest.fail(function (result) {
                console.log('get failed for : ' + key);
            });
            console.log('delete resolve');
            deferred.resolve();
        };
        deleteRequest.onerror = function (err) {
            console.log('delete reject');
            deferred.reject("deleteRowRequest failed: " + err);
        };
        transaction.oncomplete = function () {
            console.log('delete transaction resolve');
            deferred.resolve();
        };
        transaction.onerror = function (err) {
            console.log('delete ransaction reject');
            deferred.reject("deleteRowRequest failed: " + err);
        };
    };
    return deferred.promise();
}
//# sourceMappingURL=deleteRow.js.map