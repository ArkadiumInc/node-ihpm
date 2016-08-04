'use strict';

module.exports = function(verb) {
  verb.use(require('verb-generate-readme'));
  verb.task('default', ['readme'], function(cb) {
    return verb.src('docs/*.md', {cwd: __dirname})
      .pipe(verb.dest('dist'))
  });
};
