import * as mongoose from 'mongoose';

export const dbProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async (): Promise<typeof mongoose> => {
            return await mongoose.connect('mongodb://root:root@localhost:27017/dbnest', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        },
    },
    {
        provide: 'DATABASE_CONNECTION_DBNEST',
        useFactory: async (): Promise<typeof mongoose> => {
            return await mongoose.connect('mongodb://localhost:27017/nest', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        },
    },
];
