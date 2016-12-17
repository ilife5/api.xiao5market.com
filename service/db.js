var config = require("../config");
var MongoClient = require('mongodb').MongoClient
    , assert = require('assert');

// Connection URL
var url = 'mongodb://' + config.db.hostname + ':' + config.db.port +
    '/' + config.db.database;

var database;


function excute(method) {

    if(!database) {
        // Use connect method to connect to the server
        MongoClient.connect(url, function (err, db) {
            assert.equal(null, err);
            console.log("Connected successfully to server");
            db.authenticate(config.db.username, config.db.pwd, function() {
                database = db;
                excuteMethod(method);
            });
        });
    } else {
        excuteMethod(method);
    }

}

function excuteMethod(method) {
    method(database, function (excuteCallback) {
        excuteCallback();
    });
}

function close(callback) {
    if (db) {
        db.close(function(err) {
            db = null;
            done(err)
        });
    }
}

exports.close = close;

exports.excute = excute;