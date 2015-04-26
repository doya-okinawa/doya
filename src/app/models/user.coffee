Promise    = require('bluebird')
UserSchema = require('./schema/user')


class User extends UserSchema

  @statics:
    findOneQ: (criteria) ->
      this.findOne(criteria).exec()

  @methods:
    instanchTest: ->
      Promise.resolve('test')

module.exports = User.initialize()
