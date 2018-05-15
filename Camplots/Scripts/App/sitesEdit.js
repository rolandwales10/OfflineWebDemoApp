$(document).ready(function () {
    /*
     *  Supports a from to edit data for a site.  This serializes the data on the form and passes it to IndexedDB to update
     */
    $('#Save').click(function () {
        var idx;
        var newSite = $('#thisForm').serializeArray();
        if (newSite[0].name.indexOf("RequestVerificationToken") > 0)
            newSite.splice(0, 1);
        //for (idx = 0; idx < newsite.length; idx++) {
        //  delete anything else not in the entity.  Lookup fields, etc.
        //}
        var newSite2 = objectifyForm(newSite);
        var openDB = OpenCamplotsOfflineDB();
        openDB.done(function () {
            var request = UpdateSite(newSite2);
            request.done(function () {
                let url = $('#sitesControllerHref').prop("href") + "/IndexOffline";
                window.location.replace(url);
            });
            request.fail(function (err) {
                appendMessage($('ul.errorMessages'), "Update failed: " + err);
            });
        });

        function objectifyForm(formArray) {//serialize data function

            var returnArray = {};
            for (var i = 0; i < formArray.length; i++) {
                returnArray[formArray[i]['name']] = formArray[i]['value'];
            }
            return returnArray;
        };
    });
    let camplotId = "";
    let sitesStore = "sites";
    /*
     *  Service worker caching can use the following code:
     */
    let endOfHrefPos = window.location.href.lastIndexOf("?") + 1;
    if (window.location.href.substr(endOfHrefPos, 11) === 'CAMPLOT_ID=') {
        endOfHrefPos += 11;
        camplotId = window.location.href.substring(endOfHrefPos);
    }
    /*
     *  Cache manifest does not support arguments in the URL, requires local storage
     */
    else {
        camplotId = localStorage.getItem("camplotId");
        localStorage.removeItem("camplotId");
    }
    // temporary: for demo purposes, provide an id if none in local storage
    if (isNaN(camplotId))
        appendMessage($('ul.errorMessages'), 'Error: this form received a non numeric camplotId: ' + camplotId);
    // multiply camplot_id by 1 to make it an integer without quotes
    camplotId = camplotId * 1
    if (isNaN(camplotId)) camplotId = 0;
    else {
        var openDB = OpenCamplotsOfflineDB();
        openDB.done(function () {
            var request = getRow(sitesStore, camplotId);
            if (camplotId > 0) {
                request.done(function (sites) {
                    if (sites === "notFound") {
                        appendMessage($('ul.errorMessages'), 'Camplot id ' + camplotId + " not found");
                    }
                    else {
                        $('#CAMPLOT_ID').val(sites.CAMPLOT_ID);
                        $('#LOCATION').val(sites.LOCATION);
                    }
                });
                request.fail(function (err) {
                    appendMessage($('ul.errorMessages'), "get failed: " + err);
                })
            }
        });
    }
});