import * as mongoose from 'mongoose';

export const dbProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async (): Promise<typeof mongoose> => {
            return await mongoose.connect('mongodb://localhost:27017/nest', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        },
    },
];
