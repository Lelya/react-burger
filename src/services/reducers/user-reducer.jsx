import {
    FORGOT_PASSWORD_ERROR,
    FORGOT_PASSWORD_VISITED,
    GET_USER_ERROR,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    REFRESH_TOKEN_ERROR,
    REFRESH_TOKEN_REQUEST,
    REFRESH_TOKEN_SUCCESS,
    REGISTER_ERROR,
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
} from "../actions";

const userInitialState = {
    email: null,
    name: null,
    userLoggedIn: false,
    loginError: false,
    logoutError: false,
    registerError: false,
    forgotPasswordError: false,
    forgotPasswordVisited: false,
    resetPasswordError: false,
    getUserError: false,
    updateUserInfoError: false,
};

export const userReducer  = (state = userInitialState, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST: {
            return {
                ...state,
                user: userInitialState.email,
                name: userInitialState.name,
                userLoggedIn: false,
                loginError: false
            };
        }
        case USER_LOGIN_SUCCESS: {
            return {
                ...state,
                email: action.user.email,
                name: action.user.name,
                userLoggedIn: true,
                loginError: false
            }
        }
        case USER_LOGIN_ERROR: {
            return {
                ...state,
                userLoggedIn: false,
                loginError: true,
            };
        }
        case USER_LOGOUT_REQUEST: {
            return {
                ...state,
                email: userInitialState.email,
                name: userInitialState.name,
                userLoggedIn: true,
                logoutError: false
            };
        }
        case USER_LOGOUT_SUCCESS: {
            return {
                ...state,
                email: null,
                name: null,
                userLoggedIn: false
            };
        }
        case USER_LOGOUT_ERROR: {
            return {
                ...state,
                email: userInitialState.email,
                name: userInitialState.name,
                userLoggedIn: true,
                logoutError: true
            };
        }
        case REGISTER_REQUEST: {
            return { ...state,
                email: userInitialState.email,
                name: userInitialState.name,
                userLoggedIn: false,
                registerError: false
            };
        }
        case REGISTER_SUCCESS: {
            return { ...state,
                email: action.user.email,
                name: action.user.name,
                userLoggedIn: true
            };
        }
        case REGISTER_ERROR: {
            return { ...state,
                userLoggedIn: false,
                registerError: true
            };
        }
        case FORGOT_PASSWORD_ERROR: {
            return {...state,
                forgotPasswordError: true,
            };
        }
        case FORGOT_PASSWORD_VISITED: {
            return {...state,
                forgotPasswordVisited: true,
            };
        }
        case RESET_PASSWORD: {
            return {...state,
                forgotPasswordVisited: false,
            };
        }
        case RESET_PASSWORD_ERROR: {
            return {...state,
                resetPasswordError: false,
            };
        }
        case GET_USER_REQUEST: {
            return { ...state,
                email: userInitialState.email,
                name: userInitialState.name
            };
        }
        case GET_USER_SUCCESS: {
            return { ...state,
                email: action.user.email,
                name: action.user.name,
                userLoggedIn: true,
                getUserError: false,
            };
        }
        case GET_USER_ERROR: {
            return { ...state,
                getUserError: true,
            };
        }
        case REFRESH_TOKEN_REQUEST: {
            return { ...state };
        }
        case REFRESH_TOKEN_SUCCESS: {
            return { ...state };
        }
        case REFRESH_TOKEN_ERROR: {
            return { ...state };
        }
        case UPDATE_USER_INFO_REQUEST: {
            return { ...state,
                updateUserInfoError: false,
            };
        }
        case UPDATE_USER_INFO_SUCCESS: {
            return { ...state,
                email: action.user.email,
                name: action.user.name,
                userLoggedIn: true,
                updateUserInfoError: false,
            };
        }
        case UPDATE_USER_INFO_ERROR: {
            return { ...state,
                updateUserInfoError: true,
            };
        }

        default: {
            return state;
        }
    }
}