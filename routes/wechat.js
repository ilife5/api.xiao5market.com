var express = require('express');
var router = express.Router();
var WechatAPI = require('wechat-api');
var config = require('../config');
var token = "xxxxxxxx";
var sha1 = require("sha1");
var axios = require("axios");
const {
    wechat: {
        AppID,
        AppSecret
    }
} = config;
const appId = AppID;
const SECRET = AppSecret;
let local_token = "";

axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${AppID}&secret=${AppSecret}`)
    .then(function(response) {
        const {
            data
        } = response;
        const {
            access_token,
            errCode,
        } = data;

        local_token = access_token;

        console.log('client_credential', data);
    });

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

router.get('/auth', function (req, res) {
    console.log(req.query);
    //code=CODE&state=STATE。
    const {
        code, state
    } = req.query;

    //
    axios.get(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appId}&secret=${SECRET}&code=${code}&grant_type=authorization_code`)
        .then(function(response) {
            const {
                data, status, statusText, headers, config
            } = response;
            const {
                access_token,
                openid,
                errCode,
            } = data;
            console.log('access_token', data);
            if (errCode) {
                res.json({
                    data, status, statusText, headers, config
                });
            } else {
                axios.get(`https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`).then((response) => {
                    const {
                        data
                    } = response;
                    console.log('clientUserInfo', data);

                    axios.get(`https://api.weixin.qq.com/cgi-bin/user/info?access_token=${local_token}&openid=${openid}&lang=zh_CN`).then(response => {
                        console.log('serverUserInfo', response.data);
                        res.json({
                            clientUserInfo: data,
                            serverUserInfo: response.data
                        });
                    });
                })
            }
        });
});

router.get('/index', function (req, res) {
    res.render('wechat/index', {
        AppSecret,
        AppID
    });
});

module.exports = router;
