'use strict';

const log = require('verbalize');
const argv = require('minimist')(process.argv.slice(3));
const gulp = require('gulp');
const greplace = require('gulp-replace');
const grename = require('gulp-regex-rename');
const gdebug = require('gulp-debug');
const path = require('path');
const message = require('../lib/message');

const JAVASCRIPT_TEMPLATE = '../node_modules/inhabit-module-test-module'

const templatesBase = path.join(__dirname, '../templates/');

const templates = {
  javascript: [
    templatesBase + 'javascript/**/*',
    '!' + templatesBase + 'javascript/.git'
  ]
};

module.exports = function init() {
    log.writeln(log.gray("\n  - init\n"));

    const name = argv._[0];

    if (!name) {
      log.writeln(log.red(log.bold('init') + ' requires a ' + log.bold('name') + ' parameter'));
      log.writeln();
      log.writeln(log.gray('Example: ' + log.bold('ihpm init kebab-cased-name')));
      return false;
    }

    const camelName = name.replace( /(^|-)(\w)/g, (m, $1, $2) => $2.toUpperCase() );

    gulp.src(templates.javascript, { dot: true })
      .pipe(greplace(/test-module/g, name))
      .pipe(greplace(/TestModule/g, camelName))
      .pipe(grename(/TestModule/, camelName))
      .pipe(gulp.dest(path.join(process.cwd(), 'inhabit-module-' + name)))
      .on('end', () => {
        message();
        log.writeln(log.green("\nDone!"));
        log.writeln(log.blue(`Tip: try to "cd inhabit-module-${name}" and run "npm install", then "npm run watch"`))
      })
      .pipe(gdebug({ title: 'ihpm init:' }));
};

module.exports.help =
`
Scaffold new module
 - requires module name
Example:
  ihpm init my-test-module
`
