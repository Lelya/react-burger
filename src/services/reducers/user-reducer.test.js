import {userInitialState, userReducer as reducer} from "./user-reducer";
import {
    FORGOT_PASSWORD_ERROR,
    FORGOT_PASSWORD_VISITED,
    GET_USER_ERROR,
    GET_USER_REQUEST,
    GET_USER_SUCCESS, REFRESH_TOKEN_ERROR,
    REFRESH_TOKEN_REQUEST, REFRESH_TOKEN_SUCCESS,
    REGISTER_ERROR,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    RESET_PASSWORD,
    RESET_PASSWORD_ERROR, UPDATE_USER_INFO_ERROR, UPDATE_USER_INFO_REQUEST, UPDATE_USER_INFO_SUCCESS,
    USER_LOGIN_ERROR,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT_ERROR,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS
} from "../actions";
describe('Тест редьюсера user', () => {
    it('should USER_LOGIN_REQUEST', () => {
      expect(reducer(userInitialState, { type: USER_LOGIN_REQUEST })).toEqual({
        ...userInitialState,
        email: userInitialState.email,
        name: userInitialState.name,
        userLoggedIn: false,
        loginError: false
      });
    });

    it("should USER_LOGIN_SUCCESS", () => {
      const user = {
          email: "userEmail",
          name: "userName",
      }
      expect(
          reducer(userInitialState, { type: USER_LOGIN_SUCCESS, user })
      ).toEqual({
        ...userInitialState,
        email: user.email,
        name: user.name,
        userLoggedIn: true,
        loginError: false,
        userLoaded: true
      });
    });

    it('should USER_LOGIN_ERROR', () => {
      expect(reducer(userInitialState, { type: USER_LOGIN_ERROR })).toEqual({
        ...userInitialState,
        userLoggedIn: false,
        loginError: true,
      });
    });

    it('should USER_LOGOUT_REQUEST', () => {
        expect(reducer(userInitialState, { type: USER_LOGOUT_REQUEST })).toEqual({
            ...userInitialState,
            email: userInitialState.email,
            name: userInitialState.name,
            userLoggedIn: true,
            logoutError: false
        });
    });

    it('should USER_LOGOUT_SUCCESS', () => {
        expect(reducer(userInitialState, { type: USER_LOGOUT_SUCCESS })).toEqual({
            ...userInitialState,
            email: '',
            name: '',
            userLoggedIn: false
        });
    });

    it('should USER_LOGOUT_ERROR', () => {
        expect(reducer(userInitialState, { type: USER_LOGOUT_ERROR })).toEqual({
            ...userInitialState,
            email: userInitialState.email,
            name: userInitialState.name,
            userLoggedIn: true,
            logoutError: true
        });
    });

    it('should REGISTER_REQUEST', () => {
        expect(reducer(userInitialState, { type: REGISTER_REQUEST })).toEqual({
            ...userInitialState,
            email: userInitialState.email,
            name: userInitialState.name,
            userLoggedIn: false,
            registerError: false
        });
    });

    it("should REGISTER_SUCCESS", () => {
        const user = {
            email: "userEmail",
            name: "userName",
        }
        expect(
            reducer(userInitialState, { type: REGISTER_SUCCESS, user })
        ).toEqual({
            ...userInitialState,
            email: user.email,
            name: user.name,
            userLoggedIn: true,
            userLoaded: true
        });
    });

    it('should REGISTER_ERROR', () => {
        expect(reducer(userInitialState, { type: REGISTER_ERROR })).toEqual({
            ...userInitialState,
            userLoggedIn: false,
            registerError: true
        });
    });

    it('should FORGOT_PASSWORD_ERROR', () => {
        expect(reducer(userInitialState, { type: FORGOT_PASSWORD_ERROR })).toEqual({
            ...userInitialState,
            forgotPasswordError: true,
        });
    });

    it('should FORGOT_PASSWORD_VISITED', () => {
        expect(reducer(userInitialState, { type: FORGOT_PASSWORD_VISITED })).toEqual({
            ...userInitialState,
            forgotPasswordVisited: true,
        });
    });

    it('should RESET_PASSWORD', () => {
        expect(reducer(userInitialState, { type: RESET_PASSWORD })).toEqual({
            ...userInitialState,
            forgotPasswordVisited: false,
        });
    });

    it('should RESET_PASSWORD_ERROR', () => {
        expect(reducer(userInitialState, { type: RESET_PASSWORD_ERROR })).toEqual({
            ...userInitialState,
            resetPasswordError: false,
        });
    });

    it('should GET_USER_REQUEST', () => {
        expect(reducer(userInitialState, { type: GET_USER_REQUEST })).toEqual({
            ...userInitialState,
            email: userInitialState.email,
            name: userInitialState.name
        });
    })

    it("should GET_USER_SUCCESS", () => {
        const user = {
            email: "userEmail",
            name: "userName",
        }
        expect(
            reducer(userInitialState, { type: GET_USER_SUCCESS, user })
        ).toEqual({
            ...userInitialState,
            email: user.email,
            name: user.name,
            userLoggedIn: true,
            getUserError: false,
            userLoaded: true
        });
    });

    it('should GET_USER_ERROR', () => {
        expect(reducer(userInitialState, { type: GET_USER_ERROR })).toEqual({
            ...userInitialState,
            getUserError: true,
        });
    })

    it('should REFRESH_TOKEN_REQUEST', () => {
        expect(reducer(userInitialState, { type: REFRESH_TOKEN_REQUEST })).toEqual({
            ...userInitialState
        });
    })

    it('should REFRESH_TOKEN_SUCCESS', () => {
        expect(reducer(userInitialState, { type: REFRESH_TOKEN_SUCCESS })).toEqual({
            ...userInitialState
        });
    })

    it('should REFRESH_TOKEN_ERROR', () => {
        expect(reducer(userInitialState, { type: REFRESH_TOKEN_ERROR })).toEqual({
            ...userInitialState
        });
    })

    it('should UPDATE_USER_INFO_REQUEST', () => {
        expect(reducer(userInitialState, { type: UPDATE_USER_INFO_REQUEST })).toEqual({
            ...userInitialState,
            updateUserInfoError: false,
        });
    })

    it("should UPDATE_USER_INFO_SUCCESS", () => {
        const user = {
            email: "userEmail",
            name: "userName",
        }
        expect(
            reducer(userInitialState, { type: UPDATE_USER_INFO_SUCCESS, user })
        ).toEqual({
            ...userInitialState,
            email: user.email,
            name: user.name,
            userLoggedIn: true,
            updateUserInfoError: false,
        });
    });

    it('should UPDATE_USER_INFO_ERROR', () => {
        expect(reducer(userInitialState, { type: UPDATE_USER_INFO_ERROR })).toEqual({
            ...userInitialState,
            updateUserInfoError: true,
        });
    })
})