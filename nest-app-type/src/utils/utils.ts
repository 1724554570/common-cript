// replace(/(\d{2})(?=\d)/g, '$1 ').split(' ');
import { join } from 'path';

function resolveDir(dir: string) {
    return join(__dirname, '..', dir);
}

function resolvePath(params: string) {
    return join(__dirname, params);
}

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
/**
 * create UUID
 */
function createGuid() {
    const stringKey = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    // tslint:disable-next-line: only-arrow-functions
    return stringKey.replace(/[xy]/g, function (c: string) {
        // tslint:disable-next-line: no-bitwise
        const r: number = Math.random() * 16 | 0;
        // tslint:disable-next-line: no-bitwise triple-equals
        const v = (c == 'x') ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function getTimeStamp() {
    return Math.floor(new Date().getTime());
}

export {
    createGuid,
    getTimeStamp,
    resolveDir,
    resolvePath,
    getTimeDirectory,
};
