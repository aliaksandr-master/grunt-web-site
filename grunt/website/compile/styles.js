'use strict';

module.exports = function (grunt) {
	var opt = this,
		NAME = this.LNK(),
		SRC = this.LNK(opt.SRC),
		BUILD = this.LNK(opt.BUILD);

	this

		.clean([
			BUILD + '/static/styles'
		])

		.less({
			files: [{
				expand: true,
				cwd: SRC,
				src: [
					'**/*.{less,css}',
					'!inc/**/*.{less,css}'
				],
				dest: BUILD,
				ext: '.css'
			}]
		});

};