import {
    REGISTER_ERROR, REGISTER_REQUEST, REGISTER_SUCCESS,
    USER_LOGIN_ERROR, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS,
    USER_LOGOUT_ERROR, USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS
} from "../actions";

const userInitialState = {
    email: null,
    name: null,
    userLoggedIn: false,
    loginError: false,
    logoutError: false,
    registerError: false,
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
            debugger;
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
            debugger;
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
        default: {
            return state;
        }
    }
}