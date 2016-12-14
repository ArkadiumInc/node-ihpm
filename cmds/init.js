/* init commander component
 * To use add require('../cmds/init.js')(program) to your commander.js based node executable before program.parse
 */
'use strict';

const SKELS = {
    js:     'https://github.com/ArkadiumInc/brunch-inhabit-module-js',
    phaser: 'https://github.com/ArkadiumInc/brunch-inhabit-module-phaser'
};

module.exports = function(program) {

	program
        .version('0.0.2')
		.command('init <name> [skel]')
		.description('Init a new Inhabit project')
		.action(function (name, skel) {
            const path      = require('path');
            const chalk     = require('chalk');
            const skeleton  = require('init-skeleton').init;
            const animation = require('../lib/animation');

            const logger   = { log: () => {}, error: () => {}}; // Suppress any messages
            const rootPath = path.join(process.cwd(), name);

            if (!skel || !SKELS[skel]) {
                skel = 'js';
            }

            animation.start(chalk.green('Wait, while we do all the work for you...'));

            skeleton(SKELS[skel], {
                logger,
                rootPath
            }, err => {
                animation.end();
                if (err) {
                    console.log(chalk.red(err.message));
                } else {
                    console.log(chalk.green(`Check your fresh Module at ${chalk.bold(path.resolve(rootPath))}`))
                    console.log(chalk.blue(`Next steps:`));
                    console.log(chalk.blue.bold(`cd ${name}`));
                    console.log(chalk.blue.bold(`npm start`));
                }
            });
		}).on('--help', function () {
            console.log('Available skeletons: js, phaser');
        });
};
