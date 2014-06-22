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

	var tempData = null;

	this

		.clean([
			'!' + BUILD + '/static/**/*'
		])

		.processFile({
			options: {
				splittingToFiles: function (locales, dest) {
					var TPL_CWD = SRC + '/webpage';
					var sourceTemplates = grunt.file.expand({cwd: TPL_CWD}, [
						'**/*.jade',
						'!**/*-template.jade'
					]);

					var itemTemplates = grunt.file.expand({cwd: TPL_CWD}, [
						'**/*-list-template.jade'
					]);

					var files = {};

					_.each(locales, function (locale) {
						var DEST_DIR = dest + '/' + locale;

						var videos = grunt.file.readJSON(VAR + '/localized/' + locale + '/videos.json');
						var tags = grunt.file.readJSON(VAR + '/localized/' + locale + '/tags.json');
						var translation = grunt.file.readJSON(VAR + '/localized/' + locale + '/translation.json');

						var data = {
							locale: locales,
							currentLocale: locale,
							video: videos,
							tag: tags,
							key: translation
						};

						_.each(sourceTemplates, function (template) {
							var _data = _.extend({

							}, data);
							files[DEST_DIR + '/' + path.dirname(template) + '/' + path.basename(template, path.extname(template)) + '.html' ] = jade.renderFile(TPL_CWD + '/' + template, _data);
						});

						_.each(itemTemplates, function (template) {
							var baseName = path.basename(template, path.extname(template));
							var listData = data[baseName.replace('-item-template', '')];
							_.each(listData, function (item) {
								var _data = _.extend({
									item: item
								}, data);
								files[DEST_DIR + '/' + path.dirname(template) + '/' + item.id + '/index.html' ] = jade.renderFile(TPL_CWD + '/' + template, _data);
							});
						});
					});

					return files;
				}
			},
			files: [
				{
					scr: VAR + '/localized/locales.json',
					dest: BUILD
				}
			]
		})
	;

};