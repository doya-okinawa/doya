var aop                = require('./aop');
var about              = require('../app/controllers/about');
var community          = require('../app/controllers/community');
var coffeeHouse        = require('../app/controllers/coffeehouse');
var user               = require('../app/controllers/user');
var welcome            = require('../app/controllers/welcome');
var session            = require('../app/controllers/session');
var passport           = require('passport');

module.exports = function(app) {

    //* MiddleWares */
    app.use(aop.beforRender);

    //* Routes */
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

    app.get('/auth/twitter', passport.authenticate('twitter'));

    app.get('/auth/twitter/callback', 
            passport.authenticate('twitter', { failureRedirect: '/login' }),
            function(req, res) {
                // Successful authentication, redirect home.
                req.flash('notice', 'ログインしました');
                res.redirect('/');
            });
    
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

