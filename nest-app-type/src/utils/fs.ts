import * as fs from 'fs';
import * as path from 'path';

interface IOpt {
    dirname: string;
    mode?: any;
    callback?: any;
}

/**
 * 递归创建目录 异步方法
 * @param dirname
 * @param mode
 * @param callback
 */
function mkdirs(dirname: string, callback?: any) {
    fs.exists(dirname, (exists) => {
        if (exists) {
            callback();
        } else {
            // console.log(path.dirname(dirname));
            mkdirs(path.dirname(dirname), () => {
                fs.mkdir(dirname, callback);
                console.log('在' + path.dirname(dirname) + '目录创建好' + dirname + '目录');
            });
        }
    });
}

/**
 * 递归创建目录 同步方法
 * @param dirname
 * @param mode
 */
function mkdirsSync(dirname: string) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}

export {
    mkdirs,
    mkdirsSync,
};
