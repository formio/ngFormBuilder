module.exports = function(gulp, plugins) {
  return function () {
    return gulp.src(plugins.bowerFiles().concat('css/ngFormBuilder.css'))
      .pipe(plugins.filter('**/*.css'))
      .pipe(plugins.concat('ngFormBuilder-complete.css'))
      .pipe(gulp.dest('dist'))
      .pipe(plugins.cssnano({zindex: false}))
      .pipe(plugins.rename('ngFormBuilder-complete.min.css'))
      .pipe(gulp.dest('dist'));
  };
};
