
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Kill Port
```
netstat -nao | findstr 3000

taskkill /f /pid 10988 
```


## Use Command
```
generate(简写：g) 生成文件
class (简写: cl) 类
controller (简写: co) 控制器
decorator (简写: d) 装饰器
exception (简写: e) 异常捕获
filter (简写: f) 过滤器
gateway (简写: ga) 网关
guard (简写: gu) 守卫
interceptor (简写: i) 拦截器
middleware (简写: mi) 中间件
module (简写: mo) 模块
pipe (简写: pi) 管道
provider (简写: provider) 供应商
service (简写: s) 服务
```

## Auth
```
yarn add -D @nestjs/passport passport passport-local @types/passport-local
yarn add -D @nestjs/jwt passport-jwt @types/passport-jwt
```

## 结构
```
strategy  策略
```