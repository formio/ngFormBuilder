module.exports = function(gulp, plugins) {
  return function () {
    return gulp.src(plugins.bowerFiles().concat('css/ngFormBuilder.css'))
      .pipe(plugins.filter('**/*.css'))
      .pipe(plugins.concat('ngFormBuilder-full.css'))
      .pipe(gulp.dest('dist'))
      .pipe(plugins.cssnano({zindex: false}))
      .pipe(plugins.rename('ngFormBuilder-full.min.css'))
      .pipe(gulp.dest('dist'));
  };
};
