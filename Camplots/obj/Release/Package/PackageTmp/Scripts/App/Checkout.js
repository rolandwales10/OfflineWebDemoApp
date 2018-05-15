$(document).ready(function ($) {
    /*
     *  Checkout data from the server in order to do offline updates.
     *  steps:
     *  1) delete existing data
     *  2) retreive data from the server
     *  3) insert it into local database storage (indexedDb)
     *     Note that the Json data returned by the server is inserted into IndexedDB with virtually no transformation.  Nice!
     */
    const sitesStore = "sites";
    var result;
    var item;

    $("#download").click(function (success) {
        var messageField = $('#messages');

        var openDB = OpenCamplotsOfflineDB();
        openDB.done(function () {
            try {
                var deleteRowRequest = deleteAll(sitesStore);

                deleteRowRequest.done(function () {
                    appendMessage($('ul.errorMessages'), "Existing data deleted");
                    loadData();
                });
                deleteRowRequest.fail(function (err) {
                    appendMessage($('ul.errorMessages'), "database delete failed: " + err);
                });
            }
            catch (err) {
                appendMessage($('ul.errorMessages'), "deleteAll call failed: " + err.message);
            }
        });
    openDB.fail(function (msg) {
        appendMessage($('ul.errorMessages'), "database open failed: " + msg);
    });
    });

    function loadData() {
        var rowsToBeInserted = 0;
        var rowsAdded = 0;
        $.ajax({
            url: $('#sitesControllerHref').prop("href") + "/getAll",
            method: 'get',
            data: "",
            cache: false,
            contentType: false,
            processData: false,

            success: function (results) {
                rowsToBeInserted = results.length;
                appendMessage($('ul.errorMessages'), rowsToBeInserted + " rows to be inserted");
                for (var idx = 0; idx < results.length; idx++) {
                    result = results[idx];
                    var update = UpdateSite(result);
                    update.done(function (msg) {
                        rowsAdded += 1;
                        if (rowsAdded == rowsToBeInserted) {
                            appendMessage($('ul.errorMessages'), rowsAdded + " rows inserted");
                            checkRowCount();
                        }
                    });
                    update.fail(function (msg) {
                        appendMessage($('ul.errorMessages'), "database update failed: " + msg);
                    });
                }

            },
            error: function (response) {
                appendMessage($('ul.errorMessages'), 'checkout.js error response: ' + response.responseJSON);
            }
        });
    }

    function checkRowCount() {
        getRows = getAll(sitesStore);
        getRows.done(function (data) {
            appendMessage($('ul.errorMessages'), 'count after: ' + data.length);
        });
        getRows.fail(function (e) {
            appendMessage($('ul.errorMessages'), 'get rows error: ' + e);
        });
    }
});

