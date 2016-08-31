'use strict';

const tests = require('inhabit-modules-tests'),
    dir = process.cwd();


module.exports = function () {
    return tests(dir);
};

module.exports.help =
`
Run unit tests to ensure that your module's interface complies InHabit requirements
`
