"use strict";
/**
 * Arrays Tools
 */
function ArraysImpl() { }

ArraysImpl.Version = "0.0.1";

/**
 * 显示变量类型
 * @param {*} o 
 */
ArraysImpl.prototype.isType = function (o) {
    // return Object.prototype.toString.call(o);
    return ({}).toString.call(o);
};

/**
 * 数组随机取出一个元素或者几个元素。
 * @param {*} array 数组
 * @param {*} count 数量
 */
ArraysImpl.prototype.getRandomArrayElements = function (array, count) {
    var newArray = [], i = array.length, min = i - count, temp;
    while (i-- > min) {
        var index = Math.floor((i + 1) * Math.random());
        newArray.push(array[index]);
    }
    return newArray;
};

/**
 * 数组去重
 * @param {*} array 
 */
ArraysImpl.prototype.unique = function (array) {
    var res = [], json = {}, i = 0, len = array.length;
    for (i; i < len; i++) {
        var type = ({}).toString.call(array[i]); // 不加类型 分不清 1 '1'
        if (!json[array[i] + type]) {
            json[array[i] + type] = 1;
            res.push(array[i]);
        }
    }
    return res;
};

ArraysImpl.prototype.duffsDevice = function (object) {
    var len = (object instanceof Array);
    var iterations = Math.floor(object.length / 8),
        startAt = object.length % 8,
        i = 0;
    var process = function (v) { }
    do {
        switch (startAt) {
            case 0: process(object[i++]);
            case 7: process(object[i++]);
            case 6: process(object[i++]);
            case 5: process(object[i++]);
            case 4: process(object[i++]);
            case 3: process(object[i++]);
            case 2: process(object[i++]);
            case 1: process(object[i++]);
        }
        startAt = 0;
    } while (--iterations);
};
