const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    // 基本路径
    publicPath: '/',
    // 输出文件目录
    outputDir: 'dist',
    chainWebpack: config => {
        config.resolve.alias.set('@', resolve('src'))
        config.resolve.alias.set('~', resolve('src/assets'))
    },
    configureWebpack: () => {},
    productionSourceMap: false,
    css: {},
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        // port: 8088,
        https: false,
        hotOnly: false,
        proxy: null, // 设置代理
        open: false, //配置自动启动浏览器
        before: app => {}
    },
    // 第三方插件配置
    pluginOptions: {
        // ...
    }
}