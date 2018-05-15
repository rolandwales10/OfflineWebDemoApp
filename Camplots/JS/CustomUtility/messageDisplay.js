function clearMessages(formControl) {
    formControl.empty();
}
function appendMessage(formControl, message) {
    formControl.show()
        .append('<li> ' + message + '</li>');
}
//# sourceMappingURL=messageDisplay.js.map