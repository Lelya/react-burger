import {getData, patchRequestAuth, postRequest} from "../api";
import {
    AUTH_USER_URL, FORGOT_PASSWORD_URL, LOGIN_URL,
    LOGOUT_URL, RASSWORD_RESET_URL, REGISTER_URL,
} from "../../constants/burger-constants";
import {
    FORGOT_PASSWORD_ERROR,
    FORGOT_PASSWORD_VISITED,
    GET_USER_ERROR,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    REFRESH_TOKEN_ERROR,
    REFRESH_TOKEN_REQUEST,
    REFRESH_TOKEN_SUCCESS, REGISTER_ERROR,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    RESET_PASSWORD,
    RESET_PASSWORD_ERROR,
    UPDATE_USER_INFO_ERROR,
    UPDATE_USER_INFO_REQUEST,
    UPDATE_USER_INFO_SUCCESS,
    USER_LOGIN_ERROR,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT_ERROR,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS
} from "./index";


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
                if (error.message === 'jwt expired') {
                    const getUserDataAsync = async () => {
                        await refreshToken(localStorage.getItem('refreshToken'))
                        dispatch(getUserData())
                    }
                    getUserDataAsync()
                } else {
                    dispatch({
                        type: GET_USER_ERROR
                    })
                }
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