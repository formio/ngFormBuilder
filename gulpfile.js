var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
gulp.task('clean', require('del').bind(null, ['dist']));
gulp.task('watch', function () {
  gulp.watch(sources, ['jshint', 'scripts']);
});

gulp.task('jshint', require('./gulp/jshint')(gulp, plugins));
gulp.task('scripts', require('./gulp/scripts')(gulp, plugins));
gulp.task('build', ['clean', 'scripts']);
gulp.task('default', ['jshint', 'build', 'watch']);
