var express = require('express');
var router = express.Router();

var report = require('../controllers/controller');

// router.post('/', function(req, res){
//         console.log(req.body);
//     });

router.post('/csp', report.create_a_report);
router.get('/csp', report.list_all_reports);
router.get('/website', report.list_all_websites);

router.get('/', function(req, res, next){
    res.render('index');
});

router.post('/filter', function(req, res, next){
    const domain = req.body.domain;
    const document = req.body.document;
    const violation = req.body.violation;
    const date = req.body.date;



});

module.exports = router;
