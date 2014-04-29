var MySQL = require('mysql'),
	Conf  = require('../config.json'),
	Authenticate = {};

Authenticate.check = function(req, res, next)
{
	if(req.session.userID) next();
	else res.redirect('/');
};

module.exports = function(Controller, Swig)
{
	var Templates = __dirname + '/views/';

	/**Connection = MySQL.createConnection(Conf.database);
	Connection.connect(function(err){
		if(err) throw console.log('   [Database] connection err -> ' + err);
		else console.log('   [Database] connection success!')
	});**/

	Controller.get('/', function(req, res){
		return res.send(Swig.renderFile(Templates + 'index.html'));
	});

	Controller.get('/profile', function(req, res){
		return res.send(Swig.renderFile(Templates + 'profile.html', {
				name: 'Manuel Eduardo Garrido Granadillo',
				location: 'Barranquilla, Colombia',
				profile_image: 'https://scontent-b-mia.xx.fbcdn.net/hphotos-prn1/t1.0-9/1013909_10152924931970037_984544349_n.jpg'
			}));
	});

	Controller.get('*', function(req, res){
		res.send('Exception 404: This file no exist.');
	});

	require('./users.js')(Controller, Swig);
};
