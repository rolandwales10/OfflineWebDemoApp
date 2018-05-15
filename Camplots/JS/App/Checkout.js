$(document).ready(function ($) {
    // var buttonVar = $("#download");
    var result;
    var item;
    $("#download").click(function (success) {
        var messageField = $('#messages');
        const sitesStore = "sites";
        var rowsAdded = 0;
        var totalDeletes = 0;
        var openDB = OpenCamplotsOfflineDB();
        openDB.done(function () {
            var getRows = getAll(sitesStore);
            var deleteRowRequest = null;
            getRows.done(function (data) {
                appendMessage($('ul.errorMessages'), 'count before = ' + data.length);
                var idx;
                for (idx = 0; idx < data.length; idx++) {
                    deleteRowRequest = deleteRow(sitesStore, data[idx].CAMPLOT_ID);
                    deleteRowRequest.done(function () {
                        totalDeletes += 1;
                    });
                    deleteRowRequest.fail(function (err) {
                        appendMessage($('ul.errorMessages'), "database delete failed: " + err);
                    });
                }
                // Give the asynchronous deletes 5 seconds to complete
                appendMessage($('ul.errorMessages'), 'waiting ');
                setTimeout(function () {
                    appendMessage($('ul.errorMessages'), "total deletes: " + totalDeletes);
                    loadData();
                }, 5000);
            });
            getRows.fail(function (e) {
                console.log('get rows error: ' + e);
            });
        });
        openDB.fail(function (msg) {
            appendMessage($('ul.errorMessages'), "database open failed: " + msg);
        });
        function loadData() {
            $.ajax({
                url: $('#sitesControllerHref').prop("href") + "/getAll",
                method: 'get',
                data: "",
                cache: false,
                contentType: false,
                processData: false,
                success: function (results) {
                    for (var idx = 0; idx < results.length; idx++) {
                        result = results[idx];
                        var update = UpdateSite(result);
                        update.done(function (msg) {
                            rowsAdded += 1;
                            if (rowsAdded == 10) {
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
});
//# sourceMappingURL=Checkout.js.map