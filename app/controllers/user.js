var mongoose = require('mongoose');
var User = mongoose.model('User');

var UserController = {
    // GET /users
    index: function(req, res, next) {
        User.find({},function(err, users) {
            if(err) throw new Error();
            res.render('user/index', {
                users: users 
            });
        });
    },
    // GET /:username
    show: function(req, res, next) {
        var username = req.params.username;
        User.findOne({ username: username},function(err, user) {
            console.log(user);
            if(user === null) return next();
            return res.render('user/show', {
                user: user
            });
        });
    },
    // GET /:username/new
    new: function(req, res, next) {
        return res.render('user/new');
    },
    // POST /users
    create: function(req, res, next) {
        console.log(req.body);
        var user = new User(req.body);
        user.save(function(err) {
            if(err) {
                err.status = 400;
                return next(err);
            }
            return res.redirect('/'+ user.username);
        });
    },
    // GET /:username/edit
    edit: function(req, res, next) {
        var username = req.params.username;
        User.findOne({ username: username},function(err, user) {
            console.log(user);
            if(user === null) return next();
            return res.render('user/edit', {
                user: user
            });
        });
    },
    // PUT /:username
    update: function(req, res, next) {
        var username = req.params.username;
        var userUpdated = req.body;
        User.findOneAndUpdate({ username: username}, userUpdated,function(err, user) {
            console.log(err);
            if(user === null) return next();
            return res.redirect('/users');
        });
    },
    // DELETE /:username
    destroy: function(req, res, next) {
        var username = req.params.username;
        console.log(username);
        User.findOneAndRemove({ username: username},function(err, user) {
            console.log(err);
            if(err) return next();
            return res.redirect('/users');
        });
    }
};

module.exports = UserController;
