"use strict";

var time = Date.now();

module.exports = require('grunto')(function (grunt) {
	var pkg = require('./package.json'),
		CWD = process.cwd();

	grunt.file.expand([ 'opt/nodejs/**/grunt-*.js' ]).forEach(function (f) {
		require(CWD + '/' + f)(grunt);
	});

	this.context({
		CWD:    CWD,
		SRC:    CWD + '/src',
		OPT:    CWD + '/opt',
		DEPLOY: CWD + '/deploy',
		DEV:    CWD + '/.developer',
		GRUNT:  CWD + '/grunt',
		BUILD:  CWD + '/build',
		VAR:    CWD + '/var',
		TMP:    CWD + '/tmp',

		LNK: function (before, after) {
			var link = this.CURRENT_PREFIX.replace(/^([^\/]+)\/.+$/, '$1').trim();
			if (before) {
				link = before.replace(/\/?$/, '/') + link;
			}
			if (after) {
				link = link + after.replace(/^\/?/, '/');
			}
			return link;
		},

		DEFAULT_LANG: 'en',

		GET_TEMPLATE_DATA: function () {
			var videos = grunt.file.readJSON(CWD + '/var/website/data/videos.json');
			var tags   = grunt.file.readJSON(CWD + '/var/website/data/tags.json');

			return {
				locale: {},
				videos: videos,
				tags: tags
			};
		},

		BUILD_TIMESTAMP: time,

		PACKAGE: pkg
	});

	this.scan([
		{
			cwd: 'grunt/',
			src: [
				'**/*.js',
				'!**/_*.js',
				'!**/_*/**/*.js'
			]
		}
	]);

	return {
		copy: {
			options: {
				excludeEmpty: true
			}
		},

		jshint: {
			options: grunt.file.readJSON('.jshintrc')
		},

		autoprefixer: {
			options: {
				browsers: ['last 2 version', 'ie 9'],
				diff: false,
				map: false
			}
		},

		watch: {
			options: {
				livereload: true,
				interrupt: true
			}
		}
	};

});