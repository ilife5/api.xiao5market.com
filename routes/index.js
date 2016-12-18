var express = require('express');
var router = express.Router();
var WechatAPI = require('wechat-api');
var api = new WechatAPI('wx188f53f66a0ff887', '37bf14bcbb426120e93a7e57c48587d0');
var request = require('request');
var config = require('../config');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'The mall'});
});

router.get('/MP_verify_qPgPGm52uZblZ9wq.txt', function (req, res) {
    res.send("qPgPGm52uZblZ9wq");
});

router.get('/MP_verify_VbkZoUL5iXGX0sAa.txt', function (req, res) {
    res.send("VbkZoUL5iXGX0sAa");
});

module.exports = router;
