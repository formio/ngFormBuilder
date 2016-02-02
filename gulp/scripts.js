var path = require('path');
module.exports = function(gulp, plugins) {

  return function() {
    var bundle = plugins.browserify({
      entries: './src/ngFormBuilder.js',
      debug: false
    });

    return bundle
      .bundle()
      .pipe(plugins.source('ngFormBuilder.js'))
      .pipe(gulp.dest('dist/'))
      .pipe(plugins.rename('ngFormBuilder.min.js'))
      .pipe(plugins.streamify(plugins.uglify()))
      .pipe(gulp.dest('dist/'))
      .on('error', function(err){
        console.log(err);
        this.emit('end');
      });
  };

};
