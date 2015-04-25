Welcome = index: (req, res, next) ->
  res.render 'welcome/index', title: 'Express'
module.exports = Welcome
