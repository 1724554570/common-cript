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