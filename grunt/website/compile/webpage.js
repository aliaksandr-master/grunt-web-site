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
	var path = require('path');

	var tempData = null;

	this

		.clean([
			'!' + BUILD + '/static/**/*'
		])

		.processFile({
			options: {
				splittingIntoFiles: function (locales, dest) {
					var TPL_CWD = SRC + '/webpage';

					var sourceTemplates = grunt.file.expand({cwd: TPL_CWD}, [
						'**/*.jade',
						'!**/*-inc.jade',
						'!**/*-ext.jade',
						'!**/item-template.jade'
					]);

					var itemTemplates = grunt.file.expand({cwd: TPL_CWD}, [
						'!**/*-inc.jade',
						'!**/*-ext.jade',
						'**/item-template.jade'
					]);

					var files = {};

					_.each(locales, function (locale) {
						var DEST_DIR = dest + '/' + locale;
						var LOCALE_CWD = VAR + '/localized/' + locale;

						var options = {
							pretty: true,
							globals: ['console']
						};

						var data = {
							_: _,
							LOCALE: locale,
							locales: grunt.file.readJSON(VAR + '/localized/locales.json')
						};

						var dataFiles = grunt.file.expand({cwd: LOCALE_CWD}, [
							'**/*.json'
						]);

						_.each(dataFiles, function (dataFile) {
							var obj = data;
							var segments = dataFile.replace(/\.json$/, '').split('/');
							var i = 0;
							for (; i < (segments.length - 1); i++) {
								if (obj[segments[i]] == null) {
									obj[segments[i]] = {};
								}
								obj = obj[segments[i]];
							}
							obj[segments[i]] = grunt.file.readJSON(LOCALE_CWD + '/' + dataFile);
						});

						_.each(sourceTemplates, function (template) {
							var dir = path.dirname(template);
							dir = dir && dir !== '.' ? dir + '/' : '';
							var webpage = dir + path.basename(template, path.extname(template));
							var _data = _.extend({
								webpage: webpage
							}, data);
							files[DEST_DIR + '/' + webpage + '.html' ] =
								jade.renderFile(TPL_CWD + '/' + template, _.extend({
									data: _data
								}, options));
						});

						_.each(itemTemplates, function (template) {
							var dir = path.dirname(template);
							var listData = data;
							var segments = dir.split('/');
							for (var i = 0; i < segments.length; i++) {
								listData = listData[segments[i]];
							}

							_.each(listData, function (item) {
								var webpage = dir + '/' + item.id;
								var _data = _.extend({
									webpage: webpage,
									item: item
								}, data);
								files[DEST_DIR + '/' + webpage + '/index.html' ] =
									jade.renderFile(TPL_CWD + '/' + template, _.extend({
										data: _data
									}, options));
							});
						});
					});

					return files;
				}
			},
			files: [
				{
					src: VAR + '/localized/locales.json',
					dest: BUILD
				}
			]
		})
	;

};