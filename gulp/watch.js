'use strict';

module.exports = function(gulp, plugins) {
  var b = plugins.watchify(
    plugins.browserify({
      entries: './src/ngFormBuilder.js',
      debug: false
    })
  );

  var bundle = function() {
    console.log('writing: dist/ngFormBuilder.js and dist/ngFormBuilder.min.js');

    return b
      .bundle()
      .pipe(plugins.source('ngFormBuilder.js'))
      .pipe(gulp.dest('dist/'))
      .pipe(plugins.rename('ngFormBuilder.min.js'))
      .pipe(plugins.streamify(plugins.uglify()))
      .pipe(gulp.dest('dist/'))
      .on('error', function(err) {
        console.log(err);
        this.emit('end');
      });
  };

  b.on('update', bundle);
  return bundle;
};
