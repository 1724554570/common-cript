
var storgeImpl = new StorgeImpl();
storgeImpl.createStorge({ name: 'StorgeImpl', value: 'testDemo' }, 'cookie')
var storgeValue = storgeImpl.getStorge('StorgeImpl');

var arraysImpl = new ArraysImpl();
var arrayString = ["aa", "bb", "cc", "dd", "ee"];
var numbers = 2
console.time("arrayString");
for (var i = 0; i < 1 * numbers * 1000; i++) {
    arrayString.push("aa" + i + "k");
}
console.timeEnd("arrayString");
console.log(arraysImpl.getRandomArrayElements(arrayString, 1 * numbers));

var arr = [1, 2, 3, 3, 3, '0', '1', '2', '测试', '重复', '重复', NaN, NaN, false, false];
console.log(arraysImpl.unique(arr));

var regExpImpl = new RegExpImpl();
var str = '2017-05-15T09:10:23 Europe/Paris';
var arr = regExpImpl.getStringNumber(str);
console.log(arr);
