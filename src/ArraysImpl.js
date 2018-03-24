/**
 * Arrays Tools
 */
function ArraysImpl() {
    var self = this;

    /**
     * 数组随机取出一个元素或者几个元素。
     * @param {*} array 数组
     * @param {*} count 数量
     */
    self.getRandomArrayElements = function (array, count) {
        var shuffled = array.slice(0), i = array.length, min = i - count, temp, index;
        while (i-- > min) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(min);
    }

    return self;
}