var path   = require('path');
var gulp   = require('gulp');
var config = require('../config');


gulp.task('watch', ['watch:coffee', 'watch:copy']);


gulp.task('watch:coffee', function() {
    var coffees = path.join(config.src, '**/*.coffee');

    gulp.watch(coffees, ['compile:coffee']);
});

gulp.task('watch:copy', function() {
    var targets = path.join(config.src, '**/*.{css,json,mustache,config,eot,svg,ttf,woff}');

    gulp.watch(targets, ['compile:copy']);
});
