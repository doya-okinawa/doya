passport = require('passport')
AppController = require('./application')


module.exports =
class SessionController extends AppController

  @login: (req, res, next) ->
    res.render 'session/login', title: 'Login'

  @logout: (req, res, next) ->
    req.logout()
    req.flash 'notice', 'ログアウトしました'
    res.redirect '/'
