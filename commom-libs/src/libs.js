function Devive() {

    this.os = function () {
        // 
        var _platform = navigator.platform;

    };

    this.browser = function () {
        var ua = navigator.userAgent;
        var brs = ua.toLowerCase();
        return (function () {
            return {
                isWeixin: (brs.match(/MicroMessenger/i) == "micromessenger") ? true : false,
                isQQBrowser: (brs.match(/MQQBrowser/i) == "mqqbrowser") ? true : false,
                isiPad: (ua.match(/(iPad|iPod)/i) != null) ? true : false
            }
        })();
    };

    /**
     * Input输入查下,节流
     */
    this.debounce = function (fn, wait) {
        var timeout = null;
        return function () {
            if (timeout !== null) clearTimeout(timeout);
            timeout = setTimeout(fn, wait);
        }
    }

}



function queryParams(url) {
    this.params = function() {
        var name, value;
        var str = decodeURIComponent(url || location.href);
        var num = str.indexOf("?");
        if (num < 0) {
            num = str.indexOf("#");
        }
        str = str.substr(num + 1);
        var Vlreg = /\#|\?/g;
        var macth_c = Vlreg.test(str);
        if (macth_c) {
            str = str.replace(Vlreg, '&');
        }
        var arr = str.split("&");
        var i = 0;
        var object = {};
        for (i; i < arr.length; i++) {
            num = arr[i].indexOf("=");
            if (num > 0) {
                name = arr[i].substring(0, num);
                value = arr[i].substr(num + 1);
                if (!object[name]) {
                    object[name] = value;
                }
            }
        }
        return object;
    };

    return this.params();
}