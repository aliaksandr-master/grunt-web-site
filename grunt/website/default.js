'use strict';

module.exports = function (grunt) {
	var opt = this,
		NAME = this.LNK(),
		SRC = this.LNK(opt.SRC),
		BUILD = this.LNK(opt.BUILD);

	this
		.include([
			NAME + '/install',
			NAME + '/build'
		])
	;

};