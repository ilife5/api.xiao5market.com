var config = require("../conf").mailgun;
var _ = require("underscore");

var api_key = config.api_key;
var domain = config.domain;
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

var data = {
    from: config.from,
    to: config.to
};

exports.send = function(subject, text) {
    mailgun.messages().send(_.extend({}, data, {
        subject: subject,
        text: text
    }), function (error, body) {
        console.log(body);
    });
};