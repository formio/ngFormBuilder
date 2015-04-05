module.exports = function (gulp, plugins) {
  return function () {
    return gulp.src('dist/ngFormBuilder.js')
      .pipe(plugins.jshint({
        predef: ['angular', '_']
      }))
      .pipe(plugins.jshint.reporter('default'))
  };
};
