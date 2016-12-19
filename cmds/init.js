/* init commander component
 * To use add require('../cmds/init.js')(program) to your commander.js based node executable before program.parse
 */
'use strict';

const Generators = {
    classic:"inhabit-module-template",
    js: 'https://github.com/ArkadiumInc/brunch-inhabit-module-js',
    phaser: 'https://github.com/ArkadiumInc/brunch-inhabit-module-phaser'
};

let generateFromYo = function (generatorType) {
    let generator = generatorType || 'classic';
    const yeoman = require('yeoman-environment');
    const env = yeoman.createEnv();
    env.lookup(() => {
        env.run(Generators[generator], () => {
            console.log('Good luck!!!');
        })
    })
};
module.exports = function (program) {
    program
        .version('0.0.2')
        .command('init [type]')
        .description('Init a new Inhabit project')
        .action(generateFromYo).on('--help', function () {
        console.log('Available types: classic, js, phaser');
    });
};
