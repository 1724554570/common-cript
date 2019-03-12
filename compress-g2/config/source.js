// +----------------------------------------------------------------------
// | 编译配置文件中心
// +----------------------------------------------------------------------
let cfg = require('../_configuration.js');
// 项目目录
let project = "./config/dist";
if (cfg.html5_Project || cfg.sem_Project) {
    project = (cfg.html5 ? cfg.html5_Project : cfg.sem_Project);
}
let cdn = (cfg.html5) ? cfg.html5_cdn : cfg.sem_cdn;
let push = cfg.publish;
let pushRev = push + "/rev";
let pushRevCollector = push + "/revCollector";
let version = cfg.version;
let release = cfg.release;
let staticHash = cfg.staticHash;
let imagesHash = cfg.imagesHash;

let config = {
    // 资源文件
    source: {
        // 源文件
        src: {
            copyFile: project + "/**/**.{mp3,json,swf,woff,woff2}",//,eot,svg,ttf
            tools: "./tools/*.js",
            images: [project + "/**/**.{png,jpg,gif,ico}"],
            font: project + "/font/*",
            css: [project + "/**/**.css"],
            js: [project + "/**/**.js"],
            jshtml: [project + "/js/**/**.html"],
            html: [project + "/**/**.html"]
        },
        // Hash文件json目录
        rev: {
            revFile: pushRev + "/**/**.json"
        },
        // 替换版本后的文件
        revCollector: {
            js: [version + "/**/**.js"],
            css: [version + "/**/**.css"],
            html: [pushRevCollector + "/**/**.html"]
        }
    },
    // 目录
    dir: {
        // Hash文件json目录
        rev: {
            revFile: pushRev
        },
        // 替换版本后的文件目录(开发调试文件)
        revCollector: {
            img: pushRevCollector,
            css: pushRevCollector,
            html: pushRevCollector
        },
        // 正式文件目录(压缩编译文件)
        dist: {
            version: version,
            release: release
        },
        // 清除 开发调试文件 && 压缩编译文件
        clean: {
            pushfile: push
        }
    },
    loader_files: cfg.loader_files,
    CDN: cdn,
    IMAGES_Hash: imagesHash,
    SCRIPT_Hash: staticHash,
    staticHash: staticHash
};

module.exports = config;