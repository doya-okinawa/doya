mongoose = require('mongoose')
Schema = mongoose.Schema
UserSchema = new Schema({
  username:
    type: String
    index: unique: true
  display_name: type: String
  icon_url: type: String
  provider:
    type: String
    enum: [
      'twitter'
      'github'
    ]
  providers:
    twitter: {}
    github: {}
  created_at:
    type: Date
    default: Date.now
  updated_at:
    type: Date
    default: Date.now
}, strict: false)
UserSchema.statics = findOrCreate: (conditions, doc, options, callback) ->
  if arguments.length < 4
    if typeof options == 'function'
      # Scenario: findOrCreate(conditions, doc, callback)
      callback = options
      options = {}
    else if typeof doc == 'function'
      # Scenario: findOrCreate(conditions, callback);
      callback = doc
      doc = {}
      options = {}
  self = this
  @findOne conditions, (err, result) ->
    if err or result
      if options and options.upsert and !err
        self.update conditions, doc, (err, count) ->
          self.findOne conditions, (err, result) ->
            callback err, result, false
            return
          return
      else
        callback err, result, false
    else
      for key of doc
        conditions[key] = doc[key]
      obj = new self(conditions)
      obj.save (err) ->
        callback err, obj, true
        return
    return
  return
mongoose.model 'User', UserSchema
