var path   = require('path');
var gulp   = require('gulp');
var config = require('../config');


gulp.task('watch', ['watch:coffee', 'watch:views', 'watch:copy']);


gulp.task('watch:coffee', function() {
    var coffees = path.join(config.src, '**/*.coffee');

    gulp.watch(coffees, 'compile:coffee');
});

gulp.task('watch:views', function() {
    var views = path.join(config.srcViews, '**/*.mustache');

    gulp.watch(views, 'compile:views');
});

gulp.task('watch:copy', function() {
    var src = path.join(config.src, '**/*');
    var target = [src, '!**/*.coffee', '!**/*.mustache'];

    gulp.watch(target, 'compile:copy');
});
