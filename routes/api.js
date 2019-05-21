var express = require('express');
var router = express.Router();
var WechatAPI = require('wechat-api');
var config = require('../config');
var categoriesServies = require("../service/categories");
var commodityServices = require("../service/commodity");
var api = new WechatAPI('wx40fa2eb9aba9b6c1', '95adbfbafa3aa289125cb5a0e72f5cf9');
var qiniu = require('qiniu')
const mac = new qiniu.auth.digest.Mac(config.accessKey, config.secretKey);
const uuidv1 = require('uuid/v1');

const options = {
    scope: 'spread-star-cdn'
};
const putPolicy = new qiniu.rs.PutPolicy(options);
const qnConfig = new qiniu.conf.Config();

const formUploader = new qiniu.form_up.FormUploader(config);
const putExtra = new qiniu.form_up.PutExtra();

const multiparty = require('multiparty')
const fs = require('fs')

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

router.post('/upload', (req, res) => {
    var form = new multiparty.Form();

    form.parse(req);

    form.on('file', function(name,file) {
        console.log(file)
        const uploadToken=putPolicy.uploadToken(mac);
        formUploader.putStream(uploadToken, `/test/${uuidv1()}-${file.originalFilename}`, fs.createReadStream(file.path), putExtra, function(respErr,
                                                                                                                                       respBody, respInfo) {
            if (respErr) {
                throw respErr;
            }
            if (respInfo.statusCode === 200) {
                res.json({
                    "uploaded": 1,
                    "fileName": respBody.key,
                    "url": `http://static.xiao5market.com/${respBody.key}`,
                    "resp": respBody
                })
            } else {
                res.json({
                    "uploaded": 0,
                    "error": respBody
                })
            }
        });
    });
});

module.exports = router;
