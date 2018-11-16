# common-cript
工作中的技术总结 Technical summary in work


# webpackcfg.json 打包上传文件,
{
    "token": "",                上传KEY
    "username": "",             用户昵称
    "appname": "",              上传位置
    "base": "",                 上传域名
    "path": "",                 上传路径
    "buildpath": "",            上传最终位置
    "zipPath": ""               打包路径
}

# cfg.json 使用cdn地址配置,需要修改 node_modules 插件
{
    "cdn": "",                  sem项目文件的cdn路径
    "root": "",                 项目root路径
    "builds": "builds",         压缩文件
    "publish": "./dist",        发布文件
    "semProject": "",           sem项目文件
    "htmlProject": "",          html5项目文件
    "html5cdn": "",             html5文件的cdn路径
    "html5": true,              是否为html5项目
    "htmlMd5": true             是否进行html5项目Md5文件名
}


# 版本替换
version 0.0.1

# _html5_cfg.js
gulp 和 webpack 打包配置选项

# 需修改文件的目录
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
增加 filePath: '', 开启远程文件路径；
增加 fileHash: '',  true开启远程文件md5版本，false开启远程文件非md5版本；
```js
opts = objectAssign({
    filePath: '',
    fileHash: '',
});
```
新增过滤非css和非js后缀名文件或者所有文件不启用hash；修改 node_modules\gulp-rev\index.js ---修改代码第51行。
所有文件不启用hash；
```js
file.revHash='';
```
过滤非css和非js后缀名文件不启用hash；
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



