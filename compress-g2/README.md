## 版本替换
version 0.0.1

## _html5_cfg.js
gulp 和 webpack 打包配置选项

## 需修改文件的目录
node_modules\rev-path\
node_modules\gulp-rev\
node_modules\gulp-rev-collector\

## Gulp 打包静态文件使用远程路径
修改 node_modules\gulp-rev\index.js ---修改代码第144行
```js
manifest[originalFile] = revisionedFile;
```
为
```js
if(opts.fileHash){
    manifest[originalFile] = opts.filePath + revisionedFile;
}else{
    manifest[originalFile] = opts.filePath + originalFile;
}
```
修改 node_modules\gulp-rev\index.js ---修改代码第123行。
增加参数设置或配置 manifest({filePath:'',fileHash:''}); 传入(以支持144行代码判断)；
```js
opts = objectAssign({
    filePath: '', //开启远程文件路径；
    fileHash: '', //true开启远程文件hash版本，false开启远程文件非hash版本；
});
```
新增过滤非css和非js后缀名文件或者所有文件不使用hash；修改 node_modules\gulp-rev\index.js ---修改代码第51行。
```js
// 所有文件不使用hash
file.revHash='';
```
过滤非css和非js后缀名文件不使用hash；
```js
if(extension!=='.css'&&extension!=='.js'){
    file.revHash='';
}
```
修改 node_modules\rev-path\index.js ---修改代码第10行
```js
return filename + '-' + hash + ext;
```
为
```js
if (hash) {
    return filename + '-' + hash + ext;
} else {
    return filename + hash + ext;
}
```


## Gulp 打包静态文件使用参数形式Hash后缀, 格式: base.css?v=f7e3192318
修改 node_modules\gulp-rev-collector\index.js 代码第41行
```js
if (!~[
        path.basename(key),
        _mapExtnames(path.basename(key), opts)
    ].indexOf(cleanReplacement)
) {
    isRev = 0;
}
```
为
```js
if ( path.basename(json[key]).split('?')[0] !== path.basename(key) ) {
    isRev = 0;
}
```
修改 node_modules\rev-path\index.js 代码第10行
```js
return filename + '-' + hash + ext;
```
为
```js
return filename + ext;
```
修改 node_modules\gulp-rev\index.js 代码第144行
```js
manifest[originalFile] = revisionedFile;
```
为
```js
manifest[originalFile] = originalFile + '?v=' + file.revHash;
```


## old package
```
{
    "devDependencies": {
        "chalk": "^2.4.1",
        "gulp": "^3.9.1",
        "gulp-cache": "^0.4.5",
        "gulp-clean": "^0.3.2",
        "gulp-clean-css": "^2.0.11",
        "gulp-css-spriter": "^0.4.0",
        "gulp-htmlmin": "^2.0.0",
        "gulp-imagemin": "^3.4.0",
        "gulp-jshint": "^2.1.0",
        "gulp-minify-html": "^1.0.6",
        "gulp-rev": "^7.1.0",
        "gulp-rev-collector": "^1.2.4",
        "gulp-sequence": "^0.4.5",
        "gulp-uglify": "^1.5.4",
        "imagemin-pngquant": "^5.0.0",
        "live-server": "^1.2.0"
    },
    "dependencies": {
        "archiver": "^2.1.1",
        "clean-webpack-plugin": "^0.1.18",
        "css-loader": "^0.23.1",
        "extract-text-webpack-plugin": "^3.0.2",
        "file-loader": "^0.8.5",
        "fs": "0.0.1-security",
        "html-loader": "^0.3.0",
        "html-webpack-plugin": "^2.30.1",
        "md5": "^2.2.1",
        "request": "^2.83.0",
        "url-loader": "^0.6.2",
        "webpack": "^3.10.0",
        "webpack-merge": "^4.1.1"
    }
}
```

```
    // node_modules\gulp-htmlmin\node_modules\html-minifier\src\htmlminifier.js
    // new HTMLParser(value, {chars:function(){ }})
    // isExecutableScript(currentTag, currentAttrs)
    // }

    //
        //if(getTypeHtml(currentAttrs)){
        //   text = text.replace(/\r\n/g,"");
        //}
        if(getTypeHtml(currentAttrs)){
          //text = text.replace(/\r\n/g,"");
          var textArray = text.split(/\r\n/g);
          var text1 = textArray.map((item,key)=>{
              return item.trims('lr');
          });
          text = text1.join('');
        }

  
    function getTypeHtml(currentAttrs) {
        if (currentAttrs && currentAttrs[0] && currentAttrs[0].value.toLowerCase() === 'text/html') {
            return true;
        }
        return false;
    }
    String.prototype.trims = function(type){
        type = (type||'lr').toLowerCase();
        return type==="lr"?this.replace(/(^\s*)|(\s*$)/g, ""):type==='l'? this.replace(/(^\s*)/g, ""):type==='r'? this.replace(/(^\s*)/g, ""):'';
    };
```