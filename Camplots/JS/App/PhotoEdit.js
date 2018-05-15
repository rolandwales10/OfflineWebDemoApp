$(document).ready(function () {
    loadData();
    $(function () {
        $('#dropArea').filedrop({
            url: '@Url.Action("UploadFiles")',
            allowedfiletypes: ['image/jpeg', 'image/png', 'image/gif'],
            allowedfileextensions: ['.jpg', '.jpeg', '.png', '.gif'],
            paramname: 'files',
            maxfiles: 5,
            maxfilesize: 5,
            dragOver: function () {
                $('#dropArea').addClass('active-drop');
            },
            dragLeave: function () {
                $('#dropArea').removeClass('active-drop');
            },
            drop: function () {
                $('#dropArea').removeClass('active-drop');
            },
            afterAll: function (e) {
                $('#dropArea').html('file(s) uploaded successfully');
            },
            uploadFinished: function (i, file, response, time) {
                $('#uploadList').append('<li class="list-group-item">' + file.name + '</li>');
            }
        });
    });
    $('#Save').click(function () {
        var pict = document.getElementById('picture');
        srcString = "";
        var img = pict.firstChild;
        if (img.__proto__["Symbol(Symbol.toStringTag)"] === "HTMLImageElement")
            srcString = img.src;
        var model = {
            k: $('#k').val(),
            picture: srcString
        };
    });
});
function loadData() {
    var uri = $('#photoControllerHref').prop("href") + "/GetPhoto";
    appendMessage($('ul.errorMessages'), 'uri: ' + uri);
    var id = document.getElementById("picture");
    var row, rowIdx, cell, result;
    $.ajax({
        type: "GET",
        url: uri,
        data: { k: $("#k").val() },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (results) {
            appendMessage($('ul.errorMessages'), 'PhotoEdit.js success: ' + uri);
            $("#picture").attr("src", results);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            appendMessage($('ul.errorMessages'), 'PhotoEdit.js error response: ' + jqXhr.status + ":" + jqXhr.statusText);
        }
    });
}
//# sourceMappingURL=PhotoEdit.js.map