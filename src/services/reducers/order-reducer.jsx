import { SET_ORDER_REQUEST, SET_ORDER_SUCCESS, SET_ORDER_FAILED, CLOSE_ORDER} from '../actions';

const orderInitialState = {
    orderId: '',
    isLoading: false,
    isError: false,
    isOpen: false
};

export const orderReducer  = (state = orderInitialState, action) => {
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
        case SET_ORDER_FAILED: {
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