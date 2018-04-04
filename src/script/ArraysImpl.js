/**
 * Arrays Tools
 */
function ArraysImpl() {
    this.Version = "0.0.1";
}

/**
 * 显示变量类型
 * @param {*} o 
 */
ArraysImpl.prototype.isType = function (o) {
    return Object.prototype.toString.call(o);
};

/**
 * 数组随机取出一个元素或者几个元素。
 * @param {*} array 数组
 * @param {*} count 数量
 */
ArraysImpl.prototype.getRandomArrayElements = function (array, count) {
    console.time("getRandomArrayElements time");
    var shuffled = array.slice(0), i = array.length, min = i - count, temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    console.timeEnd("getRandomArrayElements time");
    return shuffled.slice(min);
};

ArraysImpl.prototype.duffsDevice = function (object) {
    var len = (object instanceof Array);
    var iterations = Math.floor(object.length / 8),
        startAt = object.length % 8,
        i = 0;
    console.time("duffsDevice");
    var process = function (v) {
    }
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
    console.timeEnd("duffsDevice");
};


