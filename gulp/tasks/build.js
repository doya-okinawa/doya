var del         = require('del');
var path        = require('path');
var gulp        = require('gulp');
var gutil       = require('gulp-util');
var coffee      = require('gulp-coffee');
var runSequence = require('run-sequence');
var config      = require('../config');


gulp.task('compile', ['compile:coffee','compile:views', 'compile:copy']);

gulp.task('compile:clean', function() {
    del(config.dest);
});


gulp.task('compile:coffee', function() {
    var coffees = path.join(config.src, '**/*.coffee');

    return gulp.src(coffees)
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest(config.dest));
});

gulp.task('compile:views', function() {
    var views = path.join(config.srcViews, '**/*.mustache');

    return gulp.src(views).on('error', gutil.log)
        .pipe( gulp.dest(config.destViews) );
});

gulp.task('compile:copy', function() {
    var src = path.join(config.src, '**/*');
    var target = [src, '!**/*.coffee', '!**/*.mustache'];

    return gulp.src(target).on('error', gutil.log)
        .pipe( gulp.dest(config.dest) );
});
