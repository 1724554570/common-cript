/**
 * 
 */
function RegExpImpl() {
    this.VERSION = "0.0.1";
}

/**
 * Email正则匹配
 * @param {*} value 
 */
RegExpImpl.prototype.email = function (value) {
    return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(value);
}

/**
 * 手机号码正则
 * @param {*} value 
 */
RegExpImpl.prototype.phone = function (value) {
    return /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/.test(value);
}

/**
 * URL正则
 * @param {*} value 
 */
RegExpImpl.prototype.url = function (value) {
    return /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(value);
}