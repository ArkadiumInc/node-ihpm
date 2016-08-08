'use strict';

const path = require('path');
const fs = require('fs');

module.exports = {};

module.exports.getCfg = function () {
    const possibleConfigs = [ 'inhabit.cfg.json', 'inhabitcfg.json' ];
    let accessibleConfig;

    for (let i = 0; i < possibleConfigs.length; i++) {
        try { fs.accessSync(possibleConfigs[i]); return possibleConfigs[i]; }
        catch (err) {}
    }

    throw Error('There is no ' + possibleConfigs.join(' or '))
};