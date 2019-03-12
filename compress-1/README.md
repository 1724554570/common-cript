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
