passport   = require 'passport'
Controller = require './controller'


module.exports =
class SessionController extends Controller

  @login: (req, res, next) ->
    res.render 'session/login', title: 'Login'

  @logout: (req, res, next) ->
    req.logout()
    req.flash 'notice', 'ログアウトしました'
    res.redirect '/'
