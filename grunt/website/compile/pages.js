'use strict';

module.exports = function (grunt) {
	var opt = this,
		NAME = this.LNK(),
		SRC = this.LNK(opt.SRC),
		VAR = this.LNK(opt.VAR),
		TMP = this.LNK(opt.TMP),
		BUILD = this.LNK(opt.BUILD);

	var _ = require('lodash');
	var jade = require('jade');

	this

		.clean([
			BUILD + '/page'
		])

		.jade({
			options: {
				client: false,
				amd: false,
				pretty: true,
				debug: false,
				filters: {},
				data: function () {
					return {

					};
				}
			},
			files: [
				{
					expand: true,
					src: [
						'**/*.jade',
						'!inc/**/*.jade'
					],
					cwd: SRC,
					dest: BUILD,
					ext: '.html'
				}
			]
		})

		.processFile({
			options: {
				write: false,
				process: function (fpath, content) {
					return content;
				},
				splittingIntoFiles: function (videos, dest) {
					var files = {};
					_.each(videos, function (video) {
						files[BUILD + '/modules/video/' + video.id + '.html'] = jade.renderFile(SRC + '/modules/video/index-template.jade', video);
					});
					return files;
				}
			},
			files: [
				{
					src: VAR + '/data/videos.json',
					dest: BUILD + '/modules'
				}
			]
		})
	;

};