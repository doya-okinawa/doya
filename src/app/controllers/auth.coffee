passport      = require('passport')
mongoose      = require('mongoose')
AppController = require('./application')
User          = mongoose.model('User')


module.exports =
class Auth extends AppController

  @twitter: passport.authenticate('twitter')

  @twitterCallback: (req, res, next) ->
    passport.authenticate('twitter', (err, user, info) ->
      User.findOne { 'providers.twitter.id': user.providers.twitter.id }, (err, found) ->
        if err
          return next(err)
        if !found
          req.flash 'newUser', JSON.stringify(user)
          return res.redirect('/users/new')
        req.login found, (err) ->
          if err
            return next(err)
          req.flash 'notice', 'ログインしました'
          res.redirect '/'
    ) req, res, next

  @github: passport.authenticate('github')

  @githubCallback: (req, res, next) ->
    passport.authenticate('github', (err, user, info) ->
      User.findOne { 'providers.github.id': user.providers.github.id }, (err, found) ->
        if err
          return next(err)
        if !found
          req.flash 'newUser', JSON.stringify(user)
          return res.redirect('/users/new')
        req.login found, (err) ->
          if err
            return next(err)
          req.flash 'notice', 'ログインしました'
          res.redirect '/'

    ) req, res, next
