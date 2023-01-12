import {
    GET_ORDER_LIST_REQUEST,
    GET_ORDER_LIST_SUCCESS,
    GET_ORDER_LIST_ERROR,
    GET_ORDER_LIST_USER_REQUEST,
    GET_ORDER_LIST_USER_SUCCESS, GET_ORDER_LIST_USER_ERROR
} from '../actions';
import {TOrder} from "../../utils/types";
import {TOrderListActions, TOrderListUserActions} from "../actions/order-list-actions";

type TOrderListIUserInitialState = {
    orders: ReadonlyArray<TOrder>,
    total: number,
    totalToday: number,
    isLoading: boolean,
    isError: boolean,
}

const orderListUserInitialState: TOrderListIUserInitialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    isLoading: false,
    isError: false,
}

export const orderListUserReducer  = (state = orderListUserInitialState, action: TOrderListUserActions) => {
    switch (action.type) {
        case GET_ORDER_LIST_USER_REQUEST: {
            return {...state, isLoading: true};
        }
        case GET_ORDER_LIST_USER_SUCCESS: {
            return {...state, isLoading: false, orders: action.orders, total: action.total, totalToday: action.totalToday, isError: false};
        }
        case GET_ORDER_LIST_USER_ERROR: {
            return {...state, isLoading: false, isError: true};
        }
        default: {
            return state;
        }
    }
}