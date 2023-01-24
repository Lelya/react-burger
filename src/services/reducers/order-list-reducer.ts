import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR, WS_GET_MESSAGE
} from '../actions';
import {TOrder} from "../../utils/types";
import {TWSListOrderActions} from "../actions/web-socket";

export type TOrderListInitialState = {
    orders: ReadonlyArray<TOrder>,
    total: number,
    totalToday: number,
    ordersRequest: boolean;
    ordersFailed: boolean;
}

export const orderListInitialState: TOrderListInitialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    ordersRequest: false,
    ordersFailed: false,
}

export const orderListReducer  = (state = orderListInitialState, action: TWSListOrderActions) => {
    switch (action.type) {
        case WS_CONNECTION_START: {
            return { ...state, ordersRequest: true };
        }
        case WS_CONNECTION_SUCCESS: {
            return { ...state, ordersRequest: false, ordersFailed: false};
        }
        case WS_CONNECTION_ERROR: {
            return { ...state, ordersFailed: true, ordersRequest: false};
        }
        case WS_GET_MESSAGE: {
            return { ...state, ordersFailed: false, orders: action.payload.orders, total: action.payload.total, totalToday: action.payload.totalToday};
        }

        default: {
            return state;
        }
    }
}