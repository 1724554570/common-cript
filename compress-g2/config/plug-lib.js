/**
 合并 Check Value 
 * @param {type} baseSource 原始数组
 * @param {type} callArray  类型 String 或者 数组
 * @returns {unresolved}
 */
function checkArray(baseSource, callArray) {
    if (typeof callArray === 'object' && callArray instanceof Array) {
        for (let i in callArray) {
            baseSource.push(callArray[i]);
        }
    } else {
        if (baseSource instanceof Array) {
            baseSource.push(callArray);
        }
    }
    return baseSource;
}

module.exports = {
    checkArray: checkArray
};