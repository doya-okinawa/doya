beforRender = require '../middlewares/beforrender'
welcome     = require '../controllers/welcome'
about       = require '../controllers/about'
community   = require '../controllers/community'
coffeehouse = require '../controllers/coffeehouse'
session     = require '../controllers/session'
auth        = require '../controllers/auth'
setting     = require '../controllers/setting'
user        = require '../controllers/user'


module.exports = (app) ->
  #* MiddleWares */
  app.use beforRender

  #* Routes */
  # Root
  app.get '/', (req, res) ->
    welcome.index()
      .then (result) ->
        res.render 'welcome/index', title: 'Express'

  # About
  app.get '/about', (req, res) ->
    about.index()
      .then (result) ->
        res.render 'about/index', title: 'About'

  # Community
  app.get '/communities', (req, res) ->
    community.index()
      .then (result) ->
        res.render 'community/index', title: 'Communities'

  # CoffeHouse
  app.get '/coffeehouses', (req, res) ->
    coffeehouse.index()
      .then (result) ->
        res.render 'coffeehouse/index', title: 'CoffeeHouses'

  # Session
  app.get '/login',  session.login
  app.get '/logout', session.logout

  # Auth
  app.get '/auth/twitter',          auth.twitter
  app.get '/auth/twitter/callback', auth.twitterCallback
  app.get '/auth/github',           auth.github
  app.get '/auth/github/callback',  auth.githubCallback

  # Setting
  app.get '/settings',         setting.index
  app.get '/settings/profile', setting.profile
  app.put '/settings/profile', setting.updateProfile
  app.get '/settings/account', setting.account
  app.put '/settings/account', setting.updateAccount

  # User
  app.get '/users',        user.index
  app.get '/:username',    user.show
  app.get '/users/new',    user.new
  app.post '/users',       user.create
  app.delete '/:username', user.destroy
  app.param 'username',    user.preload
