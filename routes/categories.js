var express = require('express');
var router = express.Router();
var config = require("../config");
var categoriesServies = require("../service/categories");
var ObjectID = require('mongodb').ObjectID;

/* GET home page. */
router.get('/', function (req, res, next) {

    categoriesServies.find({}, function(r) {
        res.render('categories/index', {
            categories: r
        });
    });

});

router.get('/add', function (req, res, next) {
    res.render('categories/add');
});

router.post('/insert', function (req, res) {
    categoriesServies.insert(req.body, function() {
        res.redirect('/categories');
    });
});

router.get('/delete/:id', function (req, res, next) {
    console.log( req.params.id );
    categoriesServies.del(req.params.id, function() {
        res.redirect('/categories');
    });
});

router.get('/edit/:id', function (req, res, next) {
    categoriesServies.find({
        "_id": ObjectID(req.params.id)
    }, function(r) {

        console.log(req.params.id, r);

        res.render('categories/edit', {
            category: r[0],
            id: req.params.id
        });
    });
});

router.post('/edit/:id', function (req, res, next) {

    console.log( req.params.id, req.body );

    categoriesServies.update(req.params.id, req.body, function() {
        res.redirect('/categories');
    });

});


module.exports = router;