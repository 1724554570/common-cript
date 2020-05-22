export class CreateUsersDto {
    readonly username: string;
    readonly password: string;
    readonly age: number;
    readonly sex: string;
}

export class CreateFundsDto {
    // 基金代码
    // 基金名称
    // 基金价格
    // 投入资金
    // 投入日期
    // 确认日期
    readonly fundCode: string;
    readonly fundNmae: string;
    readonly fundPrice: number;
    readonly usePrice: number;
    readonly useTime: string;
    readonly useTime2: string;
}


export class CreateTaxDto {
    readonly totalPrice: number;
    readonly updatePrice: number;
    readonly discount: number;
}