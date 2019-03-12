const path = require('path');

module.exports = {
    entry: {
        main: path.join(__dirname, './source.js')
    },
    output: {
        path: path.join(__dirname, '../pushFile/dist')
    },
    module: {
        rules: []
    }
};