var gulp        = require('gulp');
var browserSync = require('browser-sync');
var nodemon     = require('gulp-nodemon');
var execsyncs   = require('gulp-execsyncs');

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

gulp.task('dev', function() {
    nodemon({ script: './bin/www', ext: 'js ejs json', env: { 'NODE_ENV': 'development' }})
        .on('restart', function () {
            console.log('restarted!');
        });
});

gulp.task('mongod', function () {
    execsyncs({
        cmd :'mongod --config config/mongodb/mongodb.dbpath.config',
        callback:function(res) {
            console.log(res);
        }
    });
});

gulp.task('db:seed', function () {
    execsyncs({
        cmd : 'mongoimport --db doyadb -collection users --file config/mongodb/data/seeds/users.json',
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
