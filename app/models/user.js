var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var findOrCreate = require('mongoose-findorcreate');

var schema = new Schema({
    username: { type: String },
    display_name: { type: String },
    icon_url: { type: String },
    provider: { type: String, enum: ['twitter', 'github'] },
    twitter: {},
    github: {},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

schema.plugin(findOrCreate);

mongoose.model('User', schema);
