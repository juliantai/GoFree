// Dependencies
var express = require('express')
  , routes  = require('./app/server')
  , http    = require('http')
  , socket  = require('socket.io')
  , path    = require('path')
  , rack    = require('asset-rack');

// Globals
var app     = express();
var server  = http.createServer(app);
var io      = socket.listen(server);
var io      = socket.listen(1488);

// Assets-Rack
var assets = new rack.AssetRack([
    new rack.LessAsset({
        url: '/app.css',
        filename: __dirname + '/public/css/app.less',
        paths: [__dirname + '/public/css'],
        compress: false
    }),

    new rack.SnocketsAsset({
        url: '/libs.js',
        filename: __dirname + '/app/client/libs.js',
        compress: false
    }),
    new rack.SnocketsAsset({
        url: '/app.js',
        filename: __dirname + '/app/client/app.coffee',
        compress: false
    }),

    new rack.JadeAsset({
        url: '/views.js',
        dirname: __dirname + '/views/client',
        separator: '_',
        clientVariable: 'app.templates',
        compress: false
    })
]);

assets.on('complete', function() {
  // Configuration
  app.configure(function() {
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views/server');
    app.set('view engine', 'jade');
    app.locals.pretty = true;
    
    app.use(assets);
    app.use(express.static(__dirname + '/public'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.compress());
  });

  app.configure('development', function(){
    app.use(express.errorHandler());
    app.use(express.logger('dev'));
  });

  // Routes
  app.get('/', routes.index);
  app.get('/about', routes.about);
  app.get('/api/v1/autocomplete/:query', routes.autocomplete);
  app.get('/api/v1/image/:query', routes.image);

  // Stuff
  server.listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
  });
  io.set('log level', 0); 
  io.sockets.on('connection', routes.search);
});



