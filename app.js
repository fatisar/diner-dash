
/**
 * Module dependencies.
 */

var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var routes = require('./routes');
var clients = require('./routes/clients')
var dashboard = require('./routes/dashboard')
var food = require('./routes/food')
var menu = require('./routes/menu')
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var mongojs = require('mongojs');
var db = mongojs('mongodb://test:test@ds033669.mongolab.com:33669/dinerdash');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(methodOverride());
app.use(bodyParser());
app.use(cookieParser('your secret here'));
app.use(session());
app.use(express.static(path.join(__dirname, 'public')));


// load up the client's menus and store them globally for nav access
db.collection('menus').find({},{},function(e,menus){
    app.locals.navmenus = menus;
});

app.locals.client = { name: 'Guest' }

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
