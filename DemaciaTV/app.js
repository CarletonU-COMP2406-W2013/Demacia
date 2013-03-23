
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , stylus = require('stylus')
  , nib = require('nib')
  , AccountProvider = require('./accountprovider-mongodb').AccountProvider;

var app = express();

var accountProvider = new AccountProvider('localhost', 27017);

app.configure(function(){
  app.set('port', process.env.PORT || 80);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon(__dirname + '/public/images/favicon.ico', { maxAge: 2592000000 }));
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(stylus.middleware({
    src: __dirname + '/public',
    compile: compile
  }));
  app.use(express.static(path.join(__dirname, 'public')));
});

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .set('compress', true)
    .use(nib());
}

app.configure('development', function(){
  app.use(express.errorHandler());
});



app.get('/', routes.index);
app.post('/', function(req, res){
  accountProvider.save({
    name: req.body.name
  });
  console.log("app.post('/') success [" + req.body.name +"]");
});


app.get('/get', function(req, res){
    accountProvider.findAll(function(error,result){
        res.render('get.jade', {title: "DB Contents", accounts: result});
    });
});

app.post('/get', function(req,res){
  accountProvider.clearData();
  res.redirect('/post');
});

app.get('/post', function(req, res) {
  res.render('post.jade', {title: "DB Input"});
});

app.post('/post', function(req, res){
  accountProvider.save({
    name: res.param('input')
  });
  res.redirect('/get');
});


app.get('/users', user.list);





http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
