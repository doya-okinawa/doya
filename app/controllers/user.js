
var User = {
    index: function() {
        return { title: 'Users | Express' };
    },
    show: function(username) {
        return { title: username +' | Express', username: username };
    }
};

module.exports = User;
