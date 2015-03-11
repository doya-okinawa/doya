var passport     = require('passport');
var needsSession = require('./_shared_functions.js').needsSession;

var SettingController = {
    index: needsSession(function(req, res, next) {
        return res.render('setting/index', {
            title: 'Settings',
            user: req.auth
        });
    }),
    profile: needsSession(function(req, res, next) {
        return res.render('setting/profile', {
            title: 'Settings/Profile',
            user: req.auth
        });
    }),
    update: needsSession(function(req, res, next) {
        var exUser = req.auth;
        var updated = req.body;
        exUser.update(updated, function(err) {
            if(err) {
                err.status = 500;
                return next(err);
            }
            req.flash('notice', 'ユーザを更新しました');
            return res.redirect('/settings/profile');
        });
    })
};

module.exports = SettingController;
