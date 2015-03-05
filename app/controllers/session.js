var SessionController = {
    login: function(req, res, next) {
        return res.render('session/login', {});
    },
    new: function(req, res, next) {
        req.flash('notice', 'ログインしました');
        return res.redirect('/');
    },
    membersonly: function(req, res, next) {
        if(!req.isAuthenticated()) return next();
        return res.render('session/membersonly', {});
    },
    logout: function(req, res, next) {
        req.logout();
        req.flash('notice', 'ログアウトしました');
        return res.redirect("/");
    },
    isLogined: function(req, res, next) {
        if(req.isAuthenticated()) return next();
        req.flash('notice', 'ログインしてください');
        return res.redirect("/login");
    }
};

module.exports = SessionController;
