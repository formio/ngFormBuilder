// var gulp = require('gulp');
// var plugins = require('gulp-load-plugins')();
// gulp.task('clean', require('del').bind(null, ['dist']));
// gulp.task('watch', require('./gulp/watch')(gulp, plugins));
// gulp.task('jshint', require('./gulp/jshint')(gulp, plugins));
// gulp.task('scripts', require('./gulp/scripts')(gulp, plugins));
// gulp.task('build', ['clean', 'scripts'], function() {
//   gulp.start('jshint');
// });
// gulp.task('default', ['build', 'watch']);

'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
plugins.source = require('vinyl-source-stream');
plugins.browserify = require('browserify');
plugins.watchify = require('watchify');
plugins.runSeq = require('run-sequence');

gulp.task('clean', require('del').bind(null, ['dist']));
// TODO: setup eslint
// gulp.task('eslint', require('./gulp/eslint')(gulp, plugins));
gulp.task('eslint', function(){});
gulp.task('scripts', require('./gulp/scripts')(gulp, plugins));
gulp.task('build', function(cb) {
  plugins.runSeq(['clean', 'eslint'], 'scripts', cb)
});
gulp.task('watch', require('./gulp/watch')(gulp, plugins));
gulp.task('default', ['build', 'watch']);
