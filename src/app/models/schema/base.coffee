mongoose = require('mongoose')
Schema   = mongoose.Schema

module.exports =
class Base

  @initialize: ->
    schema = new Schema(@schema, @options)
    schema.statics = @statics
    schema.methods = @methods
    mongoose.model @entityName, schema
