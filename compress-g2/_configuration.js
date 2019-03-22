//
let rootPushFile = './pushFile';
let versionPath = rootPushFile + '/version';
let compressPath = rootPushFile + '/release';
// 是否 html5 活动
let isHtml5Activity = true;
// 是否执行压缩Hash路径下的style和javascript
let staticHash = true;
let uploadPath = (staticHash ? versionPath + '/' : compressPath + '/');
let semPath = 180813;
let html5Path = '2018novel';

/**
 * Gulp配置参数选项
 */
let Gulp_Configuration_parameter = {
    // sem落地页配置
    "sem_cdn": "//3gimg.qq.com/mig_market/activity/lpage/" + semPath + "/",
    "sem_Project": "../sem/" + semPath,

    // 是否使用静态文件{style,javascript}的Hash文件名
    "staticHash": staticHash,
    "imagesHash": false,

    // 是否 html5 活动
    "html5": isHtml5Activity,
    // Html5 活动配置
    "html5_cdn": "//3gimg.qq.com/mig_market/activity/act/" + html5Path + "/",
//    "html5_Project": html5Path,
    "html5_Project": "./projects/" + html5Path,

    // 默认参数(Default)
    "publish": rootPushFile,
    "version": versionPath,
    "release": compressPath

};

/**
 * webpack上传cdn配置信息
 */
let Webpack_Upload_Cdn_Configuration_parameter = {
    "token": "7D1E69CE868DD68F4AD2A4F49C86B3BE",
    "username": "v_yuxjiang",
    "appname": "mig_market",
//    "base": "http://3gimg.qq.com/",
    "base": "http://127.0.0.1:3001/upload",
    "zipPath": uploadPath,

    // 上传至Sem落地页目录
    "path": "/activity/lpage/",
    // Sem落地页项目名称
    "buildpath": semPath,

    // 是否 html5 活动
    "html5": isHtml5Activity,
    // 上传至html5活动目录
    "html5_path": "/activity/act/",
    // html5活动项目名称
    "html5_buildpath": html5Path
};

/**
 * 导出gulp配置信息
 */
module.exports = Gulp_Configuration_parameter;
/**
 * 导出webpack上传cdn配置信息
 */
module.exports.webpack = Webpack_Upload_Cdn_Configuration_parameter;