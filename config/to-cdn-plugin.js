var request = require('request');
var fs = require('fs');
var md5 = require('md5');

var archiver = require('archiver');

const CleanWebpackPlugin = require('clean-webpack-plugin');

var pathsToClean = ['dist/*.*'];
var cleanOptions = {
    verbose: true,
    dry: false
}

function toCdnPlugin(options) {
    this.options = options;
}

toCdnPlugin.prototype.apply = function (compiler) {
    var opts = this.options;
    // console.log(opts);

    var zipFilePath = opts.buildpath + '.zip'

    compiler.plugin('done', function () {

        console.log("\n zipFilePath--------------" + zipFilePath)
        // 压缩成zip文件
        var archive = archiver('zip', {
            // Sets the compression level.
            zlib: { level: 9 }
        });
        var output = fs.createWriteStream(zipFilePath);

        output.on('finish', upload);

        archive.on('error', function (err) {
            throw err;
        });

        // 读取需要压缩的文件路径
        if (opts['zipPath']) {
            archive.directory(opts['zipPath'], '');
        } else {
            archive.directory('dist/', '');
        }

        // 输出压缩包路径
        archive.pipe(output);

        archive.finalize();

    });

    function zipDone() {

        console.log('!!!!!!!!!!!!!!!zipIsDone!!!!!!!!!!!!!!')

    }

    function upload() {
        fs.readFile(zipFilePath, function (err, data) {
            if (err) {
                console.log(err);
                return;
            }
            if (!data.toString()) {
                console.log('file is empty');
                return;
            }
            // console.log(data);
            request({
                url: 'http://inner.up.cdn.qq.com:8080/uploadserver/uploadfile.jsp',
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
                    isunzip: 1,
                }
            }, function () {
                fs.unlinkSync(zipFilePath);
                console.log('{' + zipFilePath + ' -------------- upload success.}');
            });
        });
    }
};

module.exports = toCdnPlugin;