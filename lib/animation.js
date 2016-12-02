

const tennis = require('../lib/tennis');
const player = require('../lib/asciiplayer');

let interval;

module.exports.start = function (message) {
    interval = player(tennis, 75, true, message);
};

module.exports.end = function () {
    clearInterval(interval);
};
