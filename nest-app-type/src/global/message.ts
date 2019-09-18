/**
 * 接口返回模版
 */
export interface Message {
    code: number;
    message: string;
    data: any;
    Res?: any;
}

/**
 * 查询返回
 * @param res
 */
export function querySuccess(res: any): Message {
    return { code: 200, message: '查询成功', data: res };
}

/**
 * 创建返回
 * @param res
 */
export function createSuccess(res: any): Message {
    return { code: 200, message: '创建成功', data: [], Res: res };
}
