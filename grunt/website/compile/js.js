'use strict';

module.exports = function (grunt) {
	var opt = this,
		NAME = this.LNK(),
		SRC = this.LNK(opt.SRC),
		BUILD = this.LNK(opt.BUILD);

	this
		.clean([
			BUILD + '/inc/js',
			BUILD + '/static/js'
		])

		.jshint([
			SRC + '/**/*.{js,json}'
		])

		.copy({
			files: [{
				expand: true,
				cwd: SRC,
				src: [
					'inc/js/**/*.js',
					'static/js/**/*.js'
				],
				dest: BUILD
			}]
		});
};