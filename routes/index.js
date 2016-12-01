var express = require('express');
var router = express.Router();
var WechatAPI = require('wechat-api');
var api = new WechatAPI('wx188f53f66a0ff887', '37bf14bcbb426120e93a7e57c48587d0');
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  api.getJsConfig({
    debug: true,
    jsApiList: ['onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone', 'hideAllNonBaseMenuItem', 'closeWindow', 'showMenuItems', 'hideOptionMenu', 'onMenuShareTimeline', 'hideMenuItems'],
    url: 'http://api.xiao5market.com/'
  }, function(s, config) {
    console.log(arguments);
    res.render('index', { title: 'Express', config: config});
  });
});

router.get('/foo/bar', function(req, res, next) {
  request('http://api.xiao5market.com/api/jsConfig?url=' + encodeURIComponent("http://api.xiao5market.com/foo/bar"), function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body);
      res.render('index', { title: 'Express', config: eval('(' + body + ')')});
    } else {
      console.log(error);
    }
  });

});

router.get('/MP_verify_qPgPGm52uZblZ9wq.txt', function(req, res) {
  res.send("qPgPGm52uZblZ9wq");
});

module.exports = router;
