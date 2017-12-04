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


/**
 *
 * @return Array of  all Objects with distinctive domain name
 */
exports.findDistinctValues = (req, res) => {
    let arr = [];
    Report.distinct('domain', (err, report) => {
        console.log(report);
        let i = 0;

        let length = 0;
        let l = report.length;

        function call(i) {
            getData(report[i]).then((item) => {

                length = item.length;
                let obj = {item: item[0]["domain"], amount: length};
                arr.push(obj);

                i++;

                if (i < report.length) {
                    call(i);
                } else res.send(arr);
            })
            ;
        }
        call(0);
    })
};

/**
 *
 * @param obj
 * @returns {Promise}
 */

function getData(obj){
    return new Promise((resolve, reject) => {
        Report.find({'domain': obj}, (err, result) => {
            resolve(result);
        });
    })
}


exports.findDistinctReportsByToday = (req, res) => {
    let arr = [];
    let date = new Date();
    let dateformat = dateFormat(date);

    Report.distinct('domain', (err, report) => {
        console.log(report);
        let i = 0;

        let length = 0;
        let l = report.length;

        function call(i) {
            getData(report[i]).then((item) => {

                let object = {};

                let n = 0;

                item.forEach((obj) => {

                    let a =  dateformat.toString().split(' ',4);
                    let b = obj.date.split(' ', 4);

                    if (arraysEqual(a,b)){
                        n= n+1;
                        object = {item: obj["domain"], amount: n};
                    }
                });

                arr.push(object);
                i++;

                if (i < report.length) {
                    call(i);
                } else {
                     res.send(arr);
                }
            })
            ;
        }
        call(0);
    })
};


/**
 *
 * @param obj
 * @param list
 * @returns {boolean}
 */
function containsObject(obj, list) {
    let i;
    for (i = 0; i < list.length; i++) {
        if (list[i] === obj) {
            return true;
        }
    }

    return false;
}

/**
 * Check if two arrays are identical
 * @param arr1
 * @param arr2
 * @returns {boolean}
 */

function arraysEqual(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(let i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }

    return true;
}

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
