import {
    GET_INGREDIENTS_ERROR,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    SET_ORDER_ERROR,
    SET_ORDER_REQUEST,
    SET_ORDER_SUCCESS
} from "./index";
import {GET_INGREDIENTS_URL, SET_INGREDIENTS_URL} from "../../constants/burger-constants";
import {getData, postRequestAuth} from "../api";


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
                dispatch({
                    type: GET_INGREDIENTS_ERROR,
                    error
                })
            })
    }
}

export function postOrder(ingredientIds) {
    const token = 'Bearer ' + localStorage.getItem('accessToken');
    return function(dispatch) {
        dispatch({
            type: SET_ORDER_REQUEST,
        });
        postRequestAuth(SET_INGREDIENTS_URL, {ingredients: ingredientIds}, token)
            .then(result => {
                if (result.success) {
                    dispatch({
                        type: SET_ORDER_SUCCESS,
                        orderNumber: result.order.number
                    })
                }
            })
            .catch(error => {
                dispatch({
                    type: SET_ORDER_ERROR,
                    error
                });
            })
    };
}