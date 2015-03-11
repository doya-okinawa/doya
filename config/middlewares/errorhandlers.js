module.exports = function(app) {

    // catch 404 and forward to error handler       
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    /* error handlers */
    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            if(err.code === 11000) {
                // TODO: 別のusernameできるようにする
                req.flash('notice', 'すでに登録されているusernameです');
                return res.redirect('/');
            }
            res.status(err.status || 500);
            return res.render('error/error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        if(err.code === 11000) {
            // TODO: 別のusernameできるようにする
            req.flash('notice', 'すでに登録されているusernameです');
            return res.redirect('/');
        }
        res.status(err.status || 500);
        return res.render('error/error', {
            message: err.message,
            error: {}
        });
    });

};
