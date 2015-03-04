var mongoose = require('mongoose');

var SessionController = {
    login: function(req, res, next) {
        return res.render('session/login');
    },
    signin: function(req, res, next) {
        return res.redirect('/');
    },
    membersonly: function(req, res, next) {
        if(!req.isAuthenticated()) return next();
        return res.render('session/membersonly', { user: req.user});
    },
    logout: function(req, res, next) {
        req.logout();
        return res.redirect("/");
    },
    isLogined: function(req, res, next) {
        if(req.isAuthenticated()) return next();
        return res.redirect("/login");
    }
};

module.exports = SessionController;
