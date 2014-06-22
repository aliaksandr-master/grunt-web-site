'use strict';

module.exports = function (grunt) {
	var opt = this,
		NAME = this.LNK(),
		SRC = this.LNK(opt.SRC),
		BUILD = this.LNK(opt.BUILD);

	this
		.include([
			NAME + '/compile/data',
			NAME + '/compile/vendor',
			NAME + '/compile/js',
			NAME + '/compile/styles',
			NAME + '/compile/images',
			NAME + '/compile/webpage',
			NAME + '/compile/env'
		])
	;
};
