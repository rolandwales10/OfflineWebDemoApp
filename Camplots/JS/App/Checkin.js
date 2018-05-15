$(document).ready(function ($) {
    // var buttonVar = $("#upload");
    var result;
    var item;
    $("#upload").click(function (success) {
        var messageField = $('#messages');
        const sitesStore = "sites";
        var rowsAdded = 0;
        var totalDeletes = 0;
        var openDB = OpenCamplotsOfflineDB();
        openDB.done(function () {
            var getRows = getAll(sitesStore);
            getRows.done(function (data) {
                uploadData(data);
            });
            getRows.fail(function (e) {
                console.log('get rows error: ' + e);
            });
        });
        openDB.fail(function (msg) {
            appendMessage($('ul.errorMessages'), "database open failed: " + msg);
        });
        function uploadData(data) {
            var jdata = '{"sites":' + JSON.stringify(data) + '}';
            var urlv = $('#sitesControllerHref').prop("href") + "/CheckUpdatesBackIn";
            $.ajax({
                url: urlv,
                type: 'post',
                dataType: "json",
                data: { sites: jdata },
                success: function (results) {
                    appendMessage($('ul.errorMessages'), "update successful " + results);
                },
                error: function (response) {
                    appendMessage($('ul.errorMessages'), 'checkin.js error response: ' + response.statusText);
                }
            });
        }
    });
});
//# sourceMappingURL=Checkin.js.map