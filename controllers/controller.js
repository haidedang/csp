//@TODO const
let url = require('url');
let Report =  require('../models/model');


exports.listAllReports = (req, res) => {
    console.log('request');
    Report.find({}, function(err, report) {
        if (err) res.send(err);
        res.json(report);
    })
};

exports.listAllWebsites = (req,res) => {
    Report.find({}, (err, report) => {
        if (err) res.send (err);
        let result = [];
        report.forEach( (item) => {
           let obj = {};
           obj["document-uri"] = item["document-uri"];
           result.push(obj);
        })
        res.json(result);
    });
};

exports.createReport = (req, res) => {

    let new_report = new Report(extract(req,res));
    new_report.save((err, report) => {
        if (err)
            res.send(err);
        res.json(report);
        console.log(report);
    });
};

// filter reports by HTML input form field
exports.find = (req, res) => {
    const options = {}
    if (req.body.domain) options.domain = req.body.domain;
    if (req.body.document) options.document = req.body.document;
    if (req.body["blocked-uri"]) options["blocked-uri"]= req.body["blocked-uri"];
    if (req.body.violation) options.violation = req.body.violation;
    if (req.body.date) options.date = req.body.date;

    Report.find(options, (err, report) => {
        if (err) res.send(err);
        res.json(report);
    })
};


// get csp Object from Request and extract domain name from URL
//jslint  , prettier
function extract (req, res) {
    let obj ={};


    let document = req.body["document-uri"];
    let blocked = req.body["blocked-uri"];
    let violation  = req.body["violated-directive"];
    let date = new Date().toLocaleString().substr(0,9);  // @TODO date object



    let domain = url.parse(document).hostname;

    obj["domain"] = domain;
    obj["document-uri"] = document;
    obj["blocked-uri"]= blocked;
    obj["violated-directive"]= violation;
    obj["date"]= date;

    return obj;
}
