import { combineReducers } from 'redux'
// import { countReducer } from './reducers';
import countReducer from './count';

export default combineReducers({
    countReducer,
});