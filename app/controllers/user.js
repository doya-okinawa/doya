
var User = {
    index: function() {
        return { title: 'Users | Express' };
    },
    show: function(username) {
        return { title: 'Notsu', username: username };
    }
};

module.exports = User;
