var passport          = require('passport');
var about             = require('../app/controllers/about');
var community         = require('../app/controllers/community');
var coffeeHouse       = require('../app/controllers/coffeehouse');
var user              = require('../app/controllers/user');
var welcome           = require('../app/controllers/welcome');
var session           = require('../app/controllers/session');
var ApplicationHelper = require('../app/helpers/application');

module.exports = function(app) {

    //* Helpers */
    app.use(ApplicationHelper.auth);

    //* Routes */
    // About
    app.get('/about', about.index);

    // Community
    app.get('/communities', community.index);

    // CoffeHouse
    app.get('/coffeehouses', coffeeHouse.index);

    // Session
    app.get('/login'       , session.login);
    app.post('/login'      , passport.authenticate('local', { failureRedirect: '/login' }), session.signin);
    app.get('/membersonly' , session.isLogined, session.membersonly);
    app.get('/logout'      , session.logout);

    // User
    app.get('/users'          , user.index);
    app.get('/:username'      , user.show);
    app.get('/users/new'      , user.new);
    app.post('/users'         , user.create);
    app.get('/:username/edit' , user.edit);
    app.put('/:username'      , user.update);
    app.delete('/:username'   , user.destroy);
    app.param('username'      , user.preload);

    app.get('/', welcome.index);
};

