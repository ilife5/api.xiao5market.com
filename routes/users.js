var express = require('express');
var router = express.Router();
var userService = require('../service/user');

/* GET users listing. */
router.get('/login', function (req, res) {
    res.render('user/login');
});

router.post('/login', function (req, res) {
    userService.login(req.body.name, req.body.pwd, function(err, result) {
        if(!err && result.ret) {
            req.session.login = true;
            res.redirect("/categories")
        } else {
            res.redirect("/users/login")
        }
    });
});

module.exports = router;
