// +----------------------------------------------------------------------
// | 插件配置
// +----------------------------------------------------------------------
(function () {
    let params = require('./config/gulp-lib');
    var gulp = params.gulp;
    var sequence = params.sequence;
    // 配置
    var config = require("./config/source");
    // 任务
    var task = require("./config/gulp-task");
    // 启动 function
    var runFunction = require("./config/gulp-func");
    runFunction(gulp);

    var t_clean = [task.clean];
    //js语法检测
    var t_jsHint = [task.jsHint];
    //MD5版本号
    var t_MD5 = [
        task.revImage,
        task.revFont,
        task.revCss,
        task.revJs
    ];
    //版本替换
    var t_version = [
        // task.revCollectorCss,
        task.revCollectorHtml
    ];
    //压缩文件
    var t_minFile = [
        task.minJsHtml,
        task.minHtml,
        task.minCss,
        task.minJs,
//        task.minImage,
        task.copy
    ];
    //正式构建
    gulp.task("build", sequence(t_clean, t_jsHint, t_MD5, t_version, t_minFile));
    gulp.task("default", ["build"], function () { });
    
//    gulp.task("default", gulp.series(
//        task.revImage,
//        task.revFont,
//        task.revCss,
//        task.revJs,
//        // task.revCollectorCss,
//        task.revCollectorHtml,
//        task.minJsHtml,
//        task.minHtml,
//        task.minCss,
//        task.minJs,
//        task.minImage,
//        task.copy,
//        (done) => {
//            console.log(done);
//        }));

    // 热更新Css 
    gulp.task("watch", [task.revCollectorCss, task.minCss], function () {
        gulp.watch(config.source.src.css, [task.revCollectorCss]);
        gulp.watch(config.source.revCollector.css, [task.minCss]);
    });
    //gulp.task("watch", gulp.series(task.revCollectorCss, task.minCss, function () {
    //    gulp.watch(config.source.src.css, [task.revCollectorCss]);
    //    gulp.watch(config.source.revCollector.css, [task.minCss]);
    //}));
})();