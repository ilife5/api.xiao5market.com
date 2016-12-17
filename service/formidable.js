var formidable = require("formidable");

exports.parseForm = function (req) {
    var cacheFolder = 'public/images/uploadcache/';
    var form = new formidable.IncomingForm();

    form.uploadDir = cacheFolder;
    form.encoding = 'utf-8';
    form.keepExtensions = true;

    form.on("error", function (r) {
        console.log("error", r);
    });

    form.parse(req);

    return form;
};