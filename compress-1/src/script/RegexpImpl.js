"use strict";
function RegExpImpl() { }

RegExpImpl.Version = "0.0.1";

/**
 * Email正则匹配
 * @param {*} value 
 */
RegExpImpl.prototype.email = function (value) {
    var rules = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return rules.test(value);
};

/**
 * 手机号码正则
 * @param {*} value 
 */
RegExpImpl.prototype.phone = function (value) {
    var rules = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
    return rules.test(value);
};

/**
 * URL正则
 * @param {*} value 
 */
RegExpImpl.prototype.url = function (value) {
    var rules = /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return rules.test(value);
};

/**
 * 验证密码6到16位;字母或者数字
 * @param {type} value
 * @returns {undefined}
 */
RegExpImpl.prototype.password = function(value){
    var rules = /^([0-9]|[a-zA-Z]){6,16}$/;
    return rules.test(value);
};

/**
 * 替换所有标签,只有文字的结果
 * @param {*} value 
 */
RegExpImpl.prototype.replaceHTML = function (value) {
    var rules = /<\/?.*?>/g;
    if (value) {
        return value.replace(rules, '');
    }
    return null;
};

/**
 * 提取字符串中的数字以数组方式返回
 * @param {*} value 
 */
RegExpImpl.prototype.getStringNumber = function (value) {
    var rules = /\d{1,}/g;
    return value.match(rules);
};

/**
 * 替换标点符号为 | 分割
 * @param {*} value 
 */
RegExpImpl.prototype.replaceSymbol = function (value) {
    var rules = /[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g;
    return (value.toString()).replace(rules, '|');
};