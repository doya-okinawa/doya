exports.needsSession = function needsSession(callback) {
    return function(req, res, next) {
        if(req.isAuthenticated()) return callback(req, res, next);
        req.flash('notice', 'ログインしてください');
        return res.redirect("/login");
    };
};
