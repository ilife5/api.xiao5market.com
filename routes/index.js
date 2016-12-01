var express = require('express');
var router = express.Router();
var WechatAPI = require('wechat-api');
var api = new WechatAPI('wx188f53f66a0ff887', '37bf14bcbb426120e93a7e57c48587d0');

/* GET home page. */
router.get('/', function(req, res, next) {
  api.getJsConfig({
    debug: true,
    jsApiList: ['onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone', 'hideAllNonBaseMenuItem', 'closeWindow', 'showMenuItems', 'hideOptionMenu', 'onMenuShareTimeline', 'hideMenuItems'],
    url: 'http://www.xiao5market.com/'
  }, function(s, config) {
    console.log(arguments);
    res.render('index', { title: 'Express', config: config});
  });
});

router.get('/MP_verify_qPgPGm52uZblZ9wq.txt', function(req, res) {
  res.send("qPgPGm52uZblZ9wq");
});

module.exports = router;
