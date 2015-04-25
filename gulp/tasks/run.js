var path    = require('path');
var gulp    = require('gulp');
var nodemon = require('gulp-nodemon');
var exec    = require('child_process').exec;
var config  = require('../config');


gulp.task('start', function() {
    var main = path.join(config.destBin, 'www');

    nodemon({ script: main, ext: 'js mustache json', env: { 'NODE_ENV': 'development' }})
        .on('restart', function () {
            console.log('restarted!');
        });
});

gulp.task('s', function () {
    gulp.start('start');
});


gulp.task('debug', function() {
    var main = path.join(config.destBin, 'www');
    exec('node-debug '+ main, function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
});

gulp.task('d', function () {
    gulp.start('debug');
});
