$(document).ready(function () {
    var messagesField = $("#messages");
    var messages = messagesField.val();
    if (messages.length > 0) {
        messagesField.removeClass("hide");
        messagesField.focus();
    }
    else
        year.focus();
    symbolAutocomplete(fromSymbolField);
    symbolAutocomplete(toSymbolField);
    onSymbolChange(fromSymbolField);
    onSymbolChange(toSymbolField);
    if ($(fromSymbolField).val().length > 0)
        updateSymbolImage(fromSymbolField);
    if ($(toSymbolField).val().length > 0)
        updateSymbolImage(toSymbolField);
    $('#lakeName').autocomplete({
        delay: 500,
        minLength: 0,
        source: function (request, response) {
            var thisUrl = urlForController + "/getLakeNames";
            $.ajax({
                url: thisUrl,
                type: "GET",
                dataType: "json",
                data: { term: request.term },
                success: function (data) {
                    response($.map(data, function (item) {
                        return { value: item.value };
                    }));
                }
            });
        },
        messages: {
            noResults: '',
            results: function () { }
        }
    });
}); /* $(document).ready */
function onSymbolChange(fieldName) {
    $(fieldName).change(function () {
        updateSymbolImage(fieldName);
    });
}
function updateSymbolImage(fieldName) {
    var thisUrl = urlForController + "/getGPSImage";
    $.ajax({
        type: "GET",
        url: thisUrl,
        data: { symbol: $(fieldName).val() },
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (results) {
            $(fieldName + "Image").attr("src", results);
        },
        error: function (jqXhr, textStatus, errorThrown) {
            $("#messages").val("get Symbol Image: Error " + jqXhr.status + ":" + jqXhr.statusText);
        }
    });
}
function symbolAutocomplete(fieldName) {
    $(fieldName).autocomplete({
        delay: 500,
        minLength: 0,
        source: function (request, response) {
            var thisUrl = urlForController + "/getImageNames";
            $.ajax({
                url: thisUrl,
                type: "GET",
                dataType: "json",
                data: { imageName: request.term },
                success: function (data) {
                    response($.map(data, function (item) {
                        return { value: item.imageName };
                    }));
                }
            });
        },
        _renderItem: function (ul, item) {
            return $("<li>")
                .attr({ "data-value": item.imageName, "background-color": "green" })
                .append(item.label)
                .appendTo(ul);
        },
        select: function (event, ui) {
            $(fieldName).val(ui.item.value);
            updateSymbolImage(fieldName);
        }, messages: {
            noResults: '',
            results: function () { }
        }
    });
    $(".custom-combobox a").click(function (e) {
        var id = $(this).attr('id'); // get the id of the combobox control
        var ln = id.length;
        if (ln > 6) {
            var listId = "#" + id.substring(0, ln - 6);
            $(listId).autocomplete("search", "");
        }
        else
            alert("error: the following html control id is too short: " + id);
    });
}
//# sourceMappingURL=GlobalReplace.js.map