// const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// 加载插件文件
const webpackBaseConfig = require('./webpack.base.config.js');
const tcp = require('./zipToCdnPlugin');

// 读取配置文件
let webpackcfg = require('../_configuration.js').webpack;

module.exports = merge(webpackBaseConfig, {
    output: {
        publicPath: '//3gimg.qq.com/mig_market/activity/act/qb20180124/',
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].chunk.js'
    },
    plugins: [
        new CleanWebpackPlugin(['../pushFile/dist/*.*'], {
            verbose: true,
            dry: false
        }),
        new tcp(webpackcfg)
    ]
});