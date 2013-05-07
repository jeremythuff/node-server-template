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

server 	= 	express();

var oneDay 	= 	86400000;
server.use(express.compress());

server.configure(function(){
  server.set("view options", {layout: false});  //This one does the trick for rendering static html
  server.engine('html', require('ejs').renderFile); 
  server.use(server.router);
  server.set('view engine', 'html');
  server.set('views', __dirname + "/www");
  server.use(express.static(__dirname + '/www', { maxAge: oneDay }));
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

server.listen(process.env.PORT || 8080);