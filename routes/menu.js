/**
 * Created by daniel on 3/31/14.
 */

var mongojs = require('mongojs');
var db = mongojs('dinerdash');

exports.load = function(req, res) {
    res.render('menu', {
        menu: req.menu,
        items: req.items
    });
}

exports.loadMenu = function(req, res, next) {
    var menuId = req.params['menuId'];
    db.collection('menus').findOne({id: menuId}, function(err, menu) {
        console.log("menu:" + JSON.stringify(menu));
        req.menu = menu;
        next();
    });
}

exports.loadMenuItems = function(req, res, next) {
    var menuId = req.params['menuId'];

    db.collection(menuId).find(function(err, items) {
        console.log("menu item:" + JSON.stringify(items));
        req.items = items;
        next();
    });
}