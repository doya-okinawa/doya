var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var UserSchema = new Schema({
    username: { type: String, index: { unique: true}},
    display_name: { type: String },
    icon_url: { type: String },
    provider: { type: String, enum: ['twitter', 'github'] },
    providers: { twitter: {}, github: {} },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
}, { strict: false });

UserSchema.statics = {

    findOrCreate: function findOrCreate(conditions, doc, options, callback) {
        if (arguments.length < 4) {
            if (typeof options === 'function') {
                // Scenario: findOrCreate(conditions, doc, callback)
                callback = options;
                options = {};
            } else if (typeof doc === 'function') {
                // Scenario: findOrCreate(conditions, callback);
                callback = doc;
                doc = {};
                options = {};
            }
        }
        var self = this;
        this.findOne(conditions, function(err, result) {
            if(err || result) {
                if(options && options.upsert && !err) {
                    self.update(conditions, doc, function(err, count){
                        self.findOne(conditions, function(err, result) {
                            callback(err, result, false);
                        });
                    });
                } else {
                    callback(err, result, false);
                }
            } else {
                for (var key in doc) {
                    conditions[key] = doc[key]; 
                }
                var obj = new self(conditions);
                obj.save(function(err) {
                    callback(err, obj, true);
                });
            }
        });
    }
};

mongoose.model('User', UserSchema);
