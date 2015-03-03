var fs               = require('fs');
var express          = require('express');
var session          = require('express-session');
var path             = require('path');
var favicon          = require('serve-favicon');
var logger           = require('morgan');
var cookieParser     = require('cookie-parser');
var cookieSession    = require('cookie-session');
var bodyParser       = require('body-parser');
var multer           = require('multer'); 
var mongoose         = require('mongoose');
var MongoStore       = require('connect-mongo')(session);
var connectionString = require('./config/mongodb/connectionstring.js');

var app = express();

var connect = function() {
    var options = { server: { socketOptions: { keepAlive: 1 } } };
    mongoose.connect( connectionString, options);
};
connect();

// Defining mongoose.model
fs.readdirSync(__dirname + '/app/models').forEach(function (file) {
    if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file);
});

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);
mongoose.connection.on('open', function() { console.log('Successfuly Connected to : ' + connectionString); });

var routes = require('./config/routes/routes');
routes(app);

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error/error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error/error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
