import * as mongoose from 'mongoose';

export const TaxSchema = new mongoose.Schema({
  totalPrice: Number,
  updatePrice: Number,
  discount: Number,
});
