'use strict';

const path = require('path');
const fs = require('fs');

module.exports.cfg = function () {
    const possibleConfigs = [ 'inhabit.cfg.json', 'inhabitcfg.json' ];

    for (let i = 0; i < possibleConfigs.length; i++) {
        try {
            fs.accessSync(possibleConfigs[i]);
            return path.resolve(possibleConfigs[i]);
        }
        catch (err) {}
    }

    throw Error('There is no ' + possibleConfigs.join(' or '))
};
