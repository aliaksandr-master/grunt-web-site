"use strict";

module.exports = function (grunt) {
	var opt = this,
		NAME = this.LNK(),
		SRC = this.LNK(opt.SRC),
		VAR = this.LNK(opt.VAR),
		BUILD = this.LNK(opt.BUILD);

	var _ = require('lodash');
	var path = require('path');

	this
		.xlsxExtract({
			options: {
				splittingIntoFiles: function (content, dest) {
					var dir = path.dirname(dest) + '/' + path.basename(dest, path.extname(dest));
					var files = {};
					_.each(content.worksheets, function (list) {
						files[dir + '/' + list.name + '.json'] = list.data || {};
					});
					return files;
				}
			},
			files: [{
				expand: true,
				cwd: SRC + '/data',
				src: [
					'**/*.xlsx',
					'!**/.*',
					'!**/~*',
					'!**/.~*'
				],
				dest: VAR + '/data/xlsx',
				ext: '.json'
			}]
		})

		.processFile({
			options: {

				process: function (fpath, json) {
					var data = [];
					var titles = [];
					var idCounter = 1;

					_.each(json, function (cells, index) {
						var values = _.map(cells, function (cell) {
							return cell == null ? null : cell.value;
						});

						if (index === 0) {
							titles = values;
						} else {
							var val = _.zipObject(titles, values);
							if (val.href && val.title) {
								val.id = idCounter++;
								data.push(val);
							}
						}
					});

					_.each(data, function (val) {
						if (val.tags) {
							val.tags = val.tags.split(/\s*,\s*/);
						} else {
							val.tags = [];
						}
					});

					return data;
				}
			},
			files: [
				{
					src: VAR + '/data/xlsx/video/videos.json',
					dest: VAR + '/data/videos.json'
				}
			]
		})

		.processFile({
			options: {
				process: function (fpath, data) {
					var tags = {};

					_.each(data, function (val) {
						_.each(val.tags, function (tag) {
							if (tags[tag] == null) {
								tags[tag] = 0;
							}

							tags[tag]++;
						});
					});

					return tags;
				}
			},
			files: [
				{
					src:  VAR + '/data/videos.json',
					dest: VAR + '/data/tags.json'
				}
			]
		})
	;

};