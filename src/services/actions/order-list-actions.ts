import { GET_ORDER_LIST_ERROR, GET_ORDER_LIST_REQUEST, GET_ORDER_LIST_SUCCESS
} from "./index";
import {getData} from "../api";
import {AppDispatch, AppThunk, TOrder} from "../../utils/types";
import {GET_ORDER_LIST_URL} from "../../constants/burger-constants";

export interface IOrderListRequestAction {
    readonly type: typeof GET_ORDER_LIST_REQUEST;
}
export interface IOrderListFailedAction {
    readonly type: typeof GET_ORDER_LIST_ERROR;
}
export interface IOrderListSuccessAction {
    readonly type: typeof GET_ORDER_LIST_SUCCESS;
    orders: ReadonlyArray<TOrder>
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
    orders: ReadonlyArray<TOrder>
): IOrderListSuccessAction => ({
    type: GET_ORDER_LIST_SUCCESS,
    orders
});

export const getOrderListThunk = (): AppThunk => (dispatch: AppDispatch) => {
    dispatch(orderListAction());
    getData(GET_ORDER_LIST_URL,{})
        .then(res => {
            if (res && res.success) {
                dispatch(orderListSuccessAction(res.orders));
            } else {
                dispatch(orderListFailedAction());
            }
        })
        .catch((error) => {
            dispatch(orderListFailedAction());
        });
};