var passport           = require('passport');
var mongoose           = require('mongoose');
var aop                = require('./aop');
var about              = require('../app/controllers/about');
var community          = require('../app/controllers/community');
var coffeeHouse        = require('../app/controllers/coffeehouse');
var user               = require('../app/controllers/user');
var welcome            = require('../app/controllers/welcome');
var session            = require('../app/controllers/session');
var User            = mongoose.model('User');

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
    app.get('/auth/twitter/callback', function(req, res, next){
        passport.authenticate('twitter', function(err, user, info) {

            User.findOne({ 'providers.twitter.id': user.providers.twitter.id }, function(err, found) {
                if(err) return next(err);
                if(!found) {
                    req.flash('newUser', JSON.stringify(user) );
                    return res.redirect('/users/new');
                }
                req.login(found, function(err) {
                    if (err) { return next(err); }
                    req.flash('notice', 'ログインしました');
                    return res.redirect('/');
                });
            });
        })(req, res, next);
    });

    app.get('/auth/github', passport.authenticate('github'));
    app.get('/auth/github/callback', function(req, res, next){
        passport.authenticate('github', function(err, user, info) {

            User.findOne({ 'providers.github.id': user.providers.github.id }, function(err, found) {
                if(err) return next(err);
                if(!found) {
                    req.flash('newUser', JSON.stringify(user) );
                    return res.redirect('/users/new');
                }
                req.login(found, function(err) {
                    if (err) { return next(err); }
                    req.flash('notice', 'ログインしました');
                    return res.redirect('/');
                });
            });
        })(req, res, next);
    });
            // passport.authenticate('github', { failureRedirect: '/login' }),
            // function(req, res) {
            //     // Successful authentication, redirect home.
            //     req.flash('notice', 'ログインしました');
            //     res.redirect('/');
            // });

    // User
    app.get('/users'          , user.index);
    app.get('/:username'      , user.show);
    app.get('/users/new'      , user.new);
    app.post('/users'         , user.create);
    app.get('/:username/edit' , user.edit);
    app.put('/:username'      , user.update);
    app.delete('/:username'   , user.destroy);
    app.param('username'      , user.preload);

    // Welcome
    app.get('/', welcome.index);
};

