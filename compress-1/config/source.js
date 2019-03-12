// 读取配置文件
let cfg = require("../cfg.json");

/**
 * 重定义属性值
 */
let opt = function (o) {
    o = o || {};
    // 项目根目录
    let ROOT = "";
    if (o.root) {
        ROOT = o.root;
    }
    // 项目目录
    let devRoot_Proj = "./config/dist";
    if (o.htmlProject || o.semProject) {
        devRoot_Proj = ROOT + (o.html5 ? o.htmlProject : o.semProject);
    }
    // 发布文件路径
    let PUBLISHS = "./pushFile/";
    if (o.publish) {
        PUBLISHS = o.publish;
    }
    // 
    let REV = PUBLISHS + "/rev";
    // 编译后的压缩文件
    let BUILDS = PUBLISHS + "/builds";
    // MD5未压缩文件
    let MD5FILE = PUBLISHS + "/md5file";
    // MD5文件路径
    let REV_SOURCE = PUBLISHS + "/revCollector";
    // CDN路径
    let MD5_SERVER = "";
    if (o.server || o.cdn) {
        MD5_SERVER = o.server ? o.server : (o.html5) ? o.html5cdn : o.cdn;
    }
    let flagMD5 = (o.htmlMd5) ? true : false;
    return {
        rev: REV,
        push: PUBLISHS,
        builds: BUILDS,
        md5file: MD5FILE,
        Proj_source: devRoot_Proj,
        rev_source: REV_SOURCE,
        md5_server: MD5_SERVER,
        flagmd5: flagMD5
    };
}(cfg);


let config = {
    // 资源文件
    source: {
        // 源文件
        src: {
            font: opt.Proj_source + "/font/*",
            tools: "./src/tools/*.js",
            css: [
                opt.Proj_source + "/**/*.css",
            ],
            js: [
                opt.Proj_source + "/**/*.js",
            ],
            images: [
                opt.Proj_source + "/**/*.{png,jpg,gif,ico}",
            ],
            jshtml: [
                opt.Proj_source + "/js/**/**.html"
            ],
            html: [
                opt.Proj_source + "/**/*.html",
            ]
        },
        // MD5版本号文件
        rev: {
            image: opt.rev + "/image/**.json",
            font: opt.rev + "/font/**.json",
            css: opt.rev + "/css/**.json",
            js: opt.rev + "/js/**.json"
        },
        // 替换版本后的文件
        revCollector: {
            css: [
                opt.rev_source + "/**.css",
                opt.rev_source + "/**/**.css"
            ],
            html: [
                opt.rev_source + "/**.html",
                opt.rev_source + "/**/**.html",
            ]
        }
    },
    // 目录
    dir: {
        // MD5版本号文件目录
        rev: {
            image: opt.rev + "/image",
            font: opt.rev + "/font",
            css: opt.rev + "/css",
            js: opt.rev + "/js"
        },
        // 替换版本后的文件目录(开发调试文件)
        revCollector: {
            img: opt.rev_source,
            css: opt.rev_source,
            html: opt.rev_source
        },
        // 正式文件目录(压缩编译文件)
        dist: {
            images: opt.builds,
            css: opt.builds,
            js: opt.builds,
            html: opt.builds
        },
        // 清除 开发调试文件 && 压缩编译文件
        clean: {
            src: opt.builds,
            revCol: [opt.md5file, opt.rev_source],
            pushfile: opt.push
        }
    },
    // md5 File
    md5file: opt.md5file,
    MD5_server: opt.md5_server,
    flagmd5: opt.flagmd5
};

module.exports = config;