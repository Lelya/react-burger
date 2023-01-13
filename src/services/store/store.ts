import { createStore, compose, applyMiddleware  } from "redux";
import { rootReducer } from '../reducers';
import thunk from 'redux-thunk';
import {socketMiddleware} from "../middleware/socketMiddleware";

declare global {
    interface Window { __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: typeof compose; }
}

export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk), applyMiddleware(socketMiddleware()));

export const store = createStore(rootReducer, enhancer);



