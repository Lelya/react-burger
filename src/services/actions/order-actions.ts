import {
    CLOSE_ORDER,
    GET_INGREDIENTS_ERROR,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    SET_ORDER_ERROR,
    SET_ORDER_REQUEST,
    SET_ORDER_SUCCESS
} from "./index";
import {API_ORDERS_URL, API_INGREDIENTS_URL} from "../../constants/burger-constants";
import {getData, postRequestAuth} from "../api";
import {AppDispatch, AppThunk, TIngredientData} from "../../utils/types";

export interface IGetIngredientsRequestAction {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}
export interface IGetIngredientsFailedAction {
    readonly type: typeof GET_INGREDIENTS_ERROR;
}
export interface IGetIngredientsSuccessAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
    readonly items: ReadonlyArray<TIngredientData>;
}

export type TIngredientsActions = IGetIngredientsRequestAction |
    IGetIngredientsFailedAction |
    IGetIngredientsSuccessAction;

export const getIngredientsAction = (): IGetIngredientsRequestAction => ({
    type: GET_INGREDIENTS_REQUEST
});

export const getIngredientsFailedAction = (): IGetIngredientsFailedAction => ({
    type: GET_INGREDIENTS_ERROR
});

export const getIngredientsSuccessAction = (
    items: ReadonlyArray<TIngredientData>
): IGetIngredientsSuccessAction => ({
    type: GET_INGREDIENTS_SUCCESS,
    items
});


export const getIngredientsThunk = (): AppThunk => (dispatch: AppDispatch) => {
    dispatch(getIngredientsAction());
    getData(API_INGREDIENTS_URL,{})
        .then(res => {
            if (res && res.success) {
                dispatch(getIngredientsSuccessAction(res.data));
            } else {
                dispatch(getIngredientsFailedAction());
            }
        })
        .catch((error) => {
            dispatch(getIngredientsFailedAction());
        });
};

export interface ISetOrderRequestAction {
    readonly type: typeof SET_ORDER_REQUEST;
}
export interface ISetOrderFailedAction {
    readonly type: typeof SET_ORDER_ERROR;
}
export interface ISetOrderSuccessAction {
    readonly type: typeof SET_ORDER_SUCCESS;
    orderNumber: number
}

export interface ICloseOrderAction {
    readonly type: typeof CLOSE_ORDER;
}

export type TSetOrderActions = ISetOrderRequestAction |
    ISetOrderFailedAction |
    ISetOrderSuccessAction |
    ICloseOrderAction;

export const setOrderAction = (): ISetOrderRequestAction => ({
    type: SET_ORDER_REQUEST
});

export const setOrderFailedAction = (): ISetOrderFailedAction => ({
    type: SET_ORDER_ERROR
});

export const  closeOrderAction = (): ICloseOrderAction => ({
    type: CLOSE_ORDER
});
export const setOrderSuccessAction = (
    orderNumber: number
): ISetOrderSuccessAction => ({
    type: SET_ORDER_SUCCESS,
    orderNumber
});

export const postOrderThunk = (ingredientIds: Array<string>) : AppThunk => (dispatch: AppDispatch) => {
    dispatch(setOrderAction());
    const token = 'Bearer ' + localStorage.getItem('accessToken');
    postRequestAuth(API_ORDERS_URL, {ingredients: ingredientIds}, token)
        .then(res => {
            if (res && res.success) {
                dispatch(setOrderSuccessAction(res.order.number));
            } else {
                dispatch(setOrderFailedAction());
            }
        })
        .catch((error) => {
            dispatch(setOrderFailedAction());
        });
};