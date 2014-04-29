
var Express = require('express'),
	Swig	= require('swig'),
	config 	= require('./config'),
	Application = Express();

Application.configure(function(){

	Application.use(Express.static(__dirname + '/public'));
	Application.set('views', __dirname + '/controllers/views/');
	Application.use(Express.static(__dirname + '/controllers/views/'));
	Application.use('/static/', Express.static(__dirname + '/public/static'));

    //Application.use(Express.favicon(__dirname + '/public/static/images/favicon.ico'));

	Application.use(Express.json());
	Application.use(Express.urlencoded());
	Application.use(Express.methodOverride());
	Application.use(Express.cookieParser(config.cookie.secret));
	Application.use(Express.session({secret: config.session.secret, key: config.session.hash}));

});

require('./controllers/default')(Application, Swig);

Application.configure('development', function(){
	Application.use(Express.errorHandler({ dumpExceptions: true, showStack: true }));
	Application.use(Express.logger({ format: ':method :url' }));
});

Application.configure('production', function(){
    Application.use(Express.errorHandler());
    Application.use(function (err, req, res, next) {
    	res.status(500).sendfile(__dirname + '/views/500.html');
    });
});

var http = require('http').createServer(Application).listen(config.port_protocol);

console.log('\n   [thinkRow user interface loaded] \n   [Listening connection on port] ' + config.port_protocol);
