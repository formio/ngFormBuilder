var path = require('path');
module.exports = function(gulp, plugins) {

  return function() {
    var bundle = plugins.browserify({
      entries: './src/ngFormBuilder.js',
      debug: true
    });

    bundle.transform({
      global: true
    }, 'uglifyify');

    var build = function() {
      return bundle
        .bundle()
        .pipe(plugins.source('ngFormBuilder.js'))
        .pipe(plugins.rename('ngFormBuilder.min.js'))
        .pipe(gulp.dest('dist/'))
        .on('error', function(err){
          console.log(err);
          this.emit('end');
        });
    };

    bundle = plugins.watchify(bundle);
    bundle.on('update', function(files) {
      console.log('Changed files: ', files.map(path.relative.bind(path, process.cwd())).join(', '));
      console.log('Rebuilding dist/ngFormBuilder.js...');
      build();
    });
    bundle.on('log', function(msg) {
      console.log(msg);
    });

    return build();
  };

};
