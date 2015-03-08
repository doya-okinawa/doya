var _               = require('lodash');
var mongoose        = require('mongoose');
var passport        = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var User            = mongoose.model('User');

passport.use(new TwitterStrategy({
    // Create Twitter Apps on `https://apps.twitter.com/` with Specific CallBackURL
    //                                                  ^^^^^^^^^^^^^^^^^^^^^^^^
    //                                                   example -> Callback URL : `http://127.0.0.1:3000/auth/twitter/callback`
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
      var twitter = _.pick(profile._json, 'id', 'name', 'screen_name', 'profile_image_url');
      var user = { username: twitter.screen_name,
                   display_name: twitter.name,
                   icon_url: twitter.profile_image_url,
                   provider: 'twitter',
                   twitter: twitter};
      User.findOrCreate({username: user.username}, user, { options: {upsert:true}}, function (err, foundUser) {
          return done(err, foundUser);
      });
  }
));
