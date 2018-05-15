//  Supports fetch events to the web server

//  post the contents of the current html form to the server
function post(url) {
    showSpinner();
    $.ajax({
        type: "POST",
        cache: false,
        processData: false,
        url: url,
        data: $('#thisForm').serialize(),
        success: function (formHtml) {
            hideSpinner();
            success(formHtml);
        },
        error: function (xhr) {
            hideSpinner();
            error(xhr);
        }
    });
};

function get(url) {
    showSpinner();
    $.ajax({
        type: "GET",
        cache: false,
        processData: false,
        url: url,
        success: function (formHtml) {
            hideSpinner();
            success(formHtml);
        },
        error: function (xhr) {
            hideSpinner();
            error(xhr);
        }
    });
};

function success(formHtml) {
    $('#RenderBody').html(formHtml);
    var MessagesField = $('#ErrorMessages');
    if (typeof MessagesField === "object") {
        var ErrorMessages = MessagesField.val();
        if (typeof ErrorMessages === "string") {
            if (ErrorMessages.trim().length > 0) {
                MessagesField.removeClass("hide");
                MessagesField.focus();
            }
        }
    }
}

function error(xhr) {
    appendMessage($('ul.Messages'), xhr.responseText);
}

function showSpinner() {
    $("#SpinnerDiv").removeClass("hide");
    $(":button, :checkbox, :reset, select, href, :file").prop("disabled", true);
    $(":input").prop("readonly", true);
}

function hideSpinner() {
    $("#SpinnerDiv").addClass("hide");
    $(":button, :checkbox, :reset, select, href, :file").prop("disabled", false);
    $(":input").prop("readonly", false);
}