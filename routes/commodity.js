var express = require('express');
var router = express.Router();
var config = require("../config");
var commodityServices = require("../service/commodity");
var categoriesServies = require("../service/categories");
var ObjectID = require('mongodb').ObjectID;
var util = require("util");
var fs = require("fs");

/* GET home page. */
router.get('/', listRender);
router.get('/category/:id', listRender);

/* Get add Page */
router.get('/add', renderAdd);
router.get('/add/:categoryId', renderAdd);

router.post('/insert', function (req, res) {
    commodityServices.insert(req, function() {
        res.redirect('/commodity');
    });
});

router.get('/delete/:id', function (req, res, next) {
    commodityServices.del(req.params.id, function() {
        res.redirect('/commodity');
    });
});

router.get('/edit/:id', function (req, res, next) {
    categoriesServies.find({}, function(categories) {
        commodityServices.find({
            "_id": ObjectID(req.params.id)
        }, function(r) {

            console.log(req.params.id, r);

            res.render('commodity/edit', {
                commodity: r[0],
                categories: categories,
                id: req.params.id
            });
        });
    });
});

router.post('/edit/:id', function (req, res, next) {

    console.log( req.params.id, req.body );

    commodityServices.update(req.params.id, req, function() {
        res.redirect('/commodity');
    });

});

function listRender(req, res) {

    var requestParam = {};

    if(req.params.id) {
        requestParam["category"] = req.params.id;
    }

    categoriesServies.find({}, function(categories) {
        commodityServices.find(requestParam, function(commodities) {

            console.log(commodities, categories);

            res.render('commodity/index', {
                categoryId: req.params.id,
                commodities: commodities,
                categories: categories
            });
        });
    });
}

function renderAdd(req, res) {

    categoriesServies.find({}, function(categories) {
        res.render('commodity/add', {
            categoryId: req.params.categoryId,
            categories: categories
        });
    });

}

module.exports = router;