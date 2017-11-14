$(document).ready(function() {
    $('#csp').DataTable( {
        "ajax": {
            "url": "/csp",
            "dataSrc": ""
        },
        "columns": [
            { "data": "domain" },
            { "data": "document-uri" },
            { "data": "blocked-uri" },
            { "data": "violated-directive" },
            { "data": "original-policy"},
            { "data": "date" }
        ]
    } );
} );