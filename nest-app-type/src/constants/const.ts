// 用户信息
interface IStatus {
    // 已删除
    remove: number;
    // 未激活
    unactive: number;
    // 已激活
    active: number;
    // 已冻结
    frozen: number;
}

const UStatus: IStatus = {
    remove: 0,
    unactive: 1,
    active: 2,
    frozen: 3,
};

const UStatusRes = {
    0: '已删除',
    1: '未激活',
    2: '已激活',
    3: '已冻结',
};

export {
    UStatus,
    UStatusRes,
};
