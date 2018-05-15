/*
 *  The following 3 validatation routines use built in Jquery validation to flag errors as the user types on the screen.
 */
function validateStringField(selector, length) {
    /*
     * For regex, See  http://www.w3schools.com/jsref/jsref_obj_regexp.asp 
     * The regex expression will flag the following characters:  <>;%+    
     */
    jQuery($(selector).rules("add", {
        maxlength: length,
        regex: "^[^<>%;+]{0,}$",
        messages: {
            maxlength: jQuery.validator.format("Max field length is {0} characters"),
            regex: "Unsafe character(s) in field"
        }
    }));
}

function validateInteger(selector) {
    jQuery($(selector).rules("add", {
        digits: true
    }));
}

function validateDate(selector) {
    jQuery($(selector).rules("add", {
        date: true
    }));
}

function ToJavaScriptDate(value) {
    if (value != null) {
        var pattern = /Date\(([^)]+)\)/;
        var results = pattern.exec(value);
        var dt = new Date(parseFloat(results[1]));
        return (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear();
    }
    else return "";
}

function dateWithoutTime(dateTimeString) {
    var pos;
    pos = dateTimeString.indexOf(" ");
    return (dateTimeString.substring(0, pos));
}
