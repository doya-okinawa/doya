AppController = require('./application')

module.exports =
class AboutController extends AppController
  @index: (req, res, next) ->
    res.render 'about/index', title: 'About'
