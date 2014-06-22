"use strict";


module.exports = function (grunt) {
	var opt = this,
		NAME = this.LNK(),
		SRC = this.LNK(opt.SRC),
		OPT = opt.CWD + '/opt/frontend/bower',
		BUILD = this.LNK(opt.BUILD),
		VENDOR = BUILD + '/static/vendor';

	this
		.clean([
			VENDOR
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
					dest: VENDOR
				},
				{
					expand: true,
					cwd: OPT + '/bootstrap-less/fonts',
					src: [
						'**/*.{svg,eot,ttf,woff}'
					],
					dest: VENDOR + '/bootstrap/fonts'
				},
				{
					expand: true,
					cwd: OPT + '/video.js/dist/video-js',
					src: '**/*{js,eot,svg,ttf,woff,swf}',
					dest: VENDOR + '/videojs'
				},
				{
					src: opt.CWD + '/opt/frontend/vendor/videojs-vimeo/videojs-vimeo.js',
					dest: VENDOR + '/videojs-vimeo/videojs-vimeo.js'
				}
			]
		})

		.less({
			options: {
				strictUnits: true,
				cleancss: true,
				sourceMap: false,
				relativeUrls: true,
				report: false,
				modifyVars: {
					'ie8screen': 'screen'
				}
			},
			files: [
				{
					src: OPT + '/video.js/src/css/video-js.less',
					dest: VENDOR + '/videojs/video-js.css'
				}
			]
		})

		.replace({
			src: VENDOR + '/videojs/video-js.css',
			overwrite: true,
			replacements: [{
				from: '\\0', // remove ie8 hack form videojs styles. because it fail css parsing
				to: ''
			}]
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
			dest: VENDOR + '/bootstrap/bootstrap.js'
		})
	;
};