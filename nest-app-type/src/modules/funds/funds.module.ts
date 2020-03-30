import { Module } from '@nestjs/common';
import FundsService from './funds.service';
import FundsController from './funds.controller';
import { FundsProviders } from './funds.providers';
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
    controllers: [FundsController],
    providers: [
        {
            provide: 'FundsService',
            useClass: FundsService,
        },
        ...FundsProviders,
        JwtStrategy,
    ],
    exports: [FundsService],
})
export class FundsModule { }
