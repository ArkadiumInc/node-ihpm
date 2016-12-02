/* init commander component
 * To use add require('../cmds/init.js')(program) to your commander.js based node executable before program.parse
 */
'use strict';

module.exports = function(program) {

	program
        .version('0.0.1')
		.command('init <name>')
		.description('Init a new Inhabit project')
		.action(function (name) {
            const path      = require('path');
            const chalk     = require('chalk');
            const skeleton  = require('init-skeleton').init;
            const animation = require('../lib/animation');

            const logger   = { log: () => {}, error: () => {}}; // Suppress any messages
            const rootPath = path.join(process.cwd(), name);

            animation.start(chalk.green('Wait, while we do all the work for you...'));

            skeleton('https://github.com/brunch/with-es6', {
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
		});
};
