define(function(require, exports, module){
	"use strict";

	var $ = require('jquery');

	var TIMEOUT = 30000;
	var images = ['default.jpg', 'bg-1.jpg', 'bg-2.jpg', 'bg-3.jpg', 'bg-4.jpg', 'bg-5.jpg'];
	var current = 0;
	var loaded = {
		'default': true
	};


	var changeBg = function () {
		var $bgWr = $('.content-bg');
		var $bg = $bgWr.children('.-active');

		current = current + 1;
		if (images.length <= current) {
			current = 0;
		}

		var $next = $bgWr.children('.-img-' + current);
		if (!$next.length) {
			var img = window.document.createElement('img');
			img.className = 'content-bg-img -img-' + current;
			img.src = '/static/images/bg/' + images[current];
			$bgWr.append(img);
			$next = $(img);
		}

		setTimeout(function () {
			$bg.removeClass('-active');
			$next.addClass('-active');
			changeBg();
		}, TIMEOUT);
	};

	$(function () {
		changeBg();
	});

	return exports;
});