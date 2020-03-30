import * as mongoose from 'mongoose';

export const FundsSchema = new mongoose.Schema({
    // uuid: String,
    // 基金代码
    fundCode: String,
    // 基金名称
    fundNmae: String,
    // 基金价格
    fundPrice: Number,
    // 投入资金
    usePrice: Number,
    // 投入日期
    useTime: String,
    useTime2: String,
    // 是否超过7天
    validDay: { type: Number, default: 0 },
    abs: { type: Number, default: 0 },
    // 持有份额
    useTotal: String,
    // 当前基金价格
    nowPrice: Number,
    // 盈亏
    profitLoss: Number,
    // 盈亏价格
    getPrice: Number,
    // 盈亏百分比
    lossPercent: String,

    created: Date,
    updated: Date,
});
