import {
    GET_ORDER_LIST_ERROR,
    GET_ORDER_LIST_REQUEST,
    GET_ORDER_LIST_SUCCESS,
    GET_ORDER_LIST_USER_ERROR, GET_ORDER_LIST_USER_REQUEST,
    GET_ORDER_LIST_USER_SUCCESS
} from "./index";
import {getData} from "../api";
import {AppDispatch, AppThunk, TOrder} from "../../utils/types";
import {GET_ORDER_LIST_URL, ORDER_URL} from "../../constants/burger-constants";

/****************************** Order List ******************************/
export interface IOrderListRequestAction {
    readonly type: typeof GET_ORDER_LIST_REQUEST;
}
export interface IOrderListFailedAction {
    readonly type: typeof GET_ORDER_LIST_ERROR;
}
export interface IOrderListSuccessAction {
    readonly type: typeof GET_ORDER_LIST_SUCCESS;
    orders: ReadonlyArray<TOrder>,
    total: number,
    totalToday: number
}

export type TOrderListActions = IOrderListRequestAction |
    IOrderListFailedAction |
    IOrderListSuccessAction;

export const orderListAction = (): IOrderListRequestAction => ({
    type: GET_ORDER_LIST_REQUEST
});

export const orderListFailedAction = (): IOrderListFailedAction => ({
    type: GET_ORDER_LIST_ERROR
});

export const orderListSuccessAction = (
    orders: ReadonlyArray<TOrder>,
    total: number,
    totalToday: number
): IOrderListSuccessAction => ({
    type: GET_ORDER_LIST_SUCCESS,
    orders,
    total,
    totalToday
});

export const getOrderListThunk = (): AppThunk => (dispatch: AppDispatch) => {
    dispatch(orderListAction());
    getData(GET_ORDER_LIST_URL,{})
        .then(res => {
            if (res && res.success) {
                dispatch(orderListSuccessAction(res.orders, res.total, res.totalToday));
            } else {
                dispatch(orderListFailedAction());
            }
        })
        .catch((error) => {
            dispatch(orderListFailedAction());
        });
};

/****************************** Order List User ******************************/
export interface IOrderListUserRequestAction {
    readonly type: typeof GET_ORDER_LIST_USER_REQUEST;
}
export interface IOrderListUserFailedAction {
    readonly type: typeof GET_ORDER_LIST_USER_ERROR;
}
export interface IOrderListUserSuccessAction {
    readonly type: typeof GET_ORDER_LIST_USER_SUCCESS;
    orders: ReadonlyArray<TOrder>,
    total: number,
    totalToday: number
}

export type TOrderListUserActions = IOrderListUserRequestAction |
    IOrderListUserFailedAction |
    IOrderListUserSuccessAction;

export const orderListUserAction = (): IOrderListUserRequestAction => ({
    type: GET_ORDER_LIST_USER_REQUEST
});

export const orderListUserFailedAction = (): IOrderListUserFailedAction => ({
    type: GET_ORDER_LIST_USER_ERROR
});

export const orderListUserSuccessAction = (
    orders: ReadonlyArray<TOrder>,
    total: number,
    totalToday: number
): IOrderListUserSuccessAction => ({
    type: GET_ORDER_LIST_USER_SUCCESS,
    orders,
    total,
    totalToday
});

export const getOrderListUserThunk = (): AppThunk => (dispatch: AppDispatch) => {
    dispatch(orderListUserAction());
    const token = 'Bearer ' + localStorage.getItem('accessToken');
    getData(ORDER_URL, {
        headers: {
            'Authorization': token || '',
        },
    })
        .then(res => {
            if (res && res.success) {
                dispatch(orderListUserSuccessAction(res.orders.reverse(), res.total, res.totalToday));
            } else {
                dispatch(orderListUserFailedAction());
            }
        })
        .catch((error) => {
            dispatch(orderListUserFailedAction());
        });
};