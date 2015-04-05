var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
gulp.task('clean', require('del').bind(null, ['dist']));
gulp.task('watch', require('./gulp/watch')(gulp, plugins));
gulp.task('jshint', require('./gulp/jshint')(gulp, plugins));
gulp.task('scripts', require('./gulp/scripts')(gulp, plugins));
gulp.task('build', ['clean', 'scripts'], function() {
  gulp.start('jshint');
});
gulp.task('default', ['build', 'watch']);
