var url = require('url');
var Report =  require('../models/model');


exports.list_all_reports = function(req, res) {
    console.log('request');
    Report.find({}, function(err, report) {
        if (err) res.send(err);
        res.json(report);
    })
};

exports.list_all_websites = function(req,res){
    Report.find({}, function(err, report) {
        if (err) res.send (err);
        var result = [];
        report.forEach(function(item){
           var obj = {};
           obj["document-uri"] = item["document-uri"];
           result.push(obj);
        })
        res.json(result);
    });
};

exports.create_a_report = function(req, res) {

    var new_report = new Report(extract(req,res));
    new_report.save(function(err, report) {
        if (err)
            res.send(err);
        res.json(report);
        console.log(report);
    });
};

// filter reports by HTML input form field
exports.find = function(req,res) {
    const options = {}
    if (req.body.domain) options.domain = req.body.domain;
    if (req.body.document) options.document = req.body.document;
    if (req.body["blocked-uri"]) options["blocked-uri"]= req.body["blocked-uri"];
    if (req.body.violation) options.violation = req.body.violation;
    if (req.body.date) options.date = req.body.date;

    Report.find(options, function(err, report){
        if (err) res.send(err);
        res.json(report);
    })
};


// get csp Object from Request and extract domain name from URL
function extract(req,res) {
    var obj ={};


    var document = req.body["document-uri"];
    var blocked = req.body["blocked-uri"];
    var violation  = req.body["violated-directive"];
    var date = new Date().toLocaleString().substr(0,9);



    var domain = url.parse(document).hostname;

    obj["domain"] = domain;
    obj["document-uri"] = document;
    obj["blocked-uri"]= blocked;
    obj["violated-directive"]= violation;
    obj["date"]= date;

    return obj;
}
