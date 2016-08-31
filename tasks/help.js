'use strict';

const log = require('verbalize');
const argv = require('minimist')(process.argv.slice(2));
const tasks = require('./');

module.exports = function help() {
  Object.keys(tasks.tasks).map((name) => {
    log.writeln(log.green(name));
    log.writeln(log.gray(tasks.tasks[name].help) + "\n");
  });
};

module.exports.help =
`
Display help
`
