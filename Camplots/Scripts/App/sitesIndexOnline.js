$(document).ready(function () {
    /*
     *  Display a list of sites from the server.
     */
    var url = $('#appRootHref').prop("href") + "/sites/IndexOnline";
    get();
});
