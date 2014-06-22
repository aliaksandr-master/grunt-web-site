"use strict";


module.exports = function (grunt) {
	var opt = this,
		NAME = this.LNK(),
		SRC = this.LNK(opt.SRC),
		OPT = opt.CWD + '/opt/frontend/bower',
		BUILD = this.LNK(opt.BUILD);

	this
		.clean([
			BUILD + '/static/vendor'
		])

		.bower({
			options: {
				copy: false,
				install: true,
				verbose: true
			}
		})

		.copy({
			files: [
				{
					expand: true,
					src: [
						'jquery/jquery.js',
						'URIjs/URI.js',
						'requirejs/require.js',
						'require-css/*.js',
						'lodash/dist/lodash.js',
						'!**/*.min.js'
					],
					cwd: OPT,
					rename: function (cwd, path) {
						var segm = path.split(/[\\\/]+/);
						return cwd.replace(/\/$/, '') + '/' + segm.shift() + '/' + segm.pop()
					},
					dest: BUILD + '/static/vendor'
				},
				{
					expand: true,
					cwd: OPT + '/bootstrap-less/fonts',
					src: [
						'**/*.{svg,eot,ttf,woff}'
					],
					dest: BUILD + '/static/vendor/bootstrap/fonts'
				}
			]
		})

		.concat({
			src: [
				OPT + '/bootstrap-less/js/transition.js',
				OPT + '/bootstrap-less/js/alert.js',
				OPT + '/bootstrap-less/js/button.js',
				OPT + '/bootstrap-less/js/carousel.js',
				OPT + '/bootstrap-less/js/collapse.js',
				OPT + '/bootstrap-less/js/dropdown.js',
				OPT + '/bootstrap-less/js/modal.js',
				OPT + '/bootstrap-less/js/tooltip.js',
				OPT + '/bootstrap-less/js/popover.js',
				OPT + '/bootstrap-less/js/scrollspy.js',
				OPT + '/bootstrap-less/js/tab.js',
				OPT + '/bootstrap-less/js/affix.js'
			],
			dest: BUILD + '/static/vendor/bootstrap/bootstrap.js'
		})
	;
};