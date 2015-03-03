var welcome          = require('./modules/welcome');
var about            = require('./modules/about');
var communities      = require('./modules/communities');
var coffeeHouses     = require('./modules/coffeehouses');
var users            = require('./modules/users');
var userbyname       = require('./modules/userbyname');

module.exports = function(app) {
    app.use('/', welcome);
    app.use('/about', about);
    app.use('/communities', communities);
    app.use('/coffeehouses', coffeeHouses);
    app.use('/users', users);
    app.use('/:username', userbyname);
};
