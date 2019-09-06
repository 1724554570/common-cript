import { INCREMENT_ENTHUSIASM, DECREMENT_ENTHUSIASM } from '../const'
import { ModifyCounterAction } from '../action'
import { ICountState } from '../types'

const initState: ICountState = {
    count: 0
};

// const countReducer = (state = initState, action: ModifyCounterAction): ICountState => {
const countReducer = (state = initState, action: ModifyCounterAction) => {
// const countReducer = (state: ICountState, action: ModifyCounterAction) => {
    switch (action.type) {
        case INCREMENT_ENTHUSIASM:
            return { ...state, count: state.count + 1 }
        case DECREMENT_ENTHUSIASM:
            return { ...state, count: state.count - 1 }
    }
    return state;
}

export default countReducer;