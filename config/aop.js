var AOP = {
    // ViewのRender直前に認証情報(auth)・通知(notice)をセットする
    beforRender: function(req, res, next) {
        var render = res.render;
        res.render = function(view, locals, cb) {
            var notice = req.flash('notice');
            if (typeof locals == 'object') {
                locals.auth = req.auth;
                locals.notice = notice.length > 0 ? notice : '';
            }
            render.call(res, view, locals, cb);
        };
        next();
    }
};

module.exports = AOP;
