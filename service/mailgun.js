var config = require("../conf").mailgun;
var _ = require("underscore");
var jade = require("jade");
var path = require("path");

var api_key = config.api_key;
var domain = config.domain;
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

var data = {
    from: config.from,
    to: config.to
};

exports.send = function(subject, text, callback) {

    var html = jade.renderFile(path.join(__dirname, "../public/template/mail.jade"), {
        datas: text
    });

    mailgun.messages().send(_.extend({}, data, {
        subject: subject,
        html: html
    }), callback);
};