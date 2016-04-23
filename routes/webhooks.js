var express = require('express');
var router = express.Router();
var mailgunService = require("../service/mailgun");

/* GET users listing. */
router.post('/bughd', function(req, res, next) {
    console.log(req.body);
    mailgunService.send(req.body.user_name, req.body.datas, function(error, body) {
        if(error == null) {
            console.log(body);
            res.send('ok');
        } else {
            console.error(error);
            res.send('on error');
        }

    });

});

module.exports = router;