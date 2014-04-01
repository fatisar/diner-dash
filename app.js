
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var clients = require('./routes/clients')
var dashboard = require('./routes/dashboard')
var food = require('./routes/food')
var menu = require('./routes/menu')
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var monk = require('monk');
var db = monk('localhost:27017/dinerdash');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


// load up the client's menus and store them globally for nav access
var menuCollection = db.get('menus');
menuCollection.find({},{},function(e,menus){
    app.locals({
        navmenus : menus
    })
});

app.locals({
    client : {
        name: 'Guest'
    }
})

app.get('/', routes.index);
app.get('/food', food.menus);
app.get('/dashboard', dashboard.dashboard)
app.get('/users', user.list);
app.get('/clients', clients.clients(db));
app.get('/newclient', clients.newclient);
app.get('/signin', routes.signin);

app.get('/menu/:menuId', [menu.loadMenu,  menu.loadMenuItems], menu.load);
app.post('/menu/:menuId/update/:menuItemId', [menu.updateMenuItem, menu.loadMenu,  menu.loadMenuItems], menu.load);

app.post('/addclient', clients.addclient(db));

app.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
