Promise    = require 'bluebird'
Controller = require './controller'


module.exports =
class CommunityController extends Controller
  @index: () ->
    Promise.resolve {}
