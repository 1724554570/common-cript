let request = require('request');
let fs = require('fs');
let md5 = require('md5');
let archiver = require('archiver');
let chalk = require("chalk");

/**
 * 初始化 上传插件设置
 * @param {*} options 
 */
function toCdnPlugin(options) {
    // 是否是上传 html5 活动
    if (options.html5) {
        options.path = options.html5_path;
        options.buildpath = options.html5_buildpath;
    }
    this.options = options;
}

/**
 * cmd 颜色输出
 * @param {*} string 
 */
function _Logger(string) {
    let str = "";
    let logger = str.concat("\n", string);
    console.log(chalk.red(logger));
}
function guid_2() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        let str = v.toString(16).replace(/\-/ig, '');
        return str;
    });
}
toCdnPlugin.prototype.apply = function (compiler) {
    let opts = this.options;
    let zipFilePath = opts.buildpath + '.zip';
    compiler.plugin('done', function () {
        _Logger("zipFilePath: " + zipFilePath);
        _Logger("Options: " + JSON.stringify(opts));
        _Logger(" ");
        // 压缩成zip文件
        let archive = archiver('zip', {
            // Sets the compression level.
            zlib: {
                level: 9
            }
        });
        let output = fs.createWriteStream(zipFilePath);

        output.on('finish', function () {
            _Logger("file finish");
            upload();
        });

        archive.on('error', function (err) {
            throw err;
        });

        // 读取需要压缩的文件路径
        if (opts['zipPath']) {
            archive.directory(opts['zipPath'], '');
        } else {
            archive.directory('./pushFile/dist/', '');
        }

        // 输出压缩包路径
        archive.pipe(output);

        archive.finalize();

    });

    function upload() {
        fs.readFile(zipFilePath, function (err, data) {
            if (err) {
                console.log(err);
                return;
            }
            if (!data.toString()) {
                _Logger("file is empty");
                return;
            }
            request({
                url: opts.base,
                method: 'POST',
                headers: {
                    'X-CDN-Authentication': opts.token
                },
                body: data,
                qs: {
                    appname: opts.appname,
                    user: opts.username,
                    filename: opts.buildpath,
                    filetype: 'zip',
                    filepath: (opts.path + opts.buildpath),
                    filesize: (function (filepath) {
                        return fs.statSync(filepath).size;
                    })(zipFilePath),
                    filemd5: (function (filepath) {
                        return md5(fs.readFileSync(filepath)).toLowerCase();
                    })(zipFilePath),
                    isunzip: 1
                }
            }, function (error, response, message) {
                console.log(`${message}`);
                fs.unlinkSync(zipFilePath);
            });
        });
    }
};

module.exports = toCdnPlugin;