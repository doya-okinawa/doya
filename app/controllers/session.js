var passport = require('passport');

var SessionController = {
    login: function(req, res, next) {
        return res.render('session/login', {});
    },
    create: [ passport.authenticate('local', { failureRedirect: '/login', failureFlash: { type: 'notice', message: 'ログインに失敗しました' }}),
              function(req, res, next) {
                  req.flash('notice', 'ログインしました');
                  return res.redirect('/');
              }],
    membersonly: [ function (req, res, next) {
                       if(req.isAuthenticated()) return next();
                       req.flash('notice', 'ログインしてください');
                       return res.redirect("/login");
                   },
                   function(req, res, next) {
                       if(!req.isAuthenticated()) return next();
                       return res.render('session/membersonly', {});
                   }],
    logout: function(req, res, next) {
        req.logout();
        req.flash('notice', 'ログアウトしました');
        return res.redirect("/");
    }
};

module.exports = SessionController;
