import {getData, patchRequestAuth, postRequest, postRequestAuth} from "../api";
import {
    AUTH_USER_URL, FORGOT_PASSWORD_URL,
    GET_INGREDIENTS_URL, LOGIN_URL,
    LOGOUT_URL, RASSWORD_RESET_URL, REGISTER_URL,
    SET_INGREDIENTS_URL
} from "../../constants/burger-constants";

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
export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR';

export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';
export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS';
export const USER_LOGOUT_ERROR = 'USER_LOGOUT_ERROR';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_ERROR = 'REGISTER_ERROR';
export const FORGOT_PASSWORD_ERROR = 'FORGOT_PASSWORD_ERROR';
export const FORGOT_PASSWORD_VISITED = 'FORGOT_PASSWORD_VISITED';
export const RESET_PASSWORD_ERROR = 'RESET_PASSWORD_ERROR';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_ERROR = 'GET_USER_ERROR';
export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_ERROR = 'REFRESH_TOKEN_ERROR';

export const UPDATE_USER_INFO_REQUEST = 'UPDATE_USER_INFO_REQUEST';
export const UPDATE_USER_INFO_SUCCESS = 'UPDATE_USER_INFO_SUCCESS';
export const UPDATE_USER_INFO_ERROR = 'UPDATE_USER_INFO_ERROR';

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
                    // dispatch({
                    //     type: CLEAR_CONSTRUCTOR
                    // });
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
                dispatch({
                    type: USER_LOGOUT_ERROR,
                })
            })
    }
}

export function getUserData () {
    const token = 'Bearer ' + localStorage.getItem('accessToken');
    return function(dispatch) {
        dispatch({
            type: GET_USER_REQUEST,
        })
        getData(AUTH_USER_URL, {
            headers: {
                'Authorization': token || '',
            },
        })
            .then(result => {
                if (result && result.success) {
                    dispatch({
                        type: GET_USER_SUCCESS,
                        user: result.user,
                    })
                } else {
                    dispatch({
                        type: GET_USER_ERROR,
                    })
                }
            })
            .catch((error) => {
                if(localStorage.getItem('accessToken')) {
                    dispatch(refreshToken());
                }
                dispatch({
                    type: GET_USER_ERROR,
                })
            })
    }
}
export function refreshToken () {
    return function(dispatch) {
        dispatch({
            type: REFRESH_TOKEN_REQUEST
        })
        postRequest(LOGOUT_URL,{ token: localStorage.getItem('refreshToken')})
            .then(res => {
                if (res && res.success) {
                    const accessToken = res.accessToken.split('Bearer ')[1];
                    const refreshToken = res.refreshToken;
                    localStorage.setItem('refreshToken', refreshToken);
                    localStorage.setItem('accessToken', accessToken);
                    dispatch({
                        type: REFRESH_TOKEN_SUCCESS,
                    })
                    dispatch(getUserData());
                }
            })
            .catch((error) => {
                dispatch({
                    type: REFRESH_TOKEN_ERROR
                })
            })
    }
}

export function updateUserData (email, name) {
    const token = 'Bearer ' + localStorage.getItem('accessToken');
    const data = {
        email,
        name
    }
    return function(dispatch) {
        dispatch({
            type: UPDATE_USER_INFO_REQUEST,
        })
        patchRequestAuth(AUTH_USER_URL, data, token)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: UPDATE_USER_INFO_SUCCESS,
                        user: res.user,
                    })
                }
            })
            .catch((error) => {
                dispatch({
                    type: UPDATE_USER_INFO_ERROR
                })
            })
    }
}

export function logIn(values) {
    return function(dispatch) {
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        postRequest(LOGIN_URL, values )
            .then(result => {
                if (result.success) {
                    const accessToken = result.accessToken.split('Bearer ')[1];
                    const refreshToken = result.refreshToken;
                    localStorage.setItem('refreshToken', refreshToken);
                    localStorage.setItem('accessToken', accessToken);
                    dispatch({
                        type: USER_LOGIN_SUCCESS,
                        user: result.user,
                    })
                } else {
                    dispatch({
                        type: USER_LOGIN_ERROR
                    })
                }
            })
            .catch(error => {
                dispatch({
                    type: USER_LOGIN_ERROR
                })
            })
    }
}

export function forgotPassword(value) {
    return function(dispatch) {
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        postRequest(FORGOT_PASSWORD_URL, {email: value})
            .then(result => {
                if (result.success) {
                    dispatch({
                        type: FORGOT_PASSWORD_VISITED,
                    });
                } else {
                    dispatch({
                        type: FORGOT_PASSWORD_ERROR,
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: FORGOT_PASSWORD_ERROR,
                });
            })
    }
}

export function resetPassword(values) {
    return function(dispatch) {
        dispatch({
            type: RESET_PASSWORD
        })
        postRequest(RASSWORD_RESET_URL, values )
            .then(result => {
                if (result.success) {
                    alert('Пароль обновлен!');
                } else {
                    dispatch({
                        type: RESET_PASSWORD_ERROR,
                    });
                }
            })
            .catch(error => {
                dispatch({
                    type: RESET_PASSWORD_ERROR,
                });
            })
    }
}

export function register(values) {
    debugger;
    return function(dispatch) {
        dispatch({
            type: REGISTER_REQUEST
        })
        postRequest(REGISTER_URL, values )
            .then(result => {
                if (result.success) {
                    alert('Регистрация прошла успешно!');
                    dispatch({
                        type: REGISTER_SUCCESS,
                        user: result.user,
                    })
                } else {
                    dispatch({
                        type: REGISTER_ERROR,
                    })
                }
            })
            .catch(error => {
                dispatch({
                    type: REGISTER_ERROR,
                })
            })
    }
}