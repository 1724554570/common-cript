// replace(/(\d{2})(?=\d)/g, '$1 ').split(' ');
/**
 * create UUID
 */
function createGuid() {
    const stringKey = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    // tslint:disable-next-line: only-arrow-functions
    return stringKey.replace(/[xy]/g, function(c: string) {
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
};
