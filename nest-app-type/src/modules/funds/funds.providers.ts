import { Connection } from 'mongoose';
import { FundsSchema } from '../../schemas/fund.schema';

export const FundsProviders = [
    {
        provide: 'FUNDS_MODEL',
        useFactory: (connection: Connection) => connection.model('Funds', FundsSchema),
        inject: ['DATABASE_CONNECTION'],
    }
];
