passport = require('passport')
needsSession = require('./_shared_functions.js').needsSession
SettingController = 
  index: needsSession((req, res, next) ->
    res.render 'setting/index',
      title: 'Settings'
      user: req.auth
  )
  profile: needsSession((req, res, next) ->
    res.render 'setting/profile',
      title: 'Profile/Setting'
      user: req.auth
  )
  updateProfile: updateAndRedirect('/settings/profile')
  account: needsSession((req, res, next) ->
    res.render 'setting/account',
      title: 'Account/Setting'
      user: req.auth
  )
  updateAccount: updateAndRedirect('/settings/account')

updateAndRedirect = (redirectTo) ->
  needsSession (req, res, next) ->
    exUser = req.auth
    updated = req.body
    exUser.update updated, (err) ->
      if err
        err.status = 500
        return next(err)
      req.flash 'notice', 'ユーザを更新しました'
      res.redirect redirectTo
    return

module.exports = SettingController
