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
            title: 'Profile/Setting',
            user: req.auth
        });
    }),
    updateProfile: updateAndRedirect('/settings/profile'),
    account: needsSession(function(req, res, next) {
        return res.render('setting/account', {
            title: 'Account/Setting',
            user: req.auth
        });
    }),
    updateAccount: updateAndRedirect('/settings/account')
};

function updateAndRedirect(redirectTo) {
    return needsSession(function(req, res, next) {
        var exUser = req.auth;
        var updated = req.body;
        exUser.update(updated, function(err) {
            if(err) {
                err.status = 500;
                return next(err);
            }
            req.flash('notice', 'ユーザを更新しました');
            return res.redirect(redirectTo);
        });
    });
}

module.exports = SettingController;
