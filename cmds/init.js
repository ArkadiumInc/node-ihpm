/* init commander component
 * To use add require('../cmds/init.js')(program) to your commander.js based node executable before program.parse
 */
'use strict';

module.exports = function(program) {

	program
		.command('init')
		.version('0.0.0')
		.description('Init a new Inhabit project')
		.action(function (/* Args here */) {
			// Your code goes here
		});

};
