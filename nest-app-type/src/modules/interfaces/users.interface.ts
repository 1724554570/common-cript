export interface Users {
    uuid?: string;
    username: string;
    password: string;
    age: number;
    sex: string;
    valid?: number | 1;
    atime?: number;
    utime?: number;
    created?: number;
    updated?: number;
}

export interface Funds {
    // 基金代码
    fundCode: string,
    // 基金名称
    fundNmae?: string,
    // 基金价格
    fundPrice: number,
    // 投入资金
    usePrice: number,
    // 投入日期
    useTime: string,
    // 是否超过7天
    validDay?: number,
    abs?: number,
    // 持有份额
    useTotal?: string,
    // 当前基金价格
    nowPrice?: number,
    // 盈亏
    profitLoss?: number,
    getPrice?: string,
    // 盈亏百分比
    lossPercent?: number,
    created?: number,
    updated?: number,
}