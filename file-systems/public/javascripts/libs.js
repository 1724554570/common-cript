function Devive() {

    this.os = function() {
        // 
        var _platform = navigator.platform;

    };

    this.browser = function() {
        var ua = navigator.userAgent;
        var brs = ua.toLowerCase();
        return (function() {
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
    this.debounce = function(fn, wait) {
        var timeout = null;
        return function() {
            if (timeout !== null) clearTimeout(timeout);
            timeout = setTimeout(fn, wait);
        }
    }

}

function libs() {}

/**
 * 获取UUID,GUID字符
 */
libs.prototype.get_Guid = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0;
        var v = c == 'x' ? r : (r & 0x3 | 0x8);
        var str = v.toString(16).replace(/\-/ig, '');
        return str;
    });
}