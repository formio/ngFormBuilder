'use strict';

var path = require('path');
var livereload = require('gulp-livereload');

module.exports = function(gulp, plugins) {
  return function() {
    var bundle = plugins.browserify({
      entries: './src/ngFormBuilder.js',
      debug: true
    });

    var build = require('./scripts')(gulp, plugins, bundle);
    livereload.listen();
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
