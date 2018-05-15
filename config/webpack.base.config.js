const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        main: path.join(__dirname, './taskCfg.js')
    },
    output: {
        path: path.join(__dirname, './dist')
    },
    module: {
        rules: []
    },
    resolve: {}
};