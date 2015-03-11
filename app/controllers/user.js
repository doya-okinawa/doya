var _            = require('lodash');
var mongoose     = require('mongoose');
var User         = mongoose.model('User');
var needsSession = require('./_shared_functions.js').needsSession;

var UserController = {
    // Preload user by :username then set to req.user
    preload: function(req, res, next, username) {
        User.findOne({ username: username},function(err, user) {
            if(err) return next(err);
            if(user === null) {
                var userNotFound = new Error('Not Found');
                userNotFound.status = 404;
                return next(userNotFound);
            }
            req.user = user;
            return next();
        });
    },
    // GET /users
    index: function(req, res, next) {
        User.find({},function(err, users) {
            if(err) throw new Error();
            res.render('user/index', {
                title: 'Users',
                users: users 
            }); 
        });
    },
    // GET /:username
    show: function(req, res, next) {
        return res.render('user/show', {
            title: req.user.display_name,
            user: req.user
        });
    },
    // GET /users/new
    new: function(req, res, next) {
        var user = JSON.parse( req.flash('newUser') );
        return res.render('user/new', {
            title: 'New User',
            user: user,
            providers: JSON.stringify( user.providers )});
    },
    // POST /users
    create: function(req, res, next) {
        var rawUser = req.body;
        rawUser.providers = JSON.parse( rawUser.providers );
        var user = new User(rawUser);
        user.save(function(err) {
            if(err) {
                err.status = 400;
                return next(err);
            }
            return req.login(user, function(err) {
                if (err) { return next(err); }
                req.flash('notice', 'ログインしました');
                return res.redirect('/');
            });
        });
    },
    // DELETE /:username
    destroy: needsSession(function(req, res, next) {
        var user = req.user;
        var authId = req.auth._doc._id.id;
        if(user._doc._id.id !== authId) {
            res.status = 403;
            req.flash('notice', 'このユーザを削除する権限がありません');
            return res.redirect('/');
        }
        user.remove(function(err) {
            if(err) return next(err);
            req.flash('notice', 'ユーザを削除しました');
            return res.redirect('/users');
        });
    })
};

module.exports = UserController;
