$(document).ready(function () {
    $('#getList').click(function () {
        loadData();
    });
});
function loadData() {
    var table = document.getElementById("photoTable");
    var row, rowIdx, cell, result;
    $.ajax({
        url: $('#photoControllerHref').prop("href") + "/GetList",
        method: 'get',
        data: { k: $("#k") },
        cache: false,
        contentType: false,
        processData: false,
        success: function (results) {
            for (var idx = 0; idx < results.length; idx++) {
                result = results[idx];
                rowIdx = idx + 1;
                row = table.insertRow(rowIdx);
                cell = row.insertCell(0);
                cell.innerHTML = result.k;
                cell = row.insertCell(1);
                cell.innerHTML = "<a href=" + "http://localhost:55803/z_photo_test/Edit/" + result.k + ">Edit</a>";
                //    var update = UpdateSite(result);
                //    update.done(function (msg) {
                //        rowsAdded += 1;
                //        if (rowsAdded == 10) {
                //            appendMessage($('ul.errorMessages'), rowsAdded + " rows inserted");
                //            checkRowCount();
                //        }
                //    });
                //    update.fail(function (msg) {
                //        appendMessage($('ul.errorMessages'), "database update failed: " + msg);
                //    });
            }
        },
        error: function (response) {
            appendMessage($('ul.errorMessages'), 'checkout.js error response: ' + response.responseText);
        }
    });
}
//# sourceMappingURL=PhotoIndex.js.map