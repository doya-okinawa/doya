var aop                = require('./aop');
var about              = require('../app/controllers/about');
var community          = require('../app/controllers/community');
var coffeeHouse        = require('../app/controllers/coffeehouse');
var user               = require('../app/controllers/user');
var welcome            = require('../app/controllers/welcome');
var session            = require('../app/controllers/session');
var auth               = require('../app/controllers/auth');

module.exports = function(app) {

    //* MiddleWares */
    app.use(aop.beforRender);

    //* Routes */

    // Root
    app.get('/', welcome.index);

    // About
    app.get('/about', about.index);

    // Community
    app.get('/communities', community.index);

    // CoffeHouse
    app.get('/coffeehouses', coffeeHouse.index);

    // Session
    app.get('/login'       , session.login);
    app.post('/login'      , session.create);
    app.get('/membersonly' , session.membersonly);
    app.get('/logout'      , session.logout);

    // Auth
    app.get('/auth/twitter', auth.twitter);
    app.get('/auth/twitter/callback', auth.twitterCallback);
    app.get('/auth/github', auth.github);
    app.get('/auth/github/callback', auth.githubCallback);

    // User
    app.get('/users'          , user.index);
    app.get('/:username'      , user.show);
    app.get('/users/new'      , user.new);
    app.post('/users'         , user.create);
    app.get('/:username/edit' , user.edit);
    app.put('/:username'      , user.update);
    app.delete('/:username'   , user.destroy);
    app.param('username'      , user.preload);
};

