$(document).ready(function () {
    $('#getList').click(function () {
        console.log('get list');
        loadData();
    });
});
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
    console.log("href = " + urlv);
    urlv += "/Edit/";
    var openDB = OpenCamplotsOfflineDB();
    openDB.done(function () {
        var getRows = getAll(sitesStore);
        getRows.done(function (data) {
            var count = table.rows.length;
            appendMessage($('ul.errorMessages'), "Row count is " + data.length);
            // delete every row except for the header
            for (idx = 1; idx < count; idx++) {
                table.deleteRow(-1); // delete the last remaining row
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
                cell.innerHTML = "<a href=" + urlv + data[idx].CAMPLOT_ID + ">Edit</a>";
            }
        });
        getRows.fail(function (e) {
            console.log('get rows before error: ' + e);
        });
    });
}
//# sourceMappingURL=sitesIndex.js.map