var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate');

var schema = new Schema({
    username: { type: String},
    password: String
}, { strict: false});

schema.methods = {
    authenticate: function (password) {
        return this.password === password;
    }
};

schema.plugin(findOrCreate);

mongoose.model('User', schema);
