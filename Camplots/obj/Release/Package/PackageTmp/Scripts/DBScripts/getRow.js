﻿    /*
     *  Get a single row of a table in IndexedDB
     */

function getRow(objectStoreName, key) {
    let deferred = $.Deferred();
    let transaction = db.instance.transaction([objectStoreName], db.transactionTypes.readwrite);
    let store = transaction.objectStore(objectStoreName);
    let request = store.get(key);
    //console.log('get for ' + key);
    request.onsuccess = function (event) {
        var result = event.target.result;
        if (result === undefined)
            deferred.resolve("notFound");
        else
            deferred.resolve(result);
    };
    request.onerror = function (err) {
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