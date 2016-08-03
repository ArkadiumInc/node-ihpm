module.exports = {};

module.exports.tasks = {
    'publish': require('./publish'),
    'test': require('./test'),
    'init': require('./init')
};

module.exports.default = require('./test');