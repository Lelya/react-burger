import { SET_ORDER_REQUEST, SET_ORDER_SUCCESS, SET_ORDER_ERROR, CLOSE_ORDER} from '../actions';
import {TSetOrderActions} from "../actions/order-actions";


const orderListInitialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    ordersLoading: false,
    ordersFailed: false,
}

export const orderListReducer  = (state = orderListInitialState, action: TSetOrderActions) => {
    switch (action.type) {
        case SET_ORDER_REQUEST: {
            return {
                ...state,
                orderId: '',
                isLoading: true,
            };
        }
        case SET_ORDER_SUCCESS: {
            return {
                ...state,
                isError: false, orderId: action.orderNumber, isLoading: false, isOpen: true};
        }
        case SET_ORDER_ERROR: {
            return { ...state, isError: true, isLoading: false};
        }
        case CLOSE_ORDER: {
            return { ...state,  orderId: '', isOpen: false};
        }
        default: {
            return state;
        }
    }
}