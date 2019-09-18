import * as path from 'path';
import { configure, getLogger } from 'log4js';

const resolve = (dir: string) => {
    return path.join(__dirname, dir);
};

configure({
    appenders: {
        // 控制台输出
        stdout: {
            type: 'stdout',
        },
        console: {
            type: 'console',
        },
        cheese: {
            // 以文件格式存储
            type: 'dateFile',
            // 打印日志级别${trace,debug,info,warn,error,fatal}
            level: 'trace',
            // category分类
            category: 'cheese',
            // 自动创建${filename-pattern}文件
            filename: resolve('../log/cheese.log'),
            pattern: 'yyyy-MM-dd',
            keepFileExt: true,
            // 包含模型
            alwaysIncludePattern: true,
        },
    },
    categories: {
        default: {
            appenders: ['cheese'], level: 'trace',
        },
    },
});

// const logger = getLogger('cheese');

export const Logger = getLogger('cheese');
