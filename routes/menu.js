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

    db.collection(menuId).findOne({id: menuItemId}, function(err, item) {
        console.log("err:"+err);
        console.log("val:"+item.ingredients);
    });
    updatedMenuItem.ingredients = null;
    updatedMenuItem.nutrition = null;
    console.log('updated:'+updatedMenuItem.ingredients);

//    db.collection(menuId).update({id:menuItemId}, updatedMenuItem, function() {
//        console.log("updated item " + menuItemId);
//    });
    db.collection(menuId).save(updatedMenuItem, function(err, val) {
        console.log("err:"+err);
        console.log("val:"+val.name);
    });
}