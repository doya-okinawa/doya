// ViewのRender直前に各Viewで共通的に利用するlocalsを追加する
exports.beforRender = function(req, res, next) {
    var render = res.render;
    res.render = function(view, locals, cb) {
        var notice = req.flash('notice');
        var module = view.replace(/\/.*$/,'');
        var partials = derivePartials( view );
        if (typeof locals == 'object') {
            // 認証情報
            locals.auth = req.auth;
            // 通知
            locals.notice = notice.length > 0 ? notice : '';
            // Viewが利用するassets
            // e.g. 'welcome/index' => 'welcome'
            locals.assets = module;
            // Viewのlayouts
            locals.partials = partials;
        }
        render.call(res, view, locals, cb);
    };
    next();
};

function derivePartials(view) {
    // 'welcome/top/index' -> '....'
    var relativePath = view.split('')
            .reduce(function(memo, char) {
                return char === '/' ? memo +'..': memo;
            }, '');
    return { header: relativePath +'/_partials/header',
             session: relativePath +'/_partials/session',
             footer: relativePath +'/_partials/footer' };
};
