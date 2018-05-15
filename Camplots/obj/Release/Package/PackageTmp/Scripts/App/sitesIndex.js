$(document).ready(function () {
    /*
     *  Display a list of sites from offline storage.
     */
    $('#getList').click(function () {
        loadData();
    });
    // load data when this form is first displayed.
    loadData();
});

/* This function is required in order to create a local variable for camplotId.  It is only needed for the manifest cache.
 * The service worker alternative doesn't require this.
 */
//function EditSite(camplotId) {
//    localStorage.setItem("camplotId", camplotId);
//    var urlv = $('#sitesControllerHref').prop("href");
//    urlv += "/Edit";
//    window.open(urlv);
//}

function DeleteSite(camplotId) {
    var openDB = OpenCamplotsOfflineDB();
    openDB.done(function () {
        var request = deleteRow("sites",camplotId);
        request.done(function () {
            loadData();
        });
        request.fail(function (err) {
            appendMessage($('ul.errorMessages'), "Delete row failed: " + err);
        });
    });}

function loadData() {
    "use strict";
    var table = document.getElementById("sitesTable");
    var rowIdx = 0;
    var colIdx = 0;
    var idx;
    var row;
    var cell;
    var sitesStore = "sites";
    var urlv = $('#sitesControllerHref').prop("href");
    urlv += "/Edit";
    var openDB = OpenCamplotsOfflineDB();
    appendMessage($('ul.errorMessages'), "openDatabase requested");
    openDB.done(function () {
        var getRows = getAll(sitesStore);
        getRows.done(function (data) {
            appendMessage($('ul.errorMessages'), "Row count is " + data.length);
            var count = table.rows.length;
            // delete every row except for the header
            for (idx = 1; idx < count; idx++) {
                table.deleteRow(-1);  // delete the last remaining row
            }
            for (idx = 0; idx < data.length; idx++) {
                rowIdx = idx + 1;
                row = table.insertRow(rowIdx);
                cell = row.insertCell(0);
                cell.innerHTML = data[idx].CAMPLOT_ID;
                cell = row.insertCell(1);
                cell.innerHTML = data[idx].LOCATION;
                //cell = row.insertCell(2);
                //cell.innerHTML = data[idx].CTY;
                cell = row.insertCell(2);

                // use this for cache manifest
                //cell.innerHTML = "<a href=# onclick=EditSite(" + data[idx].CAMPLOT_ID + ") >Edit</button>" + " | " +
                // Can't use query strings with Cache manifest, only service workers
                cell.innerHTML = "<a href=" + urlv + '?CAMPLOT_ID=' + data[idx].CAMPLOT_ID + ">Edit</a>" +  " | " +
                                 "<a href=# onclick=DeleteSite(" + data[idx].CAMPLOT_ID + ") >Delete</button>";
            }
        });
        getRows.fail(function (ex) {
            appendMessage($('ul.errorMessages'), "getRows.fail: " + ex);
        });
    });
    openDB.fail(function (ex) {
        appendMessage($('ul.errorMessages'), "openDB.fail: " + ex);
    });
}
