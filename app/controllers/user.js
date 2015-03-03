var mongoose = require('mongoose');
var User = mongoose.model('User');

var UserController = {
    index: function(req, res, next) {
        User.find({},function(err, users) {
            if(err) throw new Error();
            res.render('user/index', {
                users: users 
            });
        });
    },
    show: function(req, res, next) {
        // TODO:もっと上手くusernameとれそう
        var username = req.baseUrl.replace(/^\//,'');
        User.findOne({ username: username},function(err, user) {
            console.log(user);
            if(user === null) return next();
            return res.render('user/show', {
                user: user 
            });
        });
    },
    create: function(req, res, next) {
        var user = new User(req.body);
        user.save(function(err) {
            if(err) {
                err.status = 400;
                return next(err);
            }
            return res.redirect('/'+ user.username);
        });
    }
};

module.exports = UserController;
