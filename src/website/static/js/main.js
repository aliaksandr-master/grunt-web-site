require.config({

	baseUrl: '/static/js/',

	paths: {
		styles:  '../styles',
		packages: '../vendor',

		jquery: '../vendor/jquery/jquery',
		backbone: '../vendor/backbone/backbone',
		lodash: '../vendor/lodash/dist/lodash',
		underscore: '../vendor/lodash/dist/lodash',
		bootstrap: '../vendor/bootstrap/bootstrap',
		videojs: '../vendor/videojs/video',
		videojsVimeo: '../vendor/videojs-vimeo/videojs-vimeo'
	},

	map: {
		'*':{
			css: 'packages/require-css/css'
		}
	},

	shim: {
		'jquery': {
			exports: 'jQuery'
		},
		'bootstrap': {
			deps: ['jquery']
		}
	}

});

define('main',function(require, exports, module){
	"use strict";

	require('bootstrap');

	return exports;
});