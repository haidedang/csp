/**
 * ------CONTROLLER --------
 *  providing methods to interact with database
 */

const url = require('url');
const Report = require('../models/model');
const dateFormat = require('dateformat');


exports.listAllReports = (req, res) => {
    console.log('request');
    Report.find({}, function (err, report) {
        if (err) res.send(err);
        res.json(report);
    })
};

exports.listAllWebsites = (req, res) => {
    Report.find({}, (err, report) => {
        if (err) res.send(err);
        let result = [];
        report.forEach((item) => {
            let obj = {};
            obj["document-uri"] = item["document-uri"];
            result.push(obj);
        })
        res.json(result);
    });
};

exports.createReport = (req, res) => {

    let new_report = new Report(extract(req, res));
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
    if (req.body["blocked-uri"]) options["blocked-uri"] = req.body["blocked-uri"];
    if (req.body.violation) options.violation = req.body.violation;
    if (req.body.date) options.date = req.body.date;

    Report.find(options, (err, report) => {
        if (err) res.send(err);
        res.json(report);
    })
};



function extract(req, res) {
    let obj = {};


    let document = req.body["csp-report"]["document-uri"];
    let blocked = req.body["csp-report"]["blocked-uri"];
    let violation = req.body["csp-report"]["violated-directive"];
    let original = req.body["csp-report"]["original-policy"];
    let date = new Date();
    // let date = new Date().toLocaleString().substr(0,9);
    // @TODO date object


    let domain = url.parse(document).hostname;

    obj["domain"] = domain;
    obj["document-uri"] = document;
    obj["blocked-uri"] = blocked;
    obj["violated-directive"] = violation;
    obj["original-policy"] = original;
    obj["date"] = dateFormat(date);

    return obj;
}
