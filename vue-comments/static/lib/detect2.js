var UA = (function (userAgent) {
    var ISOldIOS     = /OS (\d)_.* like Mac OS X/g.exec(userAgent),
        isOldAndroid = /Android (\d.*?);/g.exec(userAgent) || /Android\/(\d.*?) /g.exec(userAgent);

    // 判断设备是否是IOS7以下
    // 判断设备是否是android4.5以下
    // 判断是否iOS
    // 判断是否android
    // 判断是否QQ浏览器
    return {
        oldIOS    : ISOldIOS ? +ISOldIOS.pop() < 8 : false,
        oldAndroid: isOldAndroid ? +isOldAndroid.pop().substr(0, 3) < 4.5 : false,
        iOS       : /\(i[^;]+;( U;)? CPU.+Mac OS X/.test(userAgent),
        android   : /Android/g.test(userAgent),
        mQQBrowser: /MQQBrowser/g.test(userAgent)
    }

})(navigator.userAgent);

export default UA;