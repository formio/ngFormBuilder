'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
plugins.source = require('vinyl-source-stream');
plugins.browserify = require('browserify');
plugins.watchify = require('watchify');
plugins.runSeq = require('run-sequence');
plugins.bowerFiles = require('main-bower-files');
plugins.packageJson = require('./package.json');

gulp.task('clean', require('del').bind(null, ['dist']));
gulp.task('eslint', require('./gulp/eslint')(gulp, plugins));
gulp.task('styles:basic', require('./gulp/styles-basic')(gulp, plugins));
gulp.task('styles:full', require('./gulp/styles-full')(gulp, plugins));
gulp.task('styles:complete', require('./gulp/styles-complete')(gulp, plugins));
gulp.task('styles', ['styles:basic', 'styles:complete', 'styles:full']);
gulp.task('scripts:basic', require('./gulp/scripts')(gulp, plugins));
gulp.task('scripts:full', require('./gulp/scripts-full')(gulp, plugins));
gulp.task('scripts:complete', require('./gulp/scripts-complete')(gulp, plugins));
gulp.task('scripts', ['scripts:basic', 'scripts:complete', 'scripts:full']);
gulp.task('build', function(cb) {
  plugins.runSeq(['clean'], 'scripts', 'styles', cb)
});
gulp.task('watch', require('./gulp/watch')(gulp, plugins));
gulp.task('default', ['build', 'watch']);
