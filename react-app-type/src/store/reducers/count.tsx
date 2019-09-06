import { INCREMENT_ENTHUSIASM, DECREMENT_ENTHUSIASM } from '../const'
import { ModifyCounterAction } from '../action'
import { CountModel } from '../types'

const initCountModel: CountModel = {
    count: 0
};

// const countReducer = (state = initCountModel, action: ModifyCounterAction): CountModel => {
const countReducer = (state = initCountModel, action: ModifyCounterAction) => {
// const countReducer = (state: CountModel, action: ModifyCounterAction) => {
    switch (action.type) {
        case INCREMENT_ENTHUSIASM:
            return { ...state, count: state.count + 1 }
        case DECREMENT_ENTHUSIASM:
            return { ...state, count: state.count - 1 }
    }
    return state;
}

export default countReducer;