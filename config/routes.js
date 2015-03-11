var beforRender = require('./middlewares/beforrender');
var welcome     = require('../app/controllers/welcome');
var about       = require('../app/controllers/about');
var community   = require('../app/controllers/community');
var coffeehouse = require('../app/controllers/coffeehouse');
var session     = require('../app/controllers/session');
var auth        = require('../app/controllers/auth');
var setting     = require('../app/controllers/setting');
var user        = require('../app/controllers/user');

module.exports = function(app) {

    //* MiddleWares */
    app.use(beforRender);

    //* Routes */
    // Root
    app.get('/', welcome.index);

    // About
    app.get('/about', about.index);

    // Community
    app.get('/communities', community.index);

    // CoffeHouse
    app.get('/coffeehouses', coffeehouse.index);

    // Session
    app.get('/login'    , session.login);
    app.post('/login'   , session.create);
    app.get('/logout'   , session.logout);

    // Auth
    app.get('/auth/twitter'          , auth.twitter);
    app.get('/auth/twitter/callback' , auth.twitterCallback);
    app.get('/auth/github'           , auth.github);
    app.get('/auth/github/callback'  , auth.githubCallback);

    // Setting
    app.get('/settings'         , setting.index);
    app.get('/settings/profile' , setting.profile);
    app.put('/settings/profile' , setting.updateProfile);
    app.get('/settings/account' , setting.account);
    app.put('/settings/account' , setting.updateAccount);

    // User
    app.get('/users'          , user.index);
    app.get('/:username'      , user.show);
    app.get('/users/new'      , user.new);
    app.post('/users'         , user.create);
    app.delete('/:username'   , user.destroy);
    app.param('username'      , user.preload);
};
