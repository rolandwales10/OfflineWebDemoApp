function getRow(objectStoreName, key) {
    let deferred = $.Deferred();
    let transaction = db.instance.transaction([objectStoreName], db.transactionTypes.readwrite);
    let store = transaction.objectStore(objectStoreName);
    let request = store.get(key);
    //console.log('get for ' + key);
    request.onsuccess = function (event) {
        var result = event.target.result;
        console.log('get result for ' + objectStoreName + " " + key + ":" + result);
        if (result === undefined)
            deferred.resolve("notFound");
        else
            deferred.resolve(result);
        console.log('get resolve');
    };
    request.onerror = function (err) {
        console.log('get reject');
        deferred.reject("getRowRequest failed: " + err);
    };
    //transaction.oncomplete = function () {
    //    console.log('get transaction resolve');
    //    deferred.resolve();
    //};
    //transaction.onerror = function (err) {
    //    console.log('get transaction reject');
    //    deferred.reject("getRowRequest failed: " + err);
    //};
    return deferred.promise();
}
//# sourceMappingURL=getRow.js.map