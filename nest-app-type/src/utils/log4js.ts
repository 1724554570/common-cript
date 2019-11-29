import { configure, getLogger } from 'log4js';
import { resolveDir, getTimeDirectory } from '../utils/utils';

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
            filename: resolveDir(`log/${getTimeDirectory()}/info.log`),
            pattern: 'yyyy-MM-dd',
            keepFileExt: true,
            alwaysIncludePattern: true,
            maxLogSize: 1024 * 1024 * 2,
            backups: 100
        },
        // 错误日志
        err: {
            type: 'dateFile',
            filename: resolveDir(`log/${getTimeDirectory()}/err.log`),
            pattern: 'yyyy-MM-dd',
            keepFileExt: true,
            alwaysIncludePattern: true,
            maxLogSize: 1024 * 1024 * 2,
            backups: 100
        },
        // 错误日志
        out: {
            type: 'dateFile',
            filename: resolveDir(`log/${getTimeDirectory()}/out.log`),
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
