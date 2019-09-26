import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersProviders } from '../users/users.providers';
import { DatabaseModule } from '../../database/db.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../strategy/jwt.strategy';
// import { LocalStrategy } from '../../strategy/local.strategy';
import { UsersModule } from '../users/users.module';
import jwtSecret from '../../constants/jwt.constant';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      privateKey: jwtSecret.secretKey,
      signOptions: {
        expiresIn: 3600,
      },
    }),
    DatabaseModule],
  controllers: [AuthController],
  providers: [{
    provide: 'AuthService',
    useClass: AuthService
  },
  ...UsersProviders,
    JwtStrategy,
  ],
  exports: [AuthService]
})
export class AuthModule { }
