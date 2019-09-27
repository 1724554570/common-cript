import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { PassportModule } from '@nestjs/passport';
// import { JwtModule } from '@nestjs/jwt';
//
import { AppController } from './app.controller';
import { AppService } from './app.service';
// 注入模块
import { UsersModule } from '../modules/users/users.module';
import { AuthModule } from '../modules/auth/auth.module';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost:27017/nest', {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // }),
    // PassportModule.register({ defaultStrategy: 'jwt' }),
    // JwtModule.register({
    //   privateKey: 'secretKey',
    //   signOptions: {
    //     expiresIn: '3600s',
    //   },
    // }),
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class ApplicationModule { }
