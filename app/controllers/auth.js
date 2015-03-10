var passport           = require('passport');
var mongoose           = require('mongoose');
var User            = mongoose.model('User');

var Auth = {

    twitter: passport.authenticate('twitter'),
    
    twitterCallback:  function(req, res, next){
        passport.authenticate('twitter', function(err, user, info) {

            User.findOne({ 'providers.twitter.id': user.providers.twitter.id }, function(err, found) {
                if(err) return next(err);
                if(!found) {
                    req.flash('newUser', JSON.stringify(user) );
                    return res.redirect('/users/new');
                }
                return req.login(found, function(err) {
                    if (err) { return next(err); }
                    req.flash('notice', 'ログインしました');
                    return res.redirect('/');
                });
            });
        })(req, res, next);
    },

    github: passport.authenticate('github'),

    githubCallback: function(req, res, next){
        passport.authenticate('github', function(err, user, info) {

            User.findOne({ 'providers.github.id': user.providers.github.id }, function(err, found) {
                if(err) return next(err);
                if(!found) {
                    req.flash('newUser', JSON.stringify(user) );
                    return res.redirect('/users/new');
                }
                return req.login(found, function(err) {
                    if (err) { return next(err); }
                    req.flash('notice', 'ログインしました');
                    return res.redirect('/');
                });
            });
        })(req, res, next);
    }
};

module.exports = Auth;
