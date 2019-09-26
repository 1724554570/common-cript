let request = require('request');
let fs = require('fs');
let md5 = require('md5');
let archiver = require('archiver');
let chalk = require("chalk");
var out = process.stdout;

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

    let readSize = 1 * 1024 * 1024;

    var hash = guid_2();
    function getServerResponse(data, index) {
        var url = 'http://inner.up.cdn.qq.com:8080/uploadserver/uploadfile.jsp';
        url = 'http://127.0.0.1:3000/upload_chunks';
        request({
            url: url,
            method: 'POST',
            headers: {
                'X-CDN-Authentication': opts.token
            },
            body: data,
            qs: {
                index: index,
                ext: 'zip',
                hash: hash,
                total: (function (filepath) {
                    return Math.ceil(fs.statSync(filepath).size / readSize);
                })(zipFilePath),

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
        }, function (a, b, message) {
            console.log(message);
            //fs.unlinkSync(zipFilePath);
            //_Logger('{ ' + zipFilePath + ' upload success. }');
        });
    }

    function upload() {
        //zipFilePath = "jfinal-3.3_demo.zip";
        //zipFilePath = "uploads2.zip";
        var readStream = fs.createReadStream(zipFilePath, {
            flags: 'r',
            highWaterMark: readSize,
            mode: 0666
        });

        //读取文件发生错误事件
        readStream.on('error', (err) => {
            console.log('发生异常:', err);
        });

        //已打开要读取的文件事件
        readStream.on('open', (fd) => {
            console.log('文件已打开:', fd);
        });

        //文件已经就位，可用于读取事件
        readStream.on('ready', () => {
            console.log('文件已准备好..');
        });

        var index = 0;
        //文件读取中事件·····
        readStream.on('data', (chunk) => {
            console.log('read %d bytes: %s', chunk.length, zipFilePath);
//            console.log(`file bytes - ${
//                    (function (filepath) {
//                        var filesize = fs.statSync(filepath).size;
//                        return Math.ceil(filesize / (1 * 1024 * 1024));
//                    })(zipFilePath)
//                    }`);
            getServerResponse(chunk, index);
            index += 1;
        });

        //文件读取完成事件
        readStream.on('end', () => {
            console.log('读取已完成..');
        });

        //文件已关闭事件
        readStream.on('close', () => {
            console.log('文件已关闭！');
        });

        return;
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
                url: url,
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
            }, function (a, b, message) {
                console.log(message);
                //fs.unlinkSync(zipFilePath);
                //_Logger('{ ' + zipFilePath + ' upload success. }');
            });
        });
    }
};

module.exports = toCdnPlugin;