var _               = require('lodash');
var mongoose        = require('mongoose');
var passport        = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var GitHubStrategy  = require('passport-github').Strategy;
var keys            = require('./env/keys');
var User            = mongoose.model('User');

passport.serializeUser(function(user, done){
    done(null, { _id: user._id});
});

passport.deserializeUser(function(serializedUser, done){
    User.findById(serializedUser._id, function(err, user){
        done(err, user);
    });
});

/* Twitter */
passport.use(new TwitterStrategy({
    consumerKey: keys.TWITTER_CLIENTID,
    consumerSecret: keys.TWITTER_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
      var twitter = _.pick(profile._json, 'id', 'name', 'screen_name', 'profile_image_url');
      var user = { username: twitter.screen_name,
                   display_name: twitter.name,
                   icon_url: twitter.profile_image_url,
                   provider: 'twitter',
                   providers: { twitter: twitter, github: {} }
                 };
      return done(null, user);
  }
));

/* GitHub */
passport.use(new GitHubStrategy({
    clientID: keys.GITHUB_CLIENTID,
    clientSecret: keys.GITHUB_SECRET,
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
