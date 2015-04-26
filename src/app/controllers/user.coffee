_             = require('lodash')
mongoose      = require('mongoose')
AppController = require('./application')
User          = mongoose.model('User')


module.exports =
class UserController extends AppController

  @preload: (req, res, next, username) ->
    User.findOne { username: username }, (err, user) ->
      if err
        return next(err)
      if user == null
        userNotFound = new Error('Not Found')
        userNotFound.status = 404
        return next(userNotFound)

      req.user = user
      next()

  @index: (req, res, next) ->
    User.find {}, (err, users) ->
      if err
        throw new Error
      res.render 'user/index',
        title: 'Users'
        users: users

  @show: (req, res, next) ->
    res.render 'user/show',
      title: req.user.display_name
      user: req.user

  @new: (req, res, next) ->
    user = JSON.parse(req.flash('newUser'))
    res.render 'user/new',
      title: 'New User'
      user: user
      providers: JSON.stringify(user.providers)

  @create: (req, res, next) ->
    rawUser = req.body
    rawUser.providers = JSON.parse(rawUser.providers)
    user = new User(rawUser)
    user.save (err) ->
      if err
        err.status = 400
        return next(err)
      req.login user, (err) ->
        if err
          return next(err)
        req.flash 'notice', 'ログインしました'
        res.redirect '/'

  @destroy: @needsSession((req, res, next) ->
    user = req.user
    authId = req.auth._doc._id.id
    if user._doc._id.id != authId
      res.status = 403
      req.flash 'notice', 'このユーザを削除する権限がありません'
      return res.redirect('/')
    user.remove (err) ->
      if err
        return next(err)
      req.flash 'notice', 'ユーザを削除しました'
      res.redirect '/users'

  )
