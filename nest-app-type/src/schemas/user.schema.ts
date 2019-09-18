
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    uuid: String,
    name: String,
    age: Number,
    sex: String,
    atime: Number,
    utime: Number,
    created: Date,
    updated: Date,
    valid: { type: Number, default: 1 },
});
