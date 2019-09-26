### 特别感谢 localResizeIMG 的作者
GitHub: https://github.com/think2011/
本插件修改修改版本为旧版localResizeIMG3与新版localResizeIMG合并部分升级而来

### 使用方式
页面引入 import lrz from 'xxx'; xxx为插件位置
```js
import lrz from "../../static/lib/lrz2";
```
页面放入公用类型方法
```js
let getUpImageBase64 = (path, callback) => {
  path = path || this.files[0];
  new lrz(path, {
    before: function() {
      console.log("压缩开始");
    },
    fail: function(err) {
      console.error(err);
    },
    always: function() {
      console.log("压缩结束");
    },
    done: function(results) {
      // 你需要的数据都在这里，可以以字符串的形式传送base64给服务端转存为图片。
      console.log(results);
      // console.log("原始图片", results.origin, results.origin.size);
      // console.log(
      //   "客户端预压的图片",
      //   results.base64,
      //   results.base64.length * 0.8
      // );
      typeof callback === "function" && callback(results);
    }
  });
};
```
具体调用, 例如vue2版本: input file 触发change事件调用
```js
onFileUpload: function() {
      let self = this;
      let path = this.$refs.uploadID.files[0];
      getUpImageBase64(path, function(res) {
        let base64 = res.base64;
        self.$set(self.arrayImage, self.imgPath, base64);
      });
}
```