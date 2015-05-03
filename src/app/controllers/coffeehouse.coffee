Promise    = require 'bluebird'
Controller = require './controller'


module.exports =
class CoffeeHouseController extends Controller
  @index: () ->
    Promise.resolve {}
