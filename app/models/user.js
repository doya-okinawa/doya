var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var schema = new Schema({
    username: { type: String, index: { unique: true}},
    password: String
}, { strict: false});

schema.methods = {
    authenticate: function (password) {
        return this.password === password;
    }
};

mongoose.model('User', schema);
