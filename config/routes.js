var aop         = require('./aop');
var welcome     = require('../app/controllers/welcome');
var about       = require('../app/controllers/about');
var community   = require('../app/controllers/community');
var coffeehouse = require('../app/controllers/coffeehouse');
var session     = require('../app/controllers/session');
var setting     = require('../app/controllers/setting');
var auth        = require('../app/controllers/auth');
var user        = require('../app/controllers/user');

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
    app.get('/coffeehouses', coffeehouse.index);

    // Session
    app.get('/login'    , session.login);
    app.post('/login'   , session.create);
    app.get('/logout'   , session.logout);

    // Setting
    app.get('/settings'         , setting.index);
    app.get('/settings/profile' , setting.profile);
    app.put('/settings/profile' , setting.update);

    // Auth
    app.get('/auth/twitter'          , auth.twitter);
    app.get('/auth/twitter/callback' , auth.twitterCallback);
    app.get('/auth/github'           , auth.github);
    app.get('/auth/github/callback'  , auth.githubCallback);

    // User
    app.get('/users'          , user.index);
    app.get('/:username'      , user.show);
    app.get('/users/new'      , user.new);
    app.post('/users'         , user.create);
    app.delete('/:username'   , user.destroy);
    app.param('username'      , user.preload);
};
