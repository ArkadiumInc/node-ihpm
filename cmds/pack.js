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
			// Your code goes here
		});

};
