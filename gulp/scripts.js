module.exports = function (gulp, plugins) {
  return function () {
    return gulp.src(require('./sources').js)
      .pipe(plugins.concat('ngFormBuilder.js'))
      .pipe(plugins.wrapper({
        header: "(function () {\n'use strict';\n",
        footer: '})();'
      }))
      .pipe(gulp.dest('dist/'))
      .pipe(plugins.rename('ngFormBuilder.min.js'))
      .pipe(plugins.uglify())
      .pipe(gulp.dest('dist/'));
  };
};
