
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    uuid: String,
    username: String,
    password: String,
    age: Number,
    sex: String,
    atime: Number,
    utime: Number,
    created: Date,
    updated: Date,
    valid: { type: Number, default: 1 },
    status: { type: Number, default: 1 },
});
