module.exports = function(gulp, plugins) {
  return function () {
    return gulp.src(['src/**/*.js'])
      .pipe(plugins.eslint())
      .pipe(plugins.eslint.format())
      .pipe(plugins.eslint.failAfterError());
  };
};
