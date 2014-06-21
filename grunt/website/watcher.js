'use strict';

module.exports = function (grunt) {
	var opt = this,
		NAME = this.LNK(),
		SRC = this.LNK(opt.SRC),
		BUILD = this.LNK(opt.BUILD);

	this
		.watch('jade', {
			files: [
				SRC + '/**/*.jade'
			],
			tasks: [
				NAME + '/compile/page'
			]
		})

		.watch('less', {
			files: [
				SRC + '/**/*.{less,css}'
			],
			tasks: [
				NAME + '/compile/styles'
			]
		})

		.watch('js', {
			files: [
				SRC + '/**/*.js'
			],
			tasks: [
				NAME + '/compile/js'
			]
		})

		.watch('templates', {
			files: [
				SRC + '/**/*.hbs'
			],
			tasks: [
				NAME + '/compile/templates'
			]
		})

		.watch('other', {
			files: [
				SRC + '/**/*.php',
				SRC + '/.htaccess'
			],
			tasks: [
				NAME + '/compile/env'
			]
		})
	;

};