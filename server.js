var express = require('express') 
  , fs = require('fs')
  , exec = require('child_process').exec
  , util = require('util')
  , Files = {}
  , passport = require('passport')
  , flash = require('connect-flash')
  , LocalStrategy = require('passport-local').Strategy
  , nib = require('nib')
  ,	ejs = 	require('ejs'); 

	
ejs.open 	= 	'{{'; 
ejs.close 	= 	'}}';


var io;
var socket_listener;
var oneDay 	= 	86400000;
var PORT = process.env.PORT || 8080;
var IPADDRESS = process.env.IP || '127.0.0.1';
server 	= 	express();
server.use(express.compress());

server.configure(function(){
  server.set("view options", {layout: false});  //This one does the trick for rendering static html
  server.engine('html', require('ejs').renderFile); 
  server.use(server.router);
  server.set('view engine', 'html');
  server.set('views', __dirname + "/www");
  server.use(express.static(__dirname + '/www', { maxAge: oneDay }));
  server.use('/varSocketURI.js', function(req, res) {
		var port = argv['websocket-port'];
		var socketURI = port ? ':'+port+'/' : '/';
		res.set('Content-Type', 'text/javascript');
		res.send('var socketURI="'+socketURI+'";');
	});
});

server.all("*", function(req, res, next) {
	var request = req.params[0];
	if((request === "/")||(request === "")) {
		request = "/index.html";
	}
	if((request.substr(0, 1) === "/")&&(request.substr(request.length - 4) === "html")) {
		request = request.substr(1);
		res.render(request);
	} else {
		next();
	}
});

socket_listener = require('http').createServer(server);
socket_listener.listen(PORT, IPADDRESS);

io = require('socket.io').listen(socket_listener);
io.configure(function(){
     io.set('transports', [
     'websocket'
   , 'flashsocket'
   , 'htmlfile'
   , 'xhr-polling'
   , 'jsonp-polling'
 ]);
});

io.sockets.on('connection', function (socket) {	
	io.sockets.emit('connectionMsg', 'This message comes straight from the server via socket.io!');
});

server.listen(PORT);

