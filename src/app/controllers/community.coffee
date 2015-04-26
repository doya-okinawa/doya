AppController = require('./application')


module.exports =
class CommunityController extends AppController
  @index: (req, res, next) ->
    res.render 'community/index', title: 'Communities'
