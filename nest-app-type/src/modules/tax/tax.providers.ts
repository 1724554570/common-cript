import { Connection } from 'mongoose';
import { TaxSchema } from '../../schemas/tax.schema';

export const FundsProviders = [
    {
        provide: 'TAX_MODEL',
        useFactory: (connection: Connection) => connection.model('Tax', TaxSchema),
        inject: ['DATABASE_CONNECTION'],
    }
];
