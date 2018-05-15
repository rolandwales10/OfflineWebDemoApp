$(document).ready(function ($) {
    /*
     *  Check data back into the server from offline storage
     */
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
            getRows.fail(function (ex) {
                appendMessage($('ul.errorMessages'), "getRows.fail: " + ex);
            });
        });
        openDB.fail(function (ex) {
            appendMessage($('ul.errorMessages'),"database open failed: " + ex);
        });

        function uploadData(data) {
            var jdata = '{"sites":' + JSON.stringify(data) + '}';
            var urlv = $('#sitesControllerHref').prop("href") + "/CheckUpdatesBackIn";
            $.ajax({
                url: urlv,
                type: 'post',
                dataType:  "json",
                data: { siteData: jdata },
                success: function (results) {
                    console.log("checkin.js success: " + results);
                    appendMessage($('ul.errorMessages'), "done");
                },
                error: function (response) {
                    console.log('checkin.js error response: ' + response.statusText);
                    appendMessage($('ul.errorMessages'), "done");
                }
            });
        }
    });
});
