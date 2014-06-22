'use strict';

module.exports = function (grunt) {
	var opt = this,
		NAME = this.LNK(),
		SRC = this.LNK(opt.SRC),
		BUILD = this.LNK(opt.BUILD);

	this

		.clean([
			BUILD + '/static/images'
		])

		.copy({
			files: [
				{
					expand: true,
					cwd: SRC + '/static/images',
					dest: BUILD + '/static/images',
					src: '**/*.{ico,ICO,png,PNG,jpg,JPG,jpeg,JPEG,gif,GIF,svg,SVG}'
				}
			]
		})

};