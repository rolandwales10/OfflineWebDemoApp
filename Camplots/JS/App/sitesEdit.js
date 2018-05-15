$(document).ready(function () {
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
                appendMessage($('ul.errorMessages'), "Updated successfully");
            });
            request.fail(function (err) {
                appendMessage($('ul.errorMessages'), "Update failed: " + err);
            });
        });
        function objectifyForm(formArray) {
            var returnArray = {};
            for (var i = 0; i < formArray.length; i++) {
                returnArray[formArray[i]['name']] = formArray[i]['value'];
            }
            return returnArray;
        }
        ;
    });
    let sitesStore = "sites";
    let endOfHrefPos = window.location.href.lastIndexOf("/");
    let camplotId = window.location.href.substring(endOfHrefPos + 1);
    // multiply camplot_id by 1 to make it an integer without quotes
    camplotId = camplotId * 1;
    if (isNaN(camplotId))
        camplotId = 0;
    else {
        var openDB = OpenCamplotsOfflineDB();
        openDB.done(function () {
            var request = getRow(sitesStore, camplotId);
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
            });
        });
    }
});
//# sourceMappingURL=sitesEdit.js.map