import { INCREMENT_ENTHUSIASM, DECREMENT_ENTHUSIASM } from '../const';

interface IncrementEnthusiasm {
    type: INCREMENT_ENTHUSIASM
}

interface DecrementEnthusiasm {
    type: DECREMENT_ENTHUSIASM
}

function increment(): IncrementEnthusiasm {
    return {
        type: INCREMENT_ENTHUSIASM
    }
}

function decrement(): DecrementEnthusiasm {
    return {
        type: DECREMENT_ENTHUSIASM
    }
}

// 定义 modifyAction 类型，包含 IINCREMENTAction 和 IDECREMENTAction 接口类型
export type ModifyCounterAction = IncrementEnthusiasm | DecrementEnthusiasm;

export {
    increment,
    decrement,
}