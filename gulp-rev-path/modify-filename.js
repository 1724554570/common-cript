'use strict';
var path = require('path');

module.exports = function modifyFilename(pth, modifier) {
    if (arguments.length !== 2) {
        throw new Error('`path` and `modifier` required');
    }

    if (Array.isArray(pth)) {
        return pth.map(function (el) {
            return modifyFilename(el, modifier);
        });
    }

    var ext = path.extname(pth);
    var _dirname = path.dirname(pth);
    var _basename = path.basename(pth, ext);
    return path.join(_dirname, modifier(_basename, ext));
};
