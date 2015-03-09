var mongoose      = require('mongoose');
var passport      = require('passport');
var User          = mongoose.model('User');

passport.serializeUser(function(user, done){
    done(null, { _id: user._id});
});
passport.deserializeUser(function(serializedUser, done){
    User.findById(serializedUser._id, function(err, user){
        done(err, user);
    });
});
