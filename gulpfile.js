'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
plugins.source = require('vinyl-source-stream');
plugins.browserify = require('browserify');
plugins.watchify = require('watchify');
plugins.runSeq = require('run-sequence');
plugins.packageJson = require('./package.json');

var template = '/*! ng-formio-builder v<%= data.version %> | https://npmcdn.com/ng-formio-builder@<%= data.version %>/LICENSE.txt */';
template += "\n";
template += '<%= data.contents %>';
plugins.template = template;

gulp.task('clean', require('del').bind(null, ['dist']));
gulp.task('eslint', require('./gulp/eslint')(gulp, plugins));
gulp.task('scripts:basic', require('./gulp/scripts')(gulp, plugins));
gulp.task('scripts:full', require('./gulp/scripts-full')(gulp, plugins));
gulp.task('scripts:complete', require('./gulp/scripts-complete')(gulp, plugins));
gulp.task('scripts', ['scripts:basic', 'scripts:complete', 'scripts:full']);
gulp.task('build', function(cb) {
  plugins.runSeq(['clean', 'eslint'], 'scripts', cb)
});
gulp.task('watch', require('./gulp/watch')(gulp, plugins));
gulp.task('default', ['build', 'watch']);
