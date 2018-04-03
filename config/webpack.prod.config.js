const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.base.config.js');
const fs = require('fs');
const tcp = require('./to-cdn-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// fs.open('./src/config/env.js', 'w', function(err, fd) {
//     const buf = 'export default "production";';
//     fs.write(fd, buf, 0, buf.length, 0, function(err, written, buffer) {});
// });

// const pushFile_path = './pushFile/md5file/';
// const uploadServer = 'qb20180124';
// let webpackcfg = {
//     "token": "7D1E69CE868DD68F4AD2A4F49C86B3BE",
//     "username": "v_yuxjiang",
//     "appname": "mig_market",
//     "base": "http://3gimg.qq.com/",
//     "path": "/activity/act/",
//     "buildpath": uploadServer,
//     "zipPath": pushFile_path
// };

// 读取配置文件
let webpackcfg = require("../webpackcfg.json");


module.exports = merge(webpackBaseConfig, {
    output: {
        publicPath: '//3gimg.qq.com/mig_market/activity/act/qb20180124/',
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].chunk.js'
    },
    plugins: [
        new CleanWebpackPlugin(['dist/*.*'], {
            verbose: true,
            dry: false
        }),
        // new ExtractTextPlugin({
        //     filename: '[name].[hash].css',
        //     allChunks: true
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendors',
        //     filename: 'vendors.[hash].js'
        // }),
        // new webpack.DefinePlugin({
        //     'process.env': {
        //         NODE_ENV: '"production"'
        //     }
        // }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),
        // new HtmlWebpackPlugin({
        //     filename: '../index_prod.html',
        //     template: './src/template/index.ejs',
        //     inject: false
        // }),
        new tcp(webpackcfg)
    ]
});