var mongoose        = require('mongoose');
var passport        = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var User            = mongoose.model('User');
console.log(User);

passport.use(new TwitterStrategy({
    consumerKey: '09PXVTiBT1uhx5RXxPR2t0IOj',
    consumerSecret: '7sgJzYXyN1S6moTzUqQdCyjpa1U8voDlultj78w8F4HAdKpzCa',
    callbackURL: "http://127.0.0.1:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
      console.log(profile);
      User.findOrCreate(profile, function (err, user) {
          return done(err, user);
      });
  }
));
