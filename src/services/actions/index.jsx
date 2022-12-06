import {getData, postRequest} from "../api";
import {GET_INGREDIENTS_URL, LOGOUT_URL, NORMA_URL, SET_INGREDIENTS_URL} from "../../constants/burger-constants";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_FAILED';

export const OPEN_CURRENT_ITEM_DETAILS = 'OPEN_CURRENT_ITEM_DETAILS';
export const CLOSE_CURRENT_ITEM_DETAILS = 'CLOSE_CURRENT_ITEM_DETAILS';

export const SET_ORDER_REQUEST = 'SET_ORDER_REQUEST';
export const SET_ORDER_SUCCESS = 'SET_ORDER_SUCCESS';
export const SET_ORDER_ERROR = 'SET_ORDER_FAILED';
export const CLOSE_ORDER = 'CLOSE_ORDER';

export const ADD_INGREDIENT_TO_CONSTRUCTOR = 'ADD_INGREDIENT_TO_CONSTRUCTOR';
export const ADD_BUN_INGREDIENT_TO_CONSTRUCTOR = 'ADD_BUN_INGREDIENT_TO_CONSTRUCTOR';
export const DELETE_INGREDIENT_TO_CONSTRUCTOR = 'DELETE_INGREDIENT_TO_CONSTRUCTOR';
export const MOVE_INGREDIENT_IN_CONSTRUCTOR = 'MOVE_INGREDIENT_IN_CONSTRUCTOR';

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR';

export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_ERROR = 'USER_LOGOUT_ERROR';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';

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
    return function(dispatch) {
        dispatch({
            type: SET_ORDER_REQUEST,
        });
        postRequest(SET_INGREDIENTS_URL, {ingredients: ingredientIds})
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

export function logoutUser () {
    return function(dispatch) {
        debugger;
        dispatch({
            type: USER_LOGOUT_REQUEST,
        })
        postRequest(LOGOUT_URL,{ token: localStorage.getItem('refreshToken')})
            .then(result => {
                if (result && result.success) {
                    localStorage.setItem('refreshToken', '');
                    localStorage.setItem('accessToken', '');
                    dispatch({
                        type: USER_LOGOUT_SUCCESS
                    })
                }
            })
            .catch((error) => {
                console.log('logoutUser', error);
                dispatch({
                    type: USER_LOGOUT_ERROR,
                })
            })
    }
}