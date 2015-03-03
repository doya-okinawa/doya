var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var schema = new Schema({
    name: { type: String, index: { unique: true}}
}, { strict: false});

mongoose.model('User', schema);
