var express = require('express');
var router = express.Router();
var WechatAPI = require('wechat-api');
var config = require('../config');
var categoriesServies = require("../service/categories");
var commodityServices = require("../service/commodity");
var api = new WechatAPI('wx40fa2eb9aba9b6c1', '95adbfbafa3aa289125cb5a0e72f5cf9');

/* GET users listing. */
router.get('/jsConfig', function (req, res, next) {
    api.getJsConfig({
        debug: true,
        jsApiList: ['onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'hideAllNonBaseMenuItem', 'closeWindow', 'showMenuItems', 'hideOptionMenu', 'onMenuShareTimeline', 'hideMenuItems'],
        url: decodeURIComponent(req.query.url)
    }, function (s, config) {
        res.jsonp(config);
    });
});

router.get('/categories', function (req, res) {
    categoriesServies.find({}, function (categories) {
        res.json(categories);
    });
});

router.get('/commodities/:id', function (req, res) {
    console.log(req.params.id);
    console.log(req.query);

    commodityServices.findBy(req.params.id, req.query.c, req.query.p,
        function (error, commodities) {
            if(!error) {
                res.json(commodities);
            } else {
                res.json(config.http.response.error)
            }
        });
});

module.exports = router;
