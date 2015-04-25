_ = require('lodash')
mongoose = require('mongoose')
passport = require('passport')
TwitterStrategy = require('passport-twitter').Strategy
GitHubStrategy = require('passport-github').Strategy
keys = require('./env/keys')
User = mongoose.model('User')
passport.serializeUser (user, done) ->
  done null, _id: user._id
  return
passport.deserializeUser (serializedUser, done) ->
  User.findById serializedUser._id, (err, user) ->
    done err, user
    return
  return

### Twitter ###

passport.use new TwitterStrategy({
  consumerKey: keys.TWITTER_CLIENTID
  consumerSecret: keys.TWITTER_SECRET
  callbackURL: 'http://127.0.0.1:3000/auth/twitter/callback'
}, (token, tokenSecret, profile, done) ->
  twitter = _.pick(profile._json, 'id', 'name', 'screen_name', 'profile_image_url')
  user = 
    username: twitter.screen_name
    display_name: twitter.name
    icon_url: twitter.profile_image_url
    provider: 'twitter'
    providers:
      twitter: twitter
      github: {}
  done null, user
)

### GitHub ###

passport.use new GitHubStrategy({
  clientID: keys.GITHUB_CLIENTID
  clientSecret: keys.GITHUB_SECRET
  callbackURL: 'http://127.0.0.1:3000/auth/github/callback'
}, (accessToken, refreshToken, profile, done) ->
  github = _.pick(profile._json, 'id', 'login', 'name', 'avatar_url')
  user = 
    username: github.login
    display_name: github.name
    icon_url: github.avatar_url
    provider: 'github'
    providers:
      twitter: {}
      github: github
  done null, user
)
