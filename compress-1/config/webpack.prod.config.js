const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const fs = require('fs');
const tcp = require('./to-cdn-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// 读取配置文件
let webpackcfg = require("../webpackcfg.json");


module.exports = merge(webpackBaseConfig, {
    output: {
        publicPath: '',
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].chunk.js'
    },
    plugins: [
        new CleanWebpackPlugin(['dist/*.*'], {
            verbose: true,
            dry: false
        }),
        new tcp(webpackcfg)
    ]
});