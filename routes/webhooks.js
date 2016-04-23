var express = require('express');
var router = express.Router();
var mailgunService = require("../service/mailgun");

/* GET users listing. */
router.post('/bughd', function(req, res, next) {
    console.log(req.body);
    console.log(req.params);
    /*mailgunService.send({
        subject: "bughd",
        text: ""
    });*/
    res.send('respond with a resource');
});

module.exports = router;