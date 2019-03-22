/**
let params = {
    gulp            : require("gulp"),
    sequence        : require("gulp-sequence"),//顺序执行
    jsHint          : require("gulp-jshint"),//js语法检测
    minImage        : require("gulp-imagemin"),//图片压缩
    minImageForPng  : require("imagemin-pngquant"),//图片压缩（png）
    minCss          : require("gulp-clean-css"),//css压缩
    uglify          : require("gulp-uglify"),//js压缩
    minHtml         : require("gulp-htmlmin"),//html压缩（js、css压缩）
    minHtmlForJT    : require("gulp-minify-html"),//html压缩（js模板压缩）
    rev             : require("gulp-rev"),//MD5版本号
    revCollector    : require("gulp-rev-collector"),//版本替换
    chalk           : require("chalk"),//Error color
    cache           : require("gulp-cache"),//缓存
    clean           : require("gulp-clean"),//清除缓存
};
*/
let paramsLib = {
    gulp            : require("gulp"),
    sequence        : require("gulp-sequence"),//顺序执行
    jsHint          : require("gulp-jshint"),//js语法检测
    minImage        : require("gulp-imagemin"),//图片压缩
    minImageForPng  : require("imagemin-pngquant"),//图片压缩（png）
    minCss          : require("gulp-clean-css"),//css压缩
    uglify          : require("gulp-uglify"),//js压缩
    minHtml         : require("gulp-htmlmin"),//html压缩（js、css压缩）
    minHtmlForJT    : require("gulp-minify-html"),//html压缩（js模板压缩）
    // rev             : require("gulp-rev"),//MD5版本号
    rev             : require("gulp-rev-path"),//MD5版本号
    revCollector    : require("gulp-rev-collector"),//版本替换
    chalk           : require("chalk"),//Error color
    cache           : require("gulp-cache"),//缓存
    clean           : require("gulp-clean") //清除缓存
};

module.exports = paramsLib;