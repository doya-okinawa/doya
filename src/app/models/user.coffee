Promise    = require('bluebird')
UserSchema = require('./schema/user')


class User extends UserSchema

  # @statics:
    # staticExample: (criteria) ->
    #   this.findOne(criteria).exec()

  # @methods:
    # instanceExapmle: ->
    #   this.save().exec()

module.exports = User.register()
