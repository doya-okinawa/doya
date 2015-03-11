var fs               = require('fs');
var express          = require('express');
var session          = require('express-session');
var path             = require('path');
var favicon          = require('serve-favicon');
var logger           = require('morgan');
var cookieParser     = require('cookie-parser');
var flash            = require('connect-flash');
var bodyParser       = require('body-parser');
var multer           = require('multer'); 
var methodOverride   = require('method-override');
var passport         = require('passport');
var mongoose         = require('mongoose');
var MongoStore       = require('connect-mongo')(session);
var connectionString = require('./config/mongodb/connectionstring.js');
var consolidate      = require('consolidate');
var app              = express();

var connect = function() {
    var options = { server: { socketOptions: { keepAlive: 1 } } };
    mongoose.connect( connectionString, options);
};
connect();

// Preparing mongoose.model
fs.readdirSync(__dirname + '/app/models').forEach(function (file) {
    if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file);
});

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);
mongoose.connection.on('open', function() { console.log('Successfuly Connected to : ' + connectionString); });

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
  };
}));
app.use(cookieParser());
app.use(session({ secret: 'aiueooo',
                  store: new MongoStore({ url: connectionString})
                }));
app.use(flash());
app.use(passport.initialize({ userProperty: 'auth' })); //=> ログイン時はreq.authからログインユーザーが取れる
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.engine('mustache', consolidate.hogan);
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'app/views'));

require('./config/passport');
require('./config/routes')(app);
require('./config/middlewares/errorhandlers')(app);

module.exports = app;
