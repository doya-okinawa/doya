mongoose = require('mongoose')
Schema   = mongoose.Schema


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


mongoose.model 'User', UserSchema
