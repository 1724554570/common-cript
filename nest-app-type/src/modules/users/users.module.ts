import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersProviders } from './users.providers';
import { DatabaseModule } from '../../database/db.module';
import { JwtStrategy } from '../../strategy/jwt.strategy';
// import { PassportModule } from '@nestjs/passport';
// import { JwtModule } from '@nestjs/jwt';
// import { LocalStrategy } from '../../strategy/local.strategy';
// import jwtSecret from '../../constants/jwt.constant';

@Module({
    imports: [
        DatabaseModule,
    ],
    controllers: [UsersController],
    providers: [
        {
            provide: 'UsersService',
            useClass: UsersService,
        },
        ...UsersProviders,
        JwtStrategy,
    ],
    exports: [UsersService],
})
export class UsersModule { }
