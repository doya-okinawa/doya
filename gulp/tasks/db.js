var gulp = require('gulp');
var execsyncs = require('gulp-execsyncs');
var config = require('../config');

gulp.task('db:seed', function () {
    execsyncs({
        cmd : 'mongoimport --db doyadb --collection users --file '+ config.seeds,
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
