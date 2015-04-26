module.exports = (app) ->
  # catch 404 and forward to error handler       
  app.use (req, res, next) ->
    err = new Error('Not Found')
    err.status = 404
    next err

  ### error handlers ###

  # development error handler
  # will print stacktrace
  if app.get('env') == 'development'
    app.use (err, req, res, next) ->
      if err.code == 11000
        # TODO: 別のusernameできるようにする
        req.flash 'notice', 'すでに登録されているusernameです'
        return res.redirect('/')
      res.status err.status or 500
      res.render 'error/error',
        message: err.message
        error: err
  # production error handler
  # no stacktraces leaked to user
  app.use (err, req, res, next) ->
    if err.code == 11000
      # TODO: 別のusernameできるようにする
      req.flash 'notice', 'すでに登録されているusernameです'
      return res.redirect('/')
    res.status err.status or 500
    res.render 'error/error',
      message: err.message
      error: {}
