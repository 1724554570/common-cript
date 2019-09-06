import { INCREMENT_ENTHUSIASM, DECREMENT_ENTHUSIASM } from '../const'
import { ModifyCounterAction } from '../action'
import { ICountState, StoreState } from '../types'

const initCountModel = {
    count: 0
};

const countReducer = (state: ICountState = initCountModel, action: ModifyCounterAction): ICountState => {
    switch (action.type) {
        case INCREMENT_ENTHUSIASM:
            return { ...state, count: state.count + 1 }
        case DECREMENT_ENTHUSIASM:
            return { ...state, count: state.count - 1 }
    }
    return state;
}

function enthusiasm(state: StoreState, action: ModifyCounterAction): StoreState {
    switch (action.type) {
        case INCREMENT_ENTHUSIASM:
            return { ...state, enthusiasmLevel: state.enthusiasmLevel + 1 };
        case DECREMENT_ENTHUSIASM:
            return { ...state, enthusiasmLevel: Math.max(1, state.enthusiasmLevel - 1) };
    }
    return state;
}

export {
    countReducer,
    enthusiasm
}