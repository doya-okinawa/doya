var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var schema = new Schema({
    username: { type: String, index: { unique: true}},
    password: String
}, { strict: false});

mongoose.model('User', schema);
