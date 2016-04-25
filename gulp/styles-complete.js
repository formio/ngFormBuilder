module.exports = function(gulp, plugins) {
  return function () {
    return gulp.src(plugins.bowerFiles({
        includeSelf: true
      }))
      .pipe(plugins.filter('**/*.css'))
      .pipe(plugins.concat('ngFormBuilder-complete.css'))
      .pipe(gulp.dest('dist'))
      .pipe(plugins.cssnano())
      .pipe(plugins.rename('ngFormBuilder-complete.min.css'))
      .pipe(gulp.dest('dist'));
  };
};
