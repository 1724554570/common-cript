
// 写缓存
var storgeImpl = new StorgeImpl();
storgeImpl.createStorge({ name: 'StorgeImpl', value: 'testDemo' }, 'cookie');
var storgeValue = storgeImpl.getStorge('StorgeImpl');

// 抽取随机数
var arraysImpl = new ArraysImpl();
var arrayString = ["aa", "bb", "cc", "dd", "ee"];
var numbers = 2;
console.time("arrayString");
for (var i = 0; i < 1 * numbers * 10000; i++) {
    arrayString.push("aa" + i + "k");
}
console.timeEnd("arrayString");
console.log(arraysImpl.getRandomArray(arrayString, 1 * numbers));

// 去重
var arr = [1, 2, 3, 3, 3, '0', '1', '2', '测试', '重复', '重复', NaN, NaN, false, false];
console.log(arraysImpl.unique(arr));

var regExpImpl = new RegExpImpl();
// 读取字符串中的数字,以数组方式返回
var str = '2017-05-15T09:10:23 Europe/Paris';
var arr = regExpImpl.getStringNumber(str);
console.log(arr);
console.log(RegExpImpl.prototype);

// 浏览器弹出输入
// var n = parseInt(window.prompt('请输入n的次数'));
// var p = 2;
// for (var i = 0; i < n; i++) {
//     p *= 2;
// }
// document.write(p+'\n')

// document.write(p)
