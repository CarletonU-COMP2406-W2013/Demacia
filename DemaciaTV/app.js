
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


var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

var io = require('socket.io').listen(server);
io.set('log level', 2);



io.sockets.on('connection', function (socket) {
  // Do login stuff here

  socket.emit('news', { hello: 'world' });

  socket.on('login', function (data){
    console.log(data.name);
    accountProvider.save(data);
  });

  socket.on('my other event', function (data) {
    console.log(data);
  });
  socket.on('start-watching', function (data) {
    //mongo.save({channel: data.channel, starttime: Date.now()});
  });
  socket.on('stop-watching', function (data) {
    //mongo.save({channel: data.channel, timeelapsed: Date.now() - oldchannel.starttime});
  });
  socket.on('disconnect', function (data) {
    //Same stuff as stop-watching, plus logout
  });
});




app.get('/', routes.index);

app.get('/db-manager', function(req, res){
    accountProvider.findAll(function(error,result){
        res.render('db-manager.jade', {title: "DB Contents", accounts: result});
    });
});

app.post('/db-manager', function(req,res){
  accountProvider.clearData();
  res.redirect('/post');
});

app.get('/post', function(req, res) {
  res.render('post.jade', {title: "DB Input"});
});

app.post('/post', function(req, res){
  accountProvider.findByName(req.param('input'), function(error, result){
    if(result == null)
      accountProvider.save({
        name: req.param('input')
      });
  });
  res.redirect('/db-manager');
});


app.get('/users', user.list);
