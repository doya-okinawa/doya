var AOP = {
    // ViewのRender直前に認証情報(auth)・通知(notice)・assetsをセットする
    beforRender: function(req, res, next) {
        var render = res.render;
        res.render = function(view, locals, cb) {
            var notice = req.flash('notice');
            var module = view.replace(/\/.*$/,'');
            if (typeof locals == 'object') {
                locals.auth = req.auth;
                locals.notice = notice.length > 0 ? notice : '';
                locals.assets = module;
            }
            render.call(res, view, locals, cb);
        };
        next();
    }
};

module.exports = AOP;
