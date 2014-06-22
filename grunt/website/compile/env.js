"use strict";

module.exports = function (grunt) {
	var opt = this,
		NAME = this.LNK(),
		SRC = this.LNK(opt.SRC),
		BUILD = this.LNK(opt.BUILD);

	this
		.copy({
			files: [
				{
					expand: true,
					cwd: SRC,
					src: '.htaccess',
					dest: BUILD
				}
			]
		})

};