Promise    = require 'bluebird'
Controller = require './controller'


module.exports =
class WelComeController extends Controller
  @index: () ->
    Promise.resolve {}
