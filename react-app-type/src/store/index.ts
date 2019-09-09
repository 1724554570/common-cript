import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";

// Reducers
import countReducers from './reducers/countReducers';

const REDUX_DEVTOOLS_EXTENSION_COMPOSE = (window as any) && (window as any).REDUX_DEVTOOLS_EXTENSION_COMPOSE;
const composeEnhancers = REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const reducer = combineReducers({
    countPage: countReducers
});

const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;