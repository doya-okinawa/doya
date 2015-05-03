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
      .then () ->
        res.render 'welcome/index', title: 'Express'

  # About
  app.get '/about', (req, res) ->
    about.index()
      .then () ->
        res.render 'about/index', title: 'About'

  # Community
  app.get '/communities', (req, res) ->
    community.index()
      .then () ->
        res.render 'community/index', title: 'Communities'

  # CoffeHouse
  app.get '/coffeehouses', (req, res) ->
    coffeehouse.index()
      .then () ->
        res.render 'coffeehouse/index', title: 'CoffeeHouses'

  # Session
  app.get '/login', (req, res) ->
    session.login()
      .then () ->
        res.render 'session/login', title: 'Login'

  app.get '/logout', (req, res) ->
    session.logout()
      .then () ->
        req.logout()
        req.flash 'notice', 'ログアウトしました'
        res.redirect '/'

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
  app.get '/users', (req, res) ->
    user.index()
      .then (users)->
        if users.errors
          throw new Error errors
        res.render 'user/index',
          title: 'Users'
          users: users

  app.get '/:username', (req, res) ->
    user.show()
      .then () ->
        res.render 'user/show',
          title: req.user.display_name
          user: req.user

  app.get '/users/new', (req, res) ->
    userJson = req.flash 'newUser'
    user.new userJson
      .then (user) ->
        res.render 'user/new',
          title: 'New User'
          user: user
          providers: JSON.stringify(user.providers)

  app.post '/users', (req, res, next) ->
    rawUser = req.body
    user.create rawUser
      .then (user) ->
        req.login user, (err) ->
          if err
            return next(err)
          req.flash 'notice', 'ログインしました'
          res.redirect '/'

  app.delete '/:username', user.destroy

  app.param 'username', (req, res, next, username) ->
    user.preload username
      .then (user)->
        if not user
          notFound = new Error 'Not Found'
          notFound.status = 404
          return notFound
        if user.errors
          return next user.errors
        req.user = user
        next()
