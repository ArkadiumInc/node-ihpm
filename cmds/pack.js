/* pack commander component
 * To use add require('../cmds/pack.js')(program) to your commander.js based node executable before program.parse
 */
'use strict';

module.exports = function(program) {

	program
		.command('pack')
		.version('0.0.0')
		.description('Create a ZIP package for uploading to Developers Portal')
		.action(function (/* Args here */) {

            const fs       = require('fs');
            const path     = require('path');
            const chalk    = require('chalk');
            const archiver = require('archiver');
            const locator  = require('../lib/locator');

            try {
                const cfg = require(locator.cfg());
                const packageName = `package.zip`;
                const packageFileStream = fs.createWriteStream(packageName);
                const archive = archiver('zip');

                packageFileStream.on('close', () => {
                    console.log(chalk.green(`${archive.pointer()} bytes written to ${path.resolve(packageName)}`));
                });

                archive.pipe(packageFileStream);

                if (cfg.resources) {
                    archive.directory(cfg.resources, '/');
                }
                if (cfg.preview) {
                    archive.file(cfg.preview);
                }
                if (cfg.main) {
                    archive.file(cfg.main, { name: `entry.js` });
                }
                try {
                    fs.accessSync(`${cfg.main}.map`);
                    archive.file(`${cfg.main}.map`, { name: `entry.js.map` });
                    console.log(chalk.blue(`Found sourcemap: ${cfg.main}.map`));
                } catch(e) { }

                cfg.main = `entry.js`;
                archive.append(JSON.stringify(cfg), {name: 'inhabitcfg.json'});

                archive.finalize();

            } catch (e) {
                console.error(e);
            }
		});

};
