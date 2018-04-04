/**
 * 合并 Check Value 
 * @param {type} baseSource 原始数组
 * @param {type} callArray  类型 String 或者 数组
 * @returns {unresolved}
 */
function checkArray(baseSource, callArray) {
    if (typeof callArray === 'object' && callArray instanceof Array) {
        for (let i in callArray) {
            baseSource.push(callArray[i]);
        }
    } else {
        baseSource.push(callArray);
    }
    return baseSource;
}

let params = {
    gulp: require("gulp"),
    sequence: require("gulp-sequence"), // 顺序执行
    jsHint: require("gulp-jshint"), // js语法检测
    minImage: require("gulp-imagemin"), // 图片压缩
    minImageForPng: require("imagemin-pngquant"), // 图片压缩（png）
    minCss: require("gulp-clean-css"), // css压缩
    minJs: require("gulp-uglify"), // js压缩
    minHtml: require("gulp-htmlmin"), // html压缩（js、css压缩）
    minHtmlForJT: require("gulp-minify-html"), // html压缩（js模板压缩）
    rev: require("gulp-rev"), // MD5版本号
    revCollector: require("gulp-rev-collector"), // 版本替换
    cache: require("gulp-cache"), // 缓存
    clean: require('gulp-clean') // 清理文件
};

// Error color
var chalk = require('chalk');

let gulp = params.gulp;
let sequence = params.sequence;
let jsHint = params.jsHint;
let minImage = params.minImage;
let minImageForPng = params.minImageForPng;
let minCss = params.minCss;
let uglify = params.minJs;
let minHtml = params.minHtml;
let minHtmlForJT = params.minHtmlForJT;
let rev = params.rev;
let revCollector = params.revCollector;
let cache = params.cache;
let clean = params.clean;
// 配置
let config = require("./source");
//任务
let task = require('./taskCfg');
// 服务器cdn地址
let MD5_server = config.MD5_server;
let FLAGMD5 = config.flagmd5;

function gulp_Action(gulp) {

    if (typeof gulp === 'undefined') {
        console.log('undefined');
        gulp = params.gulp;
    }

    gulp.task(task.clean, function () {
        // let srcSou = checkArray([config.dir.clean.src], config.dir.clean.revCol);
        let srcSou = checkArray([], config.dir.clean.pushfile);
        return gulp.src(srcSou).pipe(clean());
    });

    // js语法检测
    gulp.task(task.jsHint, function () {
        let srcSou = checkArray([], config.source.src.tools);
        gulp.src(srcSou).pipe(jsHint()).pipe(jsHint.reporter());
    });

    // MD5版本号
    gulp.task(task.revImage, function () {
        return gulp.src(config.source.src.images)
            .pipe(rev())
            .pipe(gulp.dest(config.md5file)) //- 输出文件本地
            .pipe(rev.manifest({ filePath: MD5_server, flagmd5: false }))
            .pipe(gulp.dest(config.dir.rev.image));
    });
    gulp.task(task.revFont, function () {
        return gulp.src(config.source.src.font)
            .pipe(rev())
            .pipe(gulp.dest(config.md5file)) //- 输出文件本地
            .pipe(rev.manifest({ filePath: MD5_server, flagmd5: FLAGMD5 }))
            .pipe(gulp.dest(config.dir.rev.font));
    });
    gulp.task(task.revCss, function () {
        return gulp.src(config.source.src.css)
            .pipe(rev())
            .pipe(gulp.dest(config.md5file)) //- 输出文件本地
            .pipe(rev.manifest({ filePath: MD5_server, flagmd5: FLAGMD5 }))
            .pipe(gulp.dest(config.dir.rev.css));
    });
    gulp.task(task.revJs, function () {
        return gulp.src(config.source.src.js)
            .pipe(rev())
            .pipe(gulp.dest(config.md5file)) //- 输出文件本地
            .pipe(rev.manifest({ filePath: MD5_server, flagmd5: FLAGMD5 }))
            .pipe(gulp.dest(config.dir.rev.js));
    });

    // 版本替换
    /**
     *  对插件进行如下修改，使得引用资源文件的url得以如下变换：
     *  "/css/base-f7e3192318.css" >> "/css/base.css?v=f7e3192318"
     * 
     *  gulp-rev
     *  node_modules\gulp-rev\index.js
     *  144 manifest[originalFile] = revisionedFile;  =>  manifest[originalFile] = originalFile + '?v=' + file.revHash;
     * 
     *  node_modules\rev-path\index.js
     *  10 return filename + '-' + hash + ext; => return filename + ext;
     
       node_modules\gulp-rev-collector\index.js
       31 if ( !_.isString(json[key]) || path.basename(json[key]).replace(new RegExp( opts.revSuffix ), '' ) !==  path.basename(key) ) {
       OR
       42 if (!~){  =>
       if ( path.basename(json[key]).split('?')[0] !== path.basename(key) ) {
     * 
     *  对插件进行如下修改，使得引用资源文件的url得以如下变换：
     *  "/css/base-f7e3192318.css" >> "http/https:xxxxxxx/css/base.css?v=f7e3192318"
     *  node_modules\gulp-rev\index.js
     *  ---- opts = objectAssign(); 增加 filePath: '', 开启远程文件路径
     *  ---- opts = objectAssign(); 增加 flagmd5: '',  true开启远程文件md5版本，false开启远程文件非md5版本
     *
        
        // manifest[originalFile] = revisionedFile;
        if(opts.flagmd5){
			manifest[originalFile] = opts.filePath + revisionedFile;
		}else{
			manifest[originalFile] = opts.filePath + originalFile;
        }
        
     * 
     * 
     */
    gulp.task(task.revCollectorCss, function () {
        let srcSou = checkArray([config.source.rev.font], config.source.src.css);
        return gulp.src(srcSou).pipe(revCollector()).pipe(gulp.dest(config.dir.revCollector.css));
    });

    gulp.task(task.revCollectorHtml, function () {
        let srcSou = checkArray([
            config.source.rev.image,
            config.source.rev.css,
            config.source.rev.js
        ], config.source.src.html);
        return gulp.src(srcSou).pipe(revCollector()).pipe(gulp.dest(config.dir.revCollector.html));
    });

    // 压缩文件
    gulp.task(task.minCss, function () {
        let srcSou = checkArray([], config.source.revCollector.css);
        return gulp.src(srcSou).pipe(minCss()).pipe(gulp.dest(config.dir.dist.css));
    });

    gulp.task(task.minJs, function () {
        let srcSou = checkArray([], config.source.src.js);
        return gulp.src(srcSou)
            .pipe(uglify().on('error', function (e) {
                console.log("Error fileName " + chalk.red(e.fileName));
                console.log("Error lineNumber " + chalk.red(e.lineNumber));
                // console.log(e);
            }))
            .pipe(gulp.dest(config.dir.dist.js));
    });

    let public_parms = function () {
        return {
            removeComments: true,
            collapseWhitespace: true,
            collapseBooleanAttributes: true,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            minifyJS: true,
            minifyCSS: true
        };
    };

    // Public js template file
    gulp.task(task.minJsHtml, function () {
        let srcSou = checkArray([], config.source.src.jshtml);
        return gulp.src(srcSou)
            //.pipe(minHtmlForJT()) //附带压缩页面上的js模板
            //.pipe(minHtml(public_parms())) //附带压缩页面上的css、js
            .pipe(gulp.dest(config.dir.dist.js));
    });

    // PC 版
    gulp.task(task.minHtml, function () {
        let srcSou = checkArray([], config.source.revCollector.html);
        return gulp.src(srcSou)
            //.pipe(minHtmlForJT()) //附带压缩页面上的js模板
            //.pipe(minHtml(public_parms())) //附带压缩页面上的css、js
            .pipe(gulp.dest(config.dir.dist.html));
    });

    gulp.task(task.minImage, function () {
        let srcSou = checkArray([], config.source.src.images);
        return gulp.src(srcSou)
            .pipe(cache(minImage({ progressive: true, use: [minImageForPng()] })))
            .pipe(gulp.dest(config.dir.dist.images));
    });
}

let cp = gulp_Action;

module.exports = cp;