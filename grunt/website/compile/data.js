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
		.clean([
			VAR + '/data',
			VAR + '/localized'
		])

		.xlsxExtract({
			options: {
				splittingIntoFiles: function (content, dest) {
					var dir = path.dirname(dest) + '/' + path.basename(dest, path.extname(dest));
					var files = {};
					_.each(content.worksheets, function (list) {
						files[dir + '/' + list.name + '.json'] = list.data || {};
					});
					return files;
				},

				processResult: function (result) {
					var data = [];
					var titles = [];

					_.each(result, function (cells, index) {
						var values = _.map(cells, function (cell) {
							return cell == null || _.isNaN(cell) || _.isNaN(cell.value) ? null : cell.value;
						});

						if (index === 0) {
							_.each(values, function (value) {
								if (value == null) {
									return false;
								}
								titles.push(value);
								return true;
							});
						} else {
							var allNull = true,
								objData = {};

							_.each(titles, function (title, index) {
								var obj = objData,
									segments = title.split('/'),
									i = 0;

								for (; i < (segments.length - 1); i++) {
									if (obj[segments[i]] == null) {
										obj[segments[i]] = {};
									}
									obj = obj[segments[i]];
								}

								var v = values[index] == null ? null : values[index];
								if (v != null) {
									allNull = false;
								}
								obj[segments[i]] = v;
							});

							if (!allNull) {
								objData.id = data.length + 1;
								data.push(objData);
							}
						}
					});

					return data;
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
				process: function (fpath, translation) {
					var data = {};
					_.each(translation, function (translate) {
						translate.key = translate.key.trim();
						if (translate[opt.DEFAULT_LANG] == null) {
							grunt.fail.fatal('invalid default lang value in key "' + translate.key + '"');
						}
						var defaultValue = translate[opt.DEFAULT_LANG];
						_.each(translate, function (value, lang) {
							lang = lang.trim();
							if (lang === 'key' || lang === 'id') {
								return;
							}
							if (data[lang] == null) {
								data[lang] = {};
							}
							var obj = data[lang];
							var segments = translate.key.split('/');
							var i = 0;
							for (; i < (segments.length - 1); i++) {
								if (obj[segments[i]] == null) {
									obj[segments[i]] = {};
								}
								obj = obj[segments[i]];
							}
							obj[segments[i]] = value == null ? defaultValue : value.trim();
						});
					});
					return data;
				},
				splittingIntoFiles: function (content, dest) {
					var files = {};
					var locales = [];

					_.each(content, function (translation, lang) {
						files[dest + '/' + lang + '/translation.json'] = translation;
						locales.push(lang);
					});

					files[dest + '/locales.json'] = locales;

					return files;
				}
			},
			files: [
				{
					src: VAR + '/data/xlsx/ro/locales.json',
					dest: VAR + '/localized'
				}
			]
		})

		.processFile({
			options: {
				process: function (fpath, videos) {
					_.each(videos, function (video) {
						video.tags = _.filter(video.tags ? video.tags.split(/(?:\s*,\s*)+/) : [], function (tag) {
							return !_.isEmpty(tag);
						});
						video.lang = _.isEmpty(video.lang) ? opt.DEFAULT_LANG : video.lang;
						video.is_preview = Boolean(video.is_preview);
					});
					return videos;
				},
				splittingIntoFiles: function (content, dest) {
					var files = {};

					var byLang = _.groupBy(content, 'lang');
					_.each(byLang, function (videos, lang) {
						files[dest + '/' + lang + '/videos.json'] = videos;
					});

					return files;
				}
			},
			files: [
				{
					src: VAR + '/data/xlsx/ro/videos.json',
					dest: VAR + '/localized'
				}
			]
		})

		.processFile({
			options: {
				process: function (fpath, videos) {
					var data = {};
					_.each(videos, function (video) {
						_.each(video.tags, function (tag) {
							if (data[tag] == null) {
								data[tag] = 0;
							}
							data[tag]++;
						});
					});
					return data;
				}
			},
			files: [
				{
					expand: true,
					cwd: VAR + '/localized',
					src: '**/videos.json',
					dest: VAR + '/localized',
					rename: function (cwd, fname) {
						return cwd.replace(/\/$/, '') + '/' + fname.replace('videos', 'tags').replace(/^\//, '');
					}
				}
			]
		})
	;

};