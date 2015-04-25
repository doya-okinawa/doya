fs = require('fs')
express = require('express')
session = require('express-session')
path = require('path')
favicon = require('serve-favicon')
logger = require('morgan')
cookieParser = require('cookie-parser')
flash = require('connect-flash')
bodyParser = require('body-parser')
multer = require('multer')
methodOverride = require('method-override')
passport = require('passport')
mongoose = require('mongoose')
MongoStore = require('connect-mongo')(session)
connectionString = require('./config/mongodb/connectionstring.js')
consolidate = require('consolidate')
app = express()

connect = ->
  options = server: socketOptions: keepAlive: 1
  mongoose.connect connectionString, options
  return

connect()
# Preparing mongoose.model
fs.readdirSync(__dirname + '/app/models').forEach (file) ->
  if ~file.indexOf('.js')
    require __dirname + '/app/models/' + file
  return
mongoose.connection.on 'error', console.log
mongoose.connection.on 'disconnected', connect
mongoose.connection.on 'open', ->
  console.log 'Successfuly Connected to : ' + connectionString
  return
# uncomment after placing your favicon in /public
#app.use(favicon(__dirname + '/public/favicon.ico'));
app.use logger('dev')
app.use bodyParser.json()
app.use bodyParser.urlencoded(extended: true)
app.use multer()
app.use methodOverride((req, res) ->
  if req.body and typeof req.body == 'object' and '_method' in req.body
    # look in urlencoded POST bodies and delete it
    method = req.body._method
    delete req.body._method
    return method
  return
)
app.use cookieParser()
app.use session(
  secret: 'aiueooo'
  store: new MongoStore(url: connectionString))
app.use flash()
app.use passport.initialize(userProperty: 'auth')
#=> ログイン時はreq.authからログインユーザーが取れる
app.use passport.session()
app.use express.static(path.join(__dirname, 'public'))
# view engine setup
app.engine 'mustache', consolidate.hogan
app.set 'view engine', 'mustache'
app.set 'views', path.join(__dirname, 'app/views')
require './config/passport'
require('./config/routes') app
require('./config/middlewares/errorhandlers') app
module.exports = app

