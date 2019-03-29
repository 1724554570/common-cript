'use strict';
var modifyFilename = require('./modify-filename');

module.exports = function (pth, hash) {
	if (arguments.length !== 2) {
		throw new Error('`path` and `hash` required');
	}

	return modifyFilename(pth, function (filename, ext) {
		var res = filename + '-' + hash + ext;
		if (!hash) {
			res = filename + ext;
		}
		return res;
	});
};

module.exports.revert = function (pth, hash) {
	if (arguments.length !== 2) {
		throw new Error('`path` and `hash` required');
	}

	return modifyFilename(pth, function (filename, ext) {
		return filename.replace(new RegExp('-' + hash + '$'), '') + ext;
	});
};
