import { INCREMENT_ENTHUSIASM, DECREMENT_ENTHUSIASM } from '../const'
import { ICountState, IAction } from '../types'

const initCountModel: ICountState = {
    count: 0
};

const countReducer = (state = initCountModel, action: IAction): ICountState => {
    let { type } = action;
    switch (type) {
        case INCREMENT_ENTHUSIASM:
            return { ...state, count: state.count + 1 }
        case DECREMENT_ENTHUSIASM:
            return { ...state, count: state.count - 1 }
        default:
            return { ...state }
    }
}

export default countReducer;