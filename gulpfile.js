var gulp        = require('gulp');
var runSequence = require('run-sequence');

require('require-dir')('gulp/tasks');


gulp.task('default', function() {
    return runSequence('compile', 'watch');
});
