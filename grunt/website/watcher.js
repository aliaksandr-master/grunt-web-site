'use strict';

module.exports = function (grunt) {
	var opt = this,
		NAME = this.LNK(),
		SRC = this.LNK(opt.SRC),
		BUILD = this.LNK(opt.BUILD);

	this
		.watch({
			files: [
				SRC + '/**/*.jade'
			],
			tasks: [
				NAME + '/compile/webpage'
			]
		})

		.watch({
			files: [
				SRC + '/**/*.{less,css}'
			],
			tasks: [
				NAME + '/compile/styles'
			]
		})

		.watch({
			files: [
				SRC + '/**/*.js'
			],
			tasks: [
				NAME + '/compile/js'
			]
		})

		.watch({
			files: [
				SRC + '/static/images/**/*'
			],
			tasks: [
				NAME + '/compile/images'
			]
		})

		.watch({
			files: [
				SRC + '/.htaccess'
			],
			tasks: [
				NAME + '/compile/env'
			]
		})
	;

};