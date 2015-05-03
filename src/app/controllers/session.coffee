Promise    = require 'bluebird'
passport   = require 'passport'
Controller = require './controller'


module.exports =
class SessionController extends Controller

  @login: () ->
    Promise.resolve {}

  @logout: () ->
    Promise.resolve {}
