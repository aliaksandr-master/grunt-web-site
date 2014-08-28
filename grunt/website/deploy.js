"use strict";

module.exports = function (grunt) {
	var opt = this,
		NAME = this.LNK(),
		SRC = this.LNK(opt.SRC),
		DEPLOY = this.LNK(opt.DEPLOY),
		BUILD = this.LNK(opt.BUILD);

	this
		.less({
			options: {
				compress: true,
				ieCompat: true
			},
			files: [
				{
					expand: true,
					overwrite: true,
					src: [
						BUILD + '/**/*.css'
					]
				}
			]
		})

		.clean('deploy', [
			DEPLOY
		])

		.copy('2deploy', {
			files: [{
				expand: true,
				cwd: BUILD,
				src: [ '**/*' ],
				dest: DEPLOY
			}]
		})

		.requirejs({
			options: {
				appDir: BUILD,
				baseUrl: 'static/js/',
				dir: DEPLOY,
				modules: [{
					name: 'main',
					include: ['bg', 'modules/videos'],
					insertRequire: ['main']
				}],
				mainConfigFile: DEPLOY + '/static/js/main.js',
				almond: true,
				optimize: 'none',
				useStrict: true,
				normalizeDirDefines: 'skip',
				keepBuildDir: false,
				preserveLicenseComments: false,
				inlineText: false
			}
		})

		.uglify({
			files: [
				{
					expand: true,
					src: [
						'**/*.js'
					],
					cwd: DEPLOY,
					dest: DEPLOY
				}
			]
		})

		.clean('build', [
			BUILD
		])

		.copy('2build', {
			files: [{
				expand: true,
				cwd: DEPLOY,
				src: [ '**/*' ],
				dest: BUILD
			}]
		})
	;

};