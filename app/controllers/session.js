var passport = require('passport');

var SessionController = {

    login: function(req, res, next) {
        return res.render('session/login', { title: 'Login'});
    },

    logout: function(req, res, next) {
        req.logout();
        req.flash('notice', 'ログアウトしました');
        return res.redirect("/");
    }
};

module.exports = SessionController;
