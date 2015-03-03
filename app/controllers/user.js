var mongoose = require('mongoose');
var User = mongoose.model('User');


var UserController = {
    index: function(req, res, next) {
        var users;
        User.find({},function(err, docs) {
            if(err) throw new Error();
            users = docs; 
            console.log(users);
        });
        return { title: 'Users | Express', users: users };
    },
    show: function(username) {
        return { title: username +' | Express', username: username };
    },
    create: function() {
        var user = new User({name: 'notsusan'});
        user.save();
    }
};

module.exports = UserController;
