/**
 * Created by daniel on 3/31/14.
 */

var mongojs = require('mongojs');
var db = mongojs('mongodb://test:test@ds033669.mongolab.com:33669/dinerdash');

exports.load = function(req, res) {
    res.render('menu', {
        menu: req.menu,
        items: req.items
    });
}

exports.loadMenu = function(req, res, next) {
    var menuId = req.params['menuId'];
    db.collection('menus').findOne({id: menuId}, function(err, menu) {
        req.menu = menu;
        next();
    });
}

exports.loadMenuItems = function(req, res, next) {
    var menuId = req.params['menuId'];

    db.collection(menuId).find(function(err, items) {
        req.items = items;
        next();
    });
}

exports.updateMenuItem = function(req, res, next) {
    var menuId = req.params['menuId'];
    var menuItemId = req.params['menuItemId'];

    var updatedMenuItem = req.body;

    db.collection(menuId).update({id:menuItemId}, updatedMenuItem, {upsert: true}, function() {
        console.log("updated item " + menuItemId);
    });
}