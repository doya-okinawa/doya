Promise    = require 'bluebird'
_          = require 'lodash'
Controller = require './controller'
User       = require '../models/user'


module.exports =
class UserController extends Controller

  @preload: (username) ->
    User.findOne username: username
      .exec()

  @index: () ->
    User.find()
      .exec()

  @show: () ->
    Promise.resolve {}

  @new: (userJson) ->
    user = JSON.parse userJson
    Promise.resolve user

  @create: (rawUser) ->
    new Promise (resolve, reject) ->
      rawUser.providers = JSON.parse(rawUser.providers)
      newUser = new User(rawUser)
      newUser.save (err, item, numberAffected) ->
        if err
          reject err
        resolve item, numberAffected

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
