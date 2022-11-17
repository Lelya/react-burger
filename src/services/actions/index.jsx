import {getData, postOrderInfo} from "../api";
import {GET_INGREDIENTS_URL, SET_INGREDIENTS_URL} from "../../constants/burger-constants";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const OPEN_CURRENT_ITEM_DETAILS = 'OPEN_CURRENT_ITEM_DETAILS';
export const CLOSE_CURRENT_ITEM_DETAILS = 'CLOSE_CURRENT_ITEM_DETAILS';

export const SET_ORDER_REQUEST = 'SET_ORDER_REQUEST';
export const SET_ORDER_SUCCESS = 'SET_ORDER_SUCCESS';
export const SET_ORDER_FAILED = 'SET_ORDER_FAILED';
export const CLOSE_ORDER = 'CLOSE_ORDER';

export const ADD_INGREDIENT_TO_CONSTRUCTOR = 'ADD_INGREDIENT_TO_CONSTRUCTOR';
export const ADD_BUN_INGREDIENT_TO_CONSTRUCTOR = 'ADD_BUN_INGREDIENT_TO_CONSTRUCTOR';
export const DELETE_INGREDIENT_TO_CONSTRUCTOR = 'DELETE_INGREDIENT_TO_CONSTRUCTOR';

export function getIngredients() {
    return function(dispatch) {
        dispatch({
            type: GET_INGREDIENTS_REQUEST
        });
        getData(GET_INGREDIENTS_URL)
            .then(result => {
                if (result.success) {
                    dispatch({
                        type: GET_INGREDIENTS_SUCCESS,
                        items: result.data,
                    })
                }
            })
            .catch(error => {
                debugger;
                dispatch({
                    type: GET_INGREDIENTS_FAILED,
                    error
                })
            })
    }
}

export function postOrder(ingredientIds) {
    return function(dispatch) {
        dispatch({
            type: SET_ORDER_REQUEST,
        });
        postOrderInfo(SET_INGREDIENTS_URL, {ingredients: ingredientIds})
            .then(result => {
                if (result.success) {
                    dispatch({
                        type: SET_ORDER_SUCCESS,
                        orderNumber: result.order.number
                    })
                }
            })
            .catch(error => {
                // setError("Возникла ошибка во время создания заказа");
                dispatch({
                    type: SET_ORDER_FAILED,
                    error
                });
            })
    };
}