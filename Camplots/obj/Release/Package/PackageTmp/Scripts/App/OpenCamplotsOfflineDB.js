function OpenCamplotsOfflineDB() {
    /*
     *  Open the database, creating  a database and tables if empty
     */
    let deferred = $.Deferred();
    db = {
        name: 'camplotsDB',
        version: 1,
        transactionTypes: {
            readonly: 'readonly',
            readwrite: 'readwrite'
        },
        instance: {},
        storeNames: {
            sites: 'sites',
            plumbingInspectors: 'plumbingInspectors'
        },
        defaultErrorHandler: function (e) {
            console.log("index db error: " + e);
        },
    };

    let openRequest = indexedDB.open(db.name, db.version);
    openRequest.onupgradeneeded = function (e) {
        let keypath = "CAMPLOT_ID";
        var newVersion = e.target.result;
        if (!newVersion.objectStoreNames.contains('sites')) {
            let sitesStore = newVersion.createObjectStore('sites',
                {
                    keypath: keypath,
                    autoIncrement: false
                });
            sitesStore.createIndex(keypath, keypath, { unique: true });
        }
        if (!newVersion.objectStoreNames.contains('plumbingInspectors')) {
            newVersion.createObjectStore('plumbingInspectors',
                {
                    keypath: "contactId",
                    autoIncrement: true
                });
        }
    };

    openRequest.onsuccess = function (e) {
        db.instance = e.target.result;
        deferred.resolve();
    };
    openRequest.onerror = function (e) {
        console.log('Error: open database failed ' + e);
        deferred.reject(e);
    };
    return deferred.promise();
};