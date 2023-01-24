import {
    WS_USER_CONNECTION_START,
    WS_USER_CONNECTION_SUCCESS,
    WS_USER_CONNECTION_ERROR,
    WS_USER_GET_MESSAGE
} from '../actions';
import {TOrder} from "../../utils/types";
import {TWSListUserOrderActions} from "../actions/web-socket-user";

type TOrderListUserActions = {
    orders: ReadonlyArray<TOrder>,
    total: number,
    totalToday: number,
    ordersRequest: boolean;
    ordersFailed: boolean;
}

export const orderListUserInitialState: TOrderListUserActions = {
    orders: [],
    total: 0,
    totalToday: 0,
    ordersRequest: false,
    ordersFailed: false,
}
export const orderListUserReducer  = (state = orderListUserInitialState, action: TWSListUserOrderActions) => {
    switch (action.type) {
        case WS_USER_CONNECTION_START: {
            return { ...state, ordersRequest: true };
        }
        case WS_USER_CONNECTION_SUCCESS: {
            return { ...state, ordersRequest: false, ordersFailed: false};
        }
        case WS_USER_CONNECTION_ERROR: {
            return { ...state, ordersFailed: true, ordersRequest: false};
        }
        case WS_USER_GET_MESSAGE: {
            return { ...state, ordersRequest: false, ordersFailed: false, orders: action.payload.orders.reverse(), total: action.payload.total, totalToday: action.payload.totalToday};
        }

        default: {
            return state;
        }
    }
}