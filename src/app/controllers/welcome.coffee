AppController = require('./application')


module.exports =
class WelComeController extends AppController
    @index: (req, res, next) ->
      res.render 'welcome/index', title: 'Express'
