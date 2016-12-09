var express = require('express');
var router = express.Router();
var WechatAPI = require('wechat-api');
var api = new WechatAPI('wx40fa2eb9aba9b6c1', '95adbfbafa3aa289125cb5a0e72f5cf9');

/* GET users listing. */
router.get('/jsConfig', function(req, res, next) {
  api.getJsConfig({
    debug: true,
    jsApiList: ['onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone', 'hideAllNonBaseMenuItem', 'closeWindow', 'showMenuItems', 'hideOptionMenu', 'onMenuShareTimeline', 'hideMenuItems'],
    url: decodeURIComponent(req.query.url)
  }, function(s, config) {
    res.jsonp(config);
  });
});

module.exports = router;
