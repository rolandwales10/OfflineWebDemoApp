$(document).ready(function () {
    /*
     *  Insert a new site offline
     */
    $("#btnCreate").click(function () {
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
            request.done(function (camplotId) {
                appendMessage($('ul.errorMessages'), "Updated successfully.  key = " + camplotId);
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
        }
    });
});
