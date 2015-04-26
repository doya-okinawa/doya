module.exports =
class AppController
    @needsSession: (callback) ->
        (req, res, next) ->
            if req.isAuthenticated()
              return callback(req, res, next)
            req.flash 'notice', 'ログインしてください'
            res.redirect '/login'
