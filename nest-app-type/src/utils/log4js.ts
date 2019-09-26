import * as path from 'path';
import { configure, getLogger } from 'log4js';

const resolve = (dir: string) => {
    return path.join(__dirname, dir);
};

function fmtNumber(val) {
    return val < 10 ? `0${val}` : val;
}
function getTimeDirectory() {
    const date = new Date();
    const year = date.getFullYear();
    const mouth = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}${fmtNumber(mouth)}${fmtNumber(day)}`;
}

configure({
    appenders: {
        // 控制台输出
        stdout: {
            type: 'stdout',
        },
        console: {
            type: 'console',
        },
        // 正常日志
        info: {
            type: 'dateFile',
            filename: resolve(`../log/${getTimeDirectory()}/info.log`),
            pattern: 'yyyy-MM-dd',
            keepFileExt: true,
            alwaysIncludePattern: true,
            maxLogSize: 1024 * 1024 * 2,
            backups: 100
        },
        // 错误日志
        err: {
            type: 'dateFile',
            filename: resolve(`../log/${getTimeDirectory()}/err.log`),
            pattern: 'yyyy-MM-dd',
            keepFileExt: true,
            alwaysIncludePattern: true,
            maxLogSize: 1024 * 1024 * 2,
            backups: 100
        },
        // 错误日志
        out: {
            type: 'dateFile',
            filename: resolve(`../log/${getTimeDirectory()}/out.log`),
            pattern: 'yyyy-MM-dd',
            keepFileExt: true,
            alwaysIncludePattern: true,
            maxLogSize: 1024 * 1024 * 2,
            backups: 100
        },

    },
    categories: {
        default: { appenders: ['info'], level: 'info', },
        err: { appenders: ['err'], level: 'error' },
        out: { appenders: ['out'], level: 'debug' },
    },
});

const Logger = getLogger('info');
const LoggerError = getLogger('err');
const LoggerOther = getLogger('out');

export {
    Logger,
    LoggerError,
    LoggerOther
};
