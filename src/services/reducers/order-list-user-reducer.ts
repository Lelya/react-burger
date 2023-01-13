import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR, WS_GET_MESSAGE
} from '../actions';
import {TOrder} from "../../utils/types";
import {TWSActions} from "../actions/web-socket";

type TOrderListUserActions = {
    ordersUser: ReadonlyArray<TOrder>,
    total: number,
    totalToday: number,
    ordersRequest: boolean;
    ordersFailed: boolean;
}

const orderListUserInitialState: TOrderListUserActions = {
    ordersUser: [],
    total: 0,
    totalToday: 0,
    ordersRequest: false,
    ordersFailed: false,
}
export const orderListUserReducer  = (state = orderListUserInitialState, action: TWSActions) => {
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
            return { ...state, ordersFailed: false, orders: action.payload.orders.reverse(), total: action.payload.total, totalToday: action.payload.totalToday};
        }

        default: {
            return state;
        }
    }
}