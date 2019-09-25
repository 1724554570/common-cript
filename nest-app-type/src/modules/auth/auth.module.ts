import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersProviders } from '../users/users.providers';
import { DatabaseModule } from '../../database/db.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../strategy/jwt.strategy';
import { LocalStrategy } from '../../strategy/local.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      privateKey: 'secretKey',
      signOptions: {
        expiresIn: '3600s',
      },
    }),
    DatabaseModule],
  controllers: [AuthController],
  providers: [AuthService, ...UsersProviders, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule { }
