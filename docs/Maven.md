#### Maven

> 环境变量

```sh
# MAVEN_HOME
# D:\software\apache-maven-3.6.3

# Path
# %MAVEN_HOME%\bin

```

> 仓库设置

```sh
# D:\software\apache-maven-3.6.3\conf
<localRepository>D:\software\maven-repository</localRepository>
```

> 阿里镜像地址

```sh
# 
<mirror>
    <id>alimaven</id>
    <mirrorOf>central</mirrorOf>
    <name>aliyun maven</name>
    <url>http://maven.aliyun.com/nexus/content/repositories/central/</url>
</mirror>
```


### MySQL

> 环境变量

```sh
# MySQL_HOME
# D:\software\mysql-8.0.20-winx64

# Path
# %MySQL_HOME%\bin

```

> 初始化MySQL
```sh
# 会显示随机密码 A temporary password is generated for root@localhost: ZEDNtzLdG9+s
mysqld --initialize --console
```

> 修改随机密码
```sh
# 登录MySQL界面后, 执行
ALTER USER 'root'@'localhost' IDENTIFIED BY 'ZEDNtzLdG9';
```

> 注入服务
```sh
mysqld --install "MySQL"
```

> 登录
```sh
mysql -u root -p
```