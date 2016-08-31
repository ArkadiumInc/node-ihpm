module.exports = {};

module.exports.tasks = {
    'publish': require('./publish'),
    'test': require('./test'),
    'init': require('./init'),
    'help': require('./help')
};

module.exports.default = require('./test');
