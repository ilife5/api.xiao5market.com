var db = require("./db");
var ObjectID = require('mongodb').ObjectID;
var collection = "categories";

function insert(data, func) {

    data.timestamp = new Date().getTime();

    db.excute(function (db, callback) {
        db.collection(collection).insertOne(data, function (err, r) {
            if (err) {
                console.error(err);
            }
            callback(func);
        });
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

function update(id, data, func) {

    data.updatetime = new Date().getTime();

    db.excute(function (db, callback) {
        db.collection(collection).updateOne({
            "_id": ObjectID(id)
        }, {
            $set: data
        }, function (err) {
            if (err) {
                console.error(err);
            }
            callback(func);
        });
    });
}


exports.insert = insert;
exports.find = find;
exports.del = del;
exports.update = update;