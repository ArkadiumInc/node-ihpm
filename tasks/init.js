'use strict';

const log = require('verbalize');
const argv = require('minimist')(process.argv.slice(3));
const gulp = require('gulp');
const greplace = require('gulp-replace');
const grename = require('gulp-regex-rename');
const gdebug = require('gulp-debug');
const path = require('path');

const templates = {
  javascript: path.join(__dirname, '../templates/javascript/**/*')
};

module.exports = function init() {
    log.writeln(log.gray("\n  - init\n"));

    const name = argv._[0];

    if (!name) {
      log.writeln(log.red(log.bold('init') + ' requires a ' + log.bold('name') + ' parameter'));
      log.writeln();
      log.writeln(log.gray('Example: ' + log.bold('ihpm init kebab-cased-name')));
    }

    const camelName = name.replace( /(^|-)(\w)/g, (m, $1, $2) => $2.toUpperCase() );

    log.writeln("Using template: " + log.bold(templates.javascript));

    gulp.src(templates.javascript)
      .pipe(greplace(/test-module/g, name))
      .pipe(greplace(/TestModule/g, camelName))
      .pipe(grename(/TestModule/, camelName))
      .pipe(gulp.dest(path.join(process.cwd(), 'inhabit-module-' + name)))
      .pipe(gdebug({ title: 'ihpm init:' }));
};

module.exports.help =
`
Scaffold new module
 - requires module name
Example:
  ihpm init my-test-module
`
