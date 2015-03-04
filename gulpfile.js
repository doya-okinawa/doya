var gulp        = require('gulp');
var browserSync = require('browser-sync');
var nodemon     = require('gulp-nodemon');
var exec        = require('execsyncs');

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
    exec('mongod --config config/mongodb/mongodb.dbpath.config', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
});

gulp.task('db:seed', function () {
    exec('mongoimport --db doyadb -collection users --file config/mongodb/data/seeds/users.json', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
});

gulp.task('db:remove', function() {
    exec('mongo --host localhost doyadb --eval "db.users.remove({})"', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
});

gulp.task('db:reseed', function () {
    gulp.start('remove');
    gulp.start('seed');
});
