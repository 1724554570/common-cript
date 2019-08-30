let params = require('./gulp-lib');
// 
// let gulp = params.gulp;
// let sequence = params.sequence;
let jsHint = params.jsHint;
let minImage = params.minImage;
let minImageForPng = params.minImageForPng;
let minCss = params.minCss;
let uglify = params.uglify;
let minHtml = params.minHtml;
let minHtmlForJT = params.minHtmlForJT;
let rev = params.rev;
let revCollector = params.revCollector;
let chalk = params.chalk;
let cache = params.cache;
let clean = params.clean;

var plugLib = require("./plug-lib");
var checkArray = plugLib.checkArray;

// 配置
let config = require("./source");
// 任务
let task = require('./gulp-task');

function MainInitialization(action) {
    this.gulp = action;
}

/**
 * 扫描文件,Hash文件名称号
 * @returns {undefined}
 */
MainInitialization.prototype.revFiles = function () {
    var gulp = this.gulp;
    // 缓存文件路径
    var cachePath = config.dir.dist.version;
    gulp.task(task.revImage, function () {
        return gulp.src(config.source.src.images)
            .pipe(rev())
            .pipe(gulp.dest(cachePath))
            .pipe(rev.manifest("image-manifest.json", { filePath: config.CDN, fileHash: false }))
            .pipe(gulp.dest(config.dir.rev.revFile));
    });
    gulp.task(task.revFont, function () {
        return gulp.src(config.source.src.font)
            .pipe(rev())
            .pipe(gulp.dest(cachePath))
            .pipe(rev.manifest("fonts-manifest.json", { filePath: config.CDN }))
            .pipe(gulp.dest(config.dir.rev.revFile));
    });
    gulp.task(task.revCss, function () {
        return gulp.src([config.source.src.css, config.source.src.js])
            // return gulp.src([config.source.src.css])
            .pipe(rev())
            .pipe(gulp.dest(cachePath))
            .pipe(rev.manifest("static-manifest.json", { filePath: config.CDN }))
            .pipe(gulp.dest(config.dir.rev.revFile));
    });
    // gulp.task(task.revJs, function () {
    //     return gulp.src(config.source.src.js)
    //             .pipe(rev())
    //             .pipe(gulp.dest(cachePath))
    //             .pipe(rev.manifest("script-manifest.json", {filePath: config.CDN}))
    //             .pipe(gulp.dest(config.dir.rev.revFile));
    // });
};

/**
 * 替换文件路径
 * @returns {undefined}
 */
MainInitialization.prototype.replaceFilesPath = function () {
    var gulp = this.gulp;
    // 替换样式中静态文件引用路径
    gulp.task(task.revCollectorCss, function () {
        let srcSou = checkArray([config.source.rev.revFile], config.source.src.css);
        return gulp.src(srcSou).pipe(revCollector({ isStyle: true })).pipe(gulp.dest(config.dir.revCollector.css));
    });

    // 替换页面中静态文件引用路径
    gulp.task(task.revCollectorHtml, function () {
        let srcSou = checkArray([config.source.rev.revFile], config.source.src.html);
        return gulp.src(srcSou).pipe(revCollector()).pipe(gulp.dest(config.dir.revCollector.html));
    });
};

/**
 * 压缩模版引擎文件与页面
 * @returns {undefined}
 */
MainInitialization.prototype.compressFiles_Html = function () {
    var gulp = this.gulp;
    let public_parms = function () {
        let boolean = false, _boolean = false;
        return {
            //清除HTML注释
            removeComments: boolean,
            //压缩HTML
            collapseWhitespace: _boolean,
            //省略布尔属性的值 <input checked="true"/> ==> <input />
            collapseBooleanAttributes: boolean,
            //删除所有空格作属性值 <input id="" /> ==> <input />
            removeEmptyAttributes: boolean,
            //删除<script>的type="text/javascript"
            removeScriptTypeAttributes: boolean,
            //删除<style>和<link>的type="text/css"
            removeStyleLinkTypeAttributes: boolean,
            //压缩页面JS
            minifyJS: boolean,
            //压缩页面CSS
            minifyCSS: boolean
        };
    };

    // 压缩javascript模版
    gulp.task(task.minJsHtml, function () {
        let srcSou = checkArray([], config.source.src.jshtml);
        return gulp.src(srcSou)
            .pipe(minHtmlForJT()) // 压缩页面上的javascript模板
            .pipe(minHtml(public_parms()))// 压缩页面上的style,javascript
            .pipe(gulp.dest(config.dir.dist.release));
    });

    // PC 版
    gulp.task(task.minHtml, function () {
        let srcSou = checkArray([], config.source.revCollector.html);
        return gulp.src(srcSou)
            .pipe(minHtml(public_parms()))
            .pipe(gulp.dest(config.dir.dist.release))
            .pipe(gulp.dest(config.dir.dist.version));
    });
};

/**
 * 压缩样式，脚本文件
 * @returns {undefined}
 */
MainInitialization.prototype.compressFiles_CSSJS = function () {
    var gulp = this.gulp;

    let releasePath = config.dir.dist.release;
    gulp.task(task.minCss, function () {
        let srcSou = checkArray([], config.staticHash ? config.source.revCollector.CSS : config.source.src.css);
        return gulp.src(srcSou)
            // .pipe(minCss())
            .pipe(gulp.dest(releasePath));
    });

    gulp.task(task.minJs, function () {
        let srcSou = checkArray([], config.staticHash ? config.source.revCollector.JS : config.source.src.js);
        return gulp.src(srcSou)
            .pipe(uglify({}).on('error', function (e) {
                console.log("---------- minJs-Error ----------");
                console.log(chalk.red(e));
                console.log("---------- minJs-Error ----------");
            }))
            .pipe(gulp.dest(releasePath));
    });

    // 压缩图片文件
    gulp.task(task.minImage, function () {
        let srcSou = checkArray([], config.source.src.images);
        return gulp.src(srcSou)
            .pipe(cache(minImage({ progressive: false, use: [minImageForPng()] })))
            .pipe(gulp.dest(releasePath));
    });
};


/**
 * Main(主要)
 * @param {type} gulp
 * @returns {undefined}
 */
module.exports = function (gulp) {

    // 清楚缓存文件
    gulp.task(task.clean, function () {
        let srcSou = checkArray([], config.dir.clean.pushfile);
        return gulp.src(srcSou).pipe(clean());
    });

    // 复制{mp3,json,swf,woff,woff2}类型文件到发布目录下
    gulp.task(task.copy, function () {
        let srcSou = checkArray([], config.source.src.copyFile);
        return gulp.src(srcSou).pipe(gulp.dest(config.dir.dist.release));
    });

    // js语法检测
    gulp.task(task.jsHint, function () {
        let srcSou = checkArray([], config.source.src.tools);
        gulp.src(srcSou).pipe(jsHint().on('error', function (e) {
            console.log("---------- jsHint-Error ----------");
            console.log(chalk.red(e));
            console.log("---------- jsHint-Error ----------");
        })).pipe(jsHint.reporter());
    });

    let mainInit = new MainInitialization(gulp);
    mainInit.revFiles();
    mainInit.replaceFilesPath();
    mainInit.compressFiles_Html();
    mainInit.compressFiles_CSSJS();
};