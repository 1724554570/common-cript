import { Module } from '@nestjs/common';
import TaxService from './tax.service';
import TaxController from './tax.controller';
import { FundsProviders } from './tax.providers';
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
    controllers: [TaxController],
    providers: [
        {
            provide: 'TaxService',
            useClass: TaxService,
        },
        ...FundsProviders,
        JwtStrategy,
    ],
    exports: [TaxService],
})
export class TaxModule { }
