    /*
     *  Get all rows for a table in IndexedDB
     */

function getAll(objectStoreName) {
    let deferred = $.Deferred();
    try {
        if (typeof db.instance === 'object') {
            var transaction = db.instance.transaction([objectStoreName], db.transactionTypes.readonly);
            var store = transaction.objectStore(objectStoreName);
            var countRequest = store.count();
            var data = [];
            countRequest.onsuccess = function (countEventArgs) {
                var totalCount = countEventArgs.target.result;
                var cursorRequest = store.openCursor();
                cursorRequest.onsuccess = function (cursorEventArgs) {
                    var result, item;
                    result = cursorEventArgs.target.result;
                    if (result !== null) {
                        item = result.value;
                        data.push(item);
                        result.continue();
                    } else {
                        deferred.resolve(data);
                    }
                };
            };
            countRequest.onerror = function (err) {
                deferred.reject("getAll error: " + err);
            }
        }
        else {
            deferred.reject('You cannot read data from a store when the database is not open. Store name: ' + objectStoreName);
        }
    }
    catch (ex) {
        deferred.reject('getAll: ' + ex);
    }
    return deferred.promise();
};