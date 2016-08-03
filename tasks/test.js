var log = require('verbalize');

module.exports = function test() {
    var tests = require('inhabit-modules-tests');
    log.writeln(log.gray('  - test'));
    tests.start();
};