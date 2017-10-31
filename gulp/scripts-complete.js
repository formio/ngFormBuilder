module.exports = function(gulp, plugins) {
  return function() {
    var bundle = plugins.browserify({
      entries: './src/ngFormBuilder-complete.js',
      debug: false,
      standalone: 'formio-builder'
    });

    return bundle
      .bundle()
      .pipe(plugins.source('ngFormBuilder-complete.js'))
      .pipe(plugins.replace('<%=version%>', plugins.packageJson.version))
      .pipe(plugins.derequire())
      .pipe(gulp.dest('dist/'))
      .pipe(plugins.rename('ngFormBuilder-complete.min.js'))
      .pipe(plugins.streamify(plugins.uglify({output: {comments: '/^!/'}})))
      .pipe(gulp.dest('dist/'))
      .on('error', function(err){
        console.log(err);
        this.emit('end');
      });
  };

};
