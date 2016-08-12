'use strict';

const tests = require('inhabit-modules-tests'),
    dir = process.cwd();


module.exports = function () {
    return tests(dir);
};