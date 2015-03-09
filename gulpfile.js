var gulp        = require('gulp');
var browserSync = require('browser-sync');
var nodemon     = require('gulp-nodemon');
var exec        = require('child_process').exec;
var execsyncs   = require('gulp-execsyncs');

/**
 Staring server with nodemon
*/
gulp.task('start', function() {
    nodemon({ script: './bin/www', ext: 'js ejs json', env: { 'NODE_ENV': 'development' }})
        .on('restart', function () {
            console.log('restarted!');
        });
});

gulp.task('s', function () {
    gulp.start('start');
});

/**
 Staring server with node-inspector
*/
gulp.task('debug', function() {
  exec('node-debug ./bin/www', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
  });
});

gulp.task('d', function () {
    gulp.start('debug');
});


/**
 DB
*/
gulp.task('mongod', function () {
  exec('mongod --config config/mongodb/mongodb.dbpath.config', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
  });
});

gulp.task('db:seed', function () {
    execsyncs({
        cmd : 'mongoimport --db doyadb --collection users --file config/mongodb/data/seeds/users.json',
        callback: function(res) {
            console.log(res);
        }
    });
});

gulp.task('db:remove', function() {
    execsyncs({
        cmd : 'mongo --host localhost doyadb --eval "db.users.remove({})"',
        callback: function(res) {
            console.log(res);
        }
    });
});

gulp.task('db:reseed', function () {
    gulp.start('db:remove');
    gulp.start('db:seed');
});

/**
 BrowserSync
*/
gulp.task('sync', function() {
    browserSync({
            proxy: "localhost:3000"
    });
    gulp.watch("./public/stylesheets/*.css", function() {
        browserSync.reload();
    });
    gulp.watch("./public/javascripts/*.js", function() {
        browserSync.reload();
    });
    gulp.watch("./app/views/**/*.ejs", function() {
        browserSync.reload();
    });
});

gulp.task('reload', function () {
    browserSync.reload();
});
