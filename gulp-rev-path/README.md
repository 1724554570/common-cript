## 更新模式
因部分文件的代码快少,抽离集合到gulp-rev-path文件夹下


## 项目结构说明
```
├── gulp-rev-path             源码目录
|   ├── rev-path.js           文件拷贝(copy)于rev-path库文件
|   ├── rev-hash.js           文件拷贝(copy)于rev-hash库文件
|   ├── modify-filename.js    文件拷贝(copy)于modify-filename库文件
|   ├── index.js              文件拷贝(copy)于gulp-rev库文件(文件脚本有调整)
|   ├── collector.js          文件拷贝(copy)于gulp-rev-collector库文件(暂未使用)
|   └── package.json          库文件
```

### 静态文件使用远程路径,使用Hash文件名称
```js
    // filePath: '',    //远程路径地址
    // fileHash: false  //是否使用Hash文件名称
var rev = require('gulp-rev-path');
    rev.manifest({filePath: "", fileHash: false});
```

### 预设调整调用方式
```js
    if(opts.fileFunc && typeof opts.fileFunc === 'function'){
        opts.fileFunc(revisionedFile, originalFile, manifest, opts);
    }else{
        if (opts.filePath && opts.fileHash) {
            manifest[originalFile] = opts.filePath + revisionedFile;
        }
        //manifest[originalFile] = revisionedFile;
        manifest[originalFile] = originalFile;
    }
```