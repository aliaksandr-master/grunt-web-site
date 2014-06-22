"use strict";

module.exports = function (grunt) {
	grunt.task.registerMultiTask('vimeoVideoInfo', function () {
		var fileProcessor = require('../grunt-additional-task-utils/gruntTaskFileProcessor')(this);

		var _ = require('lodash');

		var options = this.options({
			readFile: function (fpath, readOptions) {
				switch (require('path').extname(fpath)) {
					case '.json':
						return grunt.file.readJSON(fpath, readOptions);
						break;
					case '.yaml':
						return grunt.file.readYAML(fpath, readOptions);
						break;
				}
				return grunt.file.read(fpath, readOptions);
			},

			getIds: function (fpath, content) {
				return [];
			},

			processInfo: function (content, id, data) {

			},

			write: true,

			beautifyJSON: true
		});

		fileProcessor.configure(options);

		var done = null;
		var http = require('http');
		var counter = 0;
		var that = this;
		var asyncTrigger = function () {
			counter++;
			if (done === null) {
				done = that.async();
			}
		};
		var doneTrigger = function () {
			counter--;
			if (counter <= 0 && done !== null) {
				done();
				done = null;
			}
		};
		fileProcessor.each(function (fpath, content) {
			var dest = this.dest;
			var ids = options.getIds(fpath, content);
			var counter = 0;
			_.each(ids, function (id) {
				counter++;
				asyncTrigger();
				var opt = {
					hostname: 'vimeo.com',
					path: '/api/v2/video/' + id +'.json',
					method: 'GET'
				};
				var href = 'http://vimeo.com/api/v2/video/' + id +'.json';

				var doneThis = function (data) {
					options.processInfo(content, id, JSON.parse(data));
					counter--;
					if (counter <= 0) {
						if (options.write) {
							grunt.file.write(dest, JSON.stringify(content, null, options.beautifyJSON ? 4 : null));
							grunt.log.ok('file ' + dest + ' ' + (dest == fpath ? 'processed' : 'created') +'!');
						}
					}
					doneTrigger();
				};

				var req = http.get(href, function(res) {
					res.setEncoding('utf8');
					var data = '';
					res.on('data', function (chunk) {
						data += chunk;
					});
					res.on('end', function () {
						grunt.log.ok('request ' + href + ' done!');
						doneThis(data);
						req.end();
					});
				});
			});
		});
	})
};