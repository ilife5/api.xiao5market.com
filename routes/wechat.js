var express = require('express');
var router = express.Router();
var WechatAPI = require('wechat-api');
var config = require('../config');
var token = "xxxxxxxx";
var sha1 = require("sha1");

function sign (req) {
  var q = req.query;
  var signature = q.signature;
  var nonce = q.nonce;
  var timestamp = q.timestamp;
  var echostr = q.echostr;

   var str = [token, timestamp, nonce].sort().join('');  
   var sha = sha1(str);

  console.log(sha);
  console.log(signature);
  if( sha == signature ) return echostr;  
}

router.get('/server', function (req, res) {
    console.log("/wechatAPI");
    console.log("req", req.query);
    res.send(sign(req));
});

module.exports = router;
