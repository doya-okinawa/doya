var _               = require('lodash');
var mongoose        = require('mongoose');
var passport        = require('passport');
var GitHubStrategy  = require('passport-github').Strategy;
var Env             = require('../env/env');
var User            = mongoose.model('User');

passport.use(new GitHubStrategy({
    clientID: Env.GITHUB_CLIENTID,
    clientSecret: Env.GITHUB_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      var github = _.pick(profile._json, 'id', 'login', 'name', 'avatar_url');
      var user = { username: github.login,
                   display_name: github.name,
                   icon_url: github.avatar_url,
                   provider: 'github',
                   providers: { twitter: {}, github: github }
                 };
      return done(null, user);
  }
));
