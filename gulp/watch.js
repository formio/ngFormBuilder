module.exports = function(gulp, plugins) {
  return function() {
    gulp.watch(require('./sources').js, ['build']);
  }
};
