#### MongodDB

> Path of DB_HOME
```
%MongodDB_HOME%

D:\mongodb4\bin
```

> 设置数据存储位置
```sh
mongod.exe --dbpath "D:\mongodb4\database"
```

> 设置数据日志位置&文件{文件必须存在}
```sh
mongod.exe --dbpath "D:\mongodb4\logs\mongo.log"
```

> 管理员启动CMD
```sh
mongod -dbpath "D:\mongodb4\database" -logpath "D:\mongodb4\logs\mongo.log" -install -serviceName "MongoDB"
```

> Roles
```sh
# Built-In Roles（内置角色）：
#     1. 数据库用户角色：read、readWrite;
#     2. 数据库管理角色：dbAdmin、dbOwner、userAdmin；
#     3. 集群管理角色：clusterAdmin、clusterManager、clusterMonitor、hostManager；
#     4. 备份恢复角色：backup、restore；
#     5. 所有数据库角色：readAnyDatabase、readWriteAnyDatabase、userAdminAnyDatabase、dbAdminAnyDatabase
#     6. 超级用户角色：root  
#     // 这里还有几个角色间接或直接提供了系统超级用户的访问（dbOwner 、userAdmin、userAdminAnyDatabase）
#     7. 内部角色：__system
# 具体角色的功能： 
# Read：允许用户读取指定数据库
# readWrite：允许用户读写指定数据库
# dbAdmin：允许用户在指定数据库中执行管理函数，如索引创建、删除，查看统计或访问system.profile
# userAdmin：允许用户向system.users集合写入，可以找指定数据库里创建、删除和管理用户
# clusterAdmin：只在admin数据库中可用，赋予用户所有分片和复制集相关函数的管理权限。
# readAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读权限
# readWriteAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的读写权限
# userAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的userAdmin权限
# dbAdminAnyDatabase：只在admin数据库中可用，赋予用户所有数据库的dbAdmin权限。
# root：只在admin数据库中可用。超级账号，超级权限

# 创建所有数据库管理用户
db.createUser({ 
    user: "adminDatabase",
    pwd: "pass@userAdmin",
    roles: [
        { role: "userAdminAnyDatabase", db: "" }
    ] 
})

# 创建所有数据库管理用户
db.createUser({ 
    user: "readWrite",
    pwd: "pass@readWrite",
    roles: [
        { role: "readWrite", db: "admin" }
    ] 
})

```