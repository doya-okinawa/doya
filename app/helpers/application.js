var ApplicationHelper = {
    // View内でauth:認証情報を参照できるようにする
    auth: function(req, res, next) {
        var render = res.render;
        res.render = function(view, locals, cb) {
            if (typeof locals == 'object') locals.auth = req.auth;
            render.call(res, view, locals, cb);
        };
        next();
    }
};

module.exports = ApplicationHelper;
