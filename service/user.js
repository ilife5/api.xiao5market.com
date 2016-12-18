var db = require("./db");
var collection = "user";

function login(name, pwd, parentCallback) {

    db.excute(function (db, callback) {
        db.collection(collection).find({
            "name": name,
            "pwd": require('crypto')
                .createHash('sha256')
                .update(pwd)
                .digest('hex')
        }).toArray(function (err, r) {

            callback(function () {
                parentCallback(err, {
                    ret: r.length > 0
                });
            });

        });

    });
}


exports.login = login;