'use strict';

require.config({

	baseUrl: '/static/js/',

	paths: {

		styles:  '../styles',
		modules: 'modules',
		templates: '../templates',

		packages: '../vendor',

		URIjs: '../vendor/URIjs'

	},

	map: {
		'*':{
			jquery: 'packages/jquery/jquery',
			backbone: 'packages/backbone/backbone',
			handlebars: 'packages/handlebars/handlebars',
			lodash: 'packages/lodash/dist/lodash',
			underscore: 'packages/lodash/dist/lodash',
			bootstrap: 'packages/bootstrap/bootstrap',
			videojs: 'packages/videojs/video',
			videojsVimeo: 'packages/videojs-vimeo/videojs-vimeo',

			text: 'packages/requirejs-text/text',
			css: 'packages/require-css/css'
		}
	},

	shim: {
		'packages/jquery/jquery': {
			init: function(){
				return window.jQuery;
			}
		},
		'packages/bootstrap/bootstrap': {
			deps: ['packages/jquery/jquery']
		},
		'packages/handlebars/handlebars': {
			init: function () {
				return window.Handlebars;
			}
		}
	}

});

define('main/app', function (require, exports, module) {
	var $ = require('jquery');

	return function () {
	};
});

require(['jquery', 'main/app'], function ($, app) {
	app();
});