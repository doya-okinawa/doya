Base = require('./base')

module.exports =
class UserSchema extends Base

  @entityName: 'User'

  @schema:
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

  @options:
    strict: false
