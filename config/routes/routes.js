var about            = require('./modules/about');
var communities      = require('./modules/communities');
var coffeeHouses     = require('./modules/coffeehouses');
var users            = require('./modules/users');
var welcome          = require('./modules/welcome');
var sessions         = require('./modules/sessions');

module.exports = function(app) {
    app.use('/about', about);
    app.use('/communities', communities);
    app.use('/coffeehouses', coffeeHouses);
    app.use('/', sessions); //=> /login, /logout, /membersonly
    app.use('/', users); //=> /:username, /users
    app.use('/', welcome);
};
