// (function () {

function StorgeImpl() { }

StorgeImpl.Version = "0.0.1";

/**
 * window.sessionStorage.getItem
 * @param {*} name 
 */
StorgeImpl.prototype.getItem = function (name) {
    var sS = sessionStorage || window.sessionStorage;
    if (sS) {
        return sS.getItem(name);
    } else {
        alert("Browser does not support session storage");
    }
    return null;
}

/**
 * window.sessionStorage.setItem
 * @param {*} name 
 * @param {*} value 
 */
StorgeImpl.prototype.setItem = function (name, value) {
    var sS = sessionStorage || window.sessionStorage;
    if (sS) {
        sS.setItem(name, value);
    } else {
        alert("Browser does not support session storage");
    }
}

/**
 * 设置Cookie
 * name, value, timeDay, timeType
 * @param {*} opt {name:'name',value:'value',timeDay:'timeDay',timeType:'timeType'}
 * timeType: Minute 分钟 Hours 小时 默认保存30分钟
 */
StorgeImpl.prototype.setCookie = function (opt) {
    var times = 1;
    var timeDay = (opt.timeDay) ? (opt.timeDay) : 30;
    switch (opt.timeType) {
        case 'Minute':
            times = timeDay * 60 * 1000;
            break;
        case 'Hours':
            times = timeDay * 24 * 60 * 60 * 1000;
            break;
        default:
            times = timeDay * 60 * 1000;
            break;
    }
    var expires = new Date();
    expires.setTime(expires.getTime() + times);
    document.cookie = opt.name + "=" + escape(opt.value) + ";expires=" + expires.toGMTString();
}

/**
 * 读取Cookie
 * @param {*} name 读取的名称
 */
StorgeImpl.prototype.getCookie = function (name) {
    var start = document.cookie.indexOf(name + "=");
    var len = start + name.length + 1;
    if (start == -1) {
        return null;
    }
    var end = document.cookie.indexOf(';', len);
    if (end == -1) {
        end = document.cookie.length;
    }
    // var rulesValue = document.cookie.replace(/(?:(?:^|.*;\s*)'+name+'\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    // return rulesValue;
    return unescape(document.cookie.substring(len, end));
}

/**
 * window.localStorage.setItem
 * @param {*} name 
 * @param {*} value 
 */
StorgeImpl.prototype.lsetItem = function (name, value) {
    window.localStorage.setItem(name, value);
}
/**
 * window.localStorage.getItem
 * @param {*} name 
 * @param {*} value 
 */
StorgeImpl.prototype.lgetItem = function (name, value) {
    window.localStorage.getItem(name, value);
}

/**
 * 创建会话存储
 * @param {*} opt 存储对象 {name:'name',value:'value'}
 * @param {*} type 优先存储格式. sessionStorage , localStorage , cookie
 */
StorgeImpl.prototype.createStorge = function (opt, type) {
    var self = this;
    switch (type) {
        case 'session':
            (window.sessionStorage)
                ? self.setItem(opt.name, opt.value) : (window.localStorage)
                    ? self.lsetItem(opt.name, opt.value) : (document.cookie)
                        ? (self.setCookie({ name: opt.name, value: opt.value, timeDay: 30, timeType: 'Minute' })) : '';
            break;
        case 'local':
            (window.localStorage)
                ? self.lsetItem(opt.name, opt.value) : (window.sessionStorage)
                    ? self.setItem(opt.name, opt.value) : (document.cookie)
                        ? (self.setCookie({ name: opt.name, value: opt.value, timeDay: 30, timeType: 'Minute' })) : '';
            break;
        case 'cookie':
            (document.cookie)
                ? (self.setCookie({ name: opt.name, value: opt.value, timeDay: 30, timeType: 'Minute' })) : (window.sessionStorage)
                    ? self.setItem(opt.name, opt.value) : (window.localStorage)
                        ? self.lsetItem(opt.name, opt.value) : '';
            break;
    }
    // try {
    //     (type == 'session')
    //         ? (window.sessionStorage)
    //             ? self.setItem(opt.name, opt.value) : (window.localStorage)
    //                 ? self.lsetItem(opt.name, opt.value) : (document.cookie)
    //                     ? (self.setCookie({ name: opt.name, value: opt.value, timeDay: 30, timeType: 'Minute' })) : '' : '';
    //     (type == 'local')
    //         ? (window.localStorage)
    //             ? self.lsetItem(opt.name, opt.value) : (window.sessionStorage)
    //                 ? self.setItem(opt.name, opt.value) : (document.cookie)
    //                     ? (self.setCookie({ name: opt.name, value: opt.value, timeDay: 30, timeType: 'Minute' })) : '' : '';
    //     (type == 'cookie')
    //         ? (document.cookie)
    //             ? (self.setCookie({ name: opt.name, value: opt.value, timeDay: 30, timeType: 'Minute' })) : (window.sessionStorage)
    //                 ? self.setItem(opt.name, opt.value) : (window.localStorage)
    //                     ? self.lsetItem(opt.name, opt.value) : '' : '';
    // } catch (error) {
    // }
}

StorgeImpl.prototype.getStorge = function (name) {
    var self = this, sessionvalue = null, localvalue = null, cookievalue = null;
    if (window.sessionStorage) { sessionvalue = self.getItem(name); }
    if (window.localStorage) { localvalue = self.lgetItem(name); }
    if (document.cookie) { cookievalue = self.getCookie(name); }
    return (sessionvalue || localvalue || cookievalue || null);
}

// RequireJS && SeaJS
// if (typeof define === 'function') {
//     define(function () {
//         return new StorgeImpl();
//     });
//     // NodeJS
// } else if (typeof exports !== 'undefined') {
//     module.exports = new StorgeImpl();
// } else {
//     this.storge = new StorgeImpl();
// }

// })();