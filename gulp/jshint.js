module.exports = function (gulp, plugins) {
  return function () {
    return gulp.src(require('./sources').js)
      .pipe(plugins.jshint({
        predef: ['angular']
      }))
      .pipe(plugins.jshint.reporter('default'))
  };
};
