AppController = require('./application')

module.exports =
class CoffeeHouseController extends AppController
  @index: (req, res, next) ->
    res.render 'coffeehouse/index', title: 'CoffeeHouses'
