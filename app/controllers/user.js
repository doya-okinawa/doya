var _        = require('lodash');
var mongoose = require('mongoose');
var User     = mongoose.model('User');

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
                users: users 
            });
        });
    },
    // GET /:username
    show: function(req, res, next) {
        return res.render('user/show', {
            user: req.user
        });
    },
    // GET /users/new
    new: function(req, res, next) {
        var user = JSON.parse( req.flash('newUser') );
        return res.render('user/new', { user: user});
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
            req.login(user, function(err) {
                if (err) { return next(err); }
                req.flash('notice', 'ログインしました');
                return res.redirect('/');
            });
        });
    },
    // GET /:username/edit
    edit: function(req, res, next) {
        return res.render('user/edit', {
            user: req.user
        });
    },
    // PUT /:username
    update: function(req, res, next) {
        var exUser = req.user;
        var updated = req.body;
        exUser.update(updated, function(err) {
            if(err) {
                err.status = 400;
                return next(err);
            }
            req.flash('notice', 'ユーザを更新しました');
            return res.redirect('/'+ updated.username);
        });
    },
    // DELETE /:username
    destroy: function(req, res, next) {
        var user = req.user;
        user.remove(function(err) {
            if(err) return next(err);
            req.flash('notice', 'ユーザを削除しました');
            return res.redirect('/users');
        });
    }
};

module.exports = UserController;
