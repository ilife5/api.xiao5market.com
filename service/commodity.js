var db = require("./db");
var config = require("../config");
var ObjectID = require('mongodb').ObjectID;
var collection = "commodity";
var util = require("util");
var fs = require("fs");
var formidable = require("./formidable");

function insert(req, func) {

    getCommodityFromForm(req, function (commodity) {
        db.excute(function (db, callback) {
            commodity.timestamp = new Date().getTime();
            db.collection(collection).insertOne(commodity, function (err) {
                if (err) {
                    console.error(err);
                }
                callback(func);
            });
        });
    });
}

function del(id, delCallback) {

    db.excute(function (db, callback) {
        db.collection(collection).deleteOne({"_id": ObjectID(id)}, function (err, r) {

            if (err) {
                console.error(err);
            }

            callback(delCallback);

        });

    });
}

function update(id, req, func) {
    getCommodityFromForm(req, function (commodity) {

        commodity.updatetime = new Date().getTime();

        db.excute(function (db, callback) {
            db.collection(collection).updateOne({
                "_id": ObjectID(id)
            }, {
                $set: commodity
            }, function (err) {
                if (err) {
                    console.error(err);
                }
                callback(func);
            });
        });
    });

}

function getCommodityFromForm(req, callback) {

    var commodity = {};

    var form = formidable.parseForm(req);

    form
        .on('field', function (field, value) {
            console.log(field, value);
            commodity[field] = value;
        })
        .on('file', function (field, file) {

            var extName = ''; //后缀名
            switch (file.type) {
                case 'image/pjpeg':
                    extName = 'jpg';
                    break;
                case 'image/jpeg':
                    extName = 'jpg';
                    break;
                case 'image/png':
                    extName = 'png';
                    break;
                case 'image/x-png':
                    extName = 'png';
                    break;
            }

            if (extName) {
                commodity[field] = file.path.replace("public/", "");
            } else {
                fs.unlink(file.path);
            }
        })
        .on('end', function () {
            console.log('-> upload done');
            callback(commodity);
        });
}

function find(data, findCallback) {
    db.excute(function (db, callback) {
        db.collection(collection).find(data).toArray(function (err, r) {

            if (err) {
                console.error(err);
            }

            callback(function () {
                findCallback(r);
            });

        });

    });
}

//根据条件和分页查询
function findBy(channel, current, page, parentCallback) {

    var findParams = {};

    if (channel != "new" && channel != "hot") {
        findParams["category"] = channel;
    }
    current = current? current: 1;

    db.excute(function (db, callback) {
        db.collection(collection).find(findParams)
            .sort({
                timestamp: -1
            })
            .skip((current - 1) * page)
            .limit(parseInt(page || config.query.page, 10))
            .toArray(function (err, commodities) {

                console.log("commodities", commodities);

                callback(function () {
                    parentCallback(err, commodities);
                });

            });

    });
}


exports.insert = insert;
exports.find = find;
exports.findBy = findBy;
exports.del = del;
exports.update = update;