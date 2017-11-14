const express = require('express');
const router = express.Router();

const report = require('../controllers/controller');

// router.post('/', function(req, res){
//         console.log(req.body);
//     });

router.post('/csp', report.createReport);
router.get('/csp', report.listAllReports);
router.get('/website', report.listAllWebsites);
router.post('/test', report.find);

router.get('/', (req, res, next) => {
    console.log('request');
    res.render('table');
});


module.exports = router;
