module.exports = {};

module.exports.tasks = {
    'publish': require('./publish'),
    'test': require('./test')
};

module.exports.default = require('./test');