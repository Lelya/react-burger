import {
    GET_ORDER_LIST_REQUEST, GET_ORDER_LIST_SUCCESS, GET_ORDER_LIST_ERROR
} from '../actions';
import {TOrder} from "../../utils/types";
import {TOrderListActions} from "../actions/order-list-actions";

type TOrderListInitialState = {
    orders: ReadonlyArray<TOrder>,
    total: number,
    totalToday: number,
    isLoading: boolean,
    isError: boolean,
}

const orderListInitialState: TOrderListInitialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    isLoading: false,
    isError: false,
}

export const orderListReducer  = (state = orderListInitialState, action: TOrderListActions) => {
    switch (action.type) {
        case GET_ORDER_LIST_REQUEST: {
            return {...state, isLoading: true};
        }
        case GET_ORDER_LIST_SUCCESS: {
            return {...state, isLoading: false, orders: action.orders, isError: false};
        }
        case GET_ORDER_LIST_ERROR: {
            return {...state, isLoading: false, isError: true};
        }
        default: {
            return state;
        }
    }
}