import {getData, patchRequestAuth, postRequest} from "../api";
import {
    AUTH_USER_URL,
    FORGOT_PASSWORD_URL,
    LOGIN_URL,
    LOGOUT_URL,
    RASSWORD_RESET_URL,
    REGISTER_URL,
} from "../../constants/burger-constants";
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
} from "./index";
import {AppDispatch, AppThunk, TFormUser} from "../../utils/types";

/****************************** Logout ******************************/
export interface IUserLogoutRequestAction {
    readonly type: typeof USER_LOGOUT_REQUEST;
}
export interface IUserLogoutFailedAction {
    readonly type: typeof USER_LOGOUT_ERROR;
}
export interface IUserLogoutSuccessAction {
    readonly type: typeof USER_LOGOUT_SUCCESS;
}

export const userLogoutAction = (): IUserLogoutRequestAction => ({
    type: USER_LOGOUT_REQUEST
});

export const userLogoutFailedAction = (): IUserLogoutFailedAction => ({
    type: USER_LOGOUT_ERROR
});

export const  userLogoutSuccessAction = (): IUserLogoutSuccessAction => ({
    type: USER_LOGOUT_SUCCESS
});

export const logoutUserThunk = () : AppThunk => (dispatch: AppDispatch) => {
    dispatch(userLogoutAction());
    postRequest(LOGOUT_URL,{ token: localStorage.getItem('refreshToken')})
        .then(res => {
            if (res && res.success) {
                localStorage.setItem('refreshToken', '');
                localStorage.setItem('accessToken', '');
                dispatch(userLogoutSuccessAction());
            } else {
                dispatch(userLogoutFailedAction());
            }})
        .catch((error) => {
            dispatch(userLogoutFailedAction());
        });
};

/****************************** Login ******************************/
export interface IUserLoginRequestAction {
    readonly type: typeof USER_LOGIN_REQUEST;
}
export interface IUserLoginFailedAction {
    readonly type: typeof USER_LOGIN_ERROR;
}
export interface IUserLoginSuccessAction {
    readonly type: typeof USER_LOGIN_SUCCESS;
    user: TFormUser;
}

export interface IUserLoginSuccessAction {
    readonly type: typeof USER_LOGIN_SUCCESS;
    user: TFormUser;
}

export const userLoginAction = (): IUserLoginRequestAction => ({
    type: USER_LOGIN_REQUEST
});

export const userLoginFailedAction = (): IUserLoginFailedAction => ({
    type: USER_LOGIN_ERROR
});
export const userLoginSuccessAction = (
    user: TFormUser
): IUserLoginSuccessAction => ({
    type: USER_LOGIN_SUCCESS,
    user
})

export const logInThunk = (values: TFormUser) : AppThunk => (dispatch: AppDispatch) => {
    dispatch(userLoginAction());
    postRequest(LOGIN_URL, values )
        .then(res => {
            if (res && res.success) {
                const accessToken = res.accessToken.split('Bearer ')[1];
                const refreshToken = res.refreshToken;
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('accessToken', accessToken);
                dispatch(userLoginSuccessAction(res.user));
            } else {
                dispatch(userLoginFailedAction());
            }})
        .catch((error) => {
            dispatch(userLoginFailedAction());
        });
};

/****************************** getUserData ******************************/
export interface IGetUserDataRequestAction {
    readonly type: typeof GET_USER_REQUEST;
}
export interface IGetUserDataFailedAction {
    readonly type: typeof GET_USER_ERROR;
}
export interface IGetUserDataSuccessAction {
    readonly type: typeof GET_USER_SUCCESS;
    user: TFormUser
}

export const getUserDataAction = (): IGetUserDataRequestAction => ({
    type: GET_USER_REQUEST
});

export const getUserDataFailedAction = (): IGetUserDataFailedAction => ({
    type: GET_USER_ERROR
});

export const getUserDataSuccessAction = (
    user: TFormUser
): IGetUserDataSuccessAction => ({
    type: GET_USER_SUCCESS,
    user
});
export const getUserDataThunk = () : AppThunk => (dispatch: AppDispatch) => {
    dispatch(getUserDataAction());
    const token = 'Bearer ' + localStorage.getItem('accessToken');
    getData(AUTH_USER_URL, {
        headers: {
            'Authorization': token || '',
        },
    })
        .then(res => {
            if (res && res.success) {
                dispatch(getUserDataSuccessAction(res.user));
            } else {
                dispatch(getUserDataFailedAction());
            }
        })
        .catch((error) => {
            if (error.message === 'jwt expired') {
                const getUserDataAsync = async () => {
                    await refreshTokenThunk();
                    dispatch(getUserDataThunk());
                }
                getUserDataAsync();
            } else {
                dispatch(getUserDataFailedAction());
            }
        });
};

/****************************** refreshToken ******************************/
export interface IRefreshTokenRequestAction {
    readonly type: typeof REFRESH_TOKEN_REQUEST;
}
export interface IRefreshTokenFailedAction {
    readonly type: typeof REFRESH_TOKEN_ERROR;
}
export interface IRefreshTokenSuccessAction {
    readonly type: typeof REFRESH_TOKEN_SUCCESS;
}

export const refreshTokenAction = (): IRefreshTokenRequestAction => ({
    type: REFRESH_TOKEN_REQUEST
});

export const refreshTokenFailedAction = (): IRefreshTokenFailedAction => ({
    type: REFRESH_TOKEN_ERROR
});

export const refreshTokenSuccessAction = (): IRefreshTokenSuccessAction => ({
    type: REFRESH_TOKEN_SUCCESS
});

export const refreshTokenThunk = () : AppThunk => (dispatch: AppDispatch) =>  {
    dispatch(refreshTokenAction());
    postRequest(LOGOUT_URL,{ token: localStorage.getItem('refreshToken')})
        .then(res => {
            if (res && res.success) {
                const accessToken = res.accessToken.split('Bearer ')[1];
                const refreshToken = res.refreshToken;
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('accessToken', accessToken);
                dispatch(refreshTokenSuccessAction())
                dispatch(getUserDataThunk());
            } else {
                dispatch(refreshTokenFailedAction());
            }})
        .catch((error) => {
            dispatch(refreshTokenFailedAction());
        });
};

/****************************** updateUserData ******************************/
export interface IUpdateUserDataRequestAction {
    readonly type: typeof UPDATE_USER_INFO_REQUEST;
}
export interface IUpdateUserDataFailedAction {
    readonly type: typeof UPDATE_USER_INFO_ERROR;
}
export interface IUpdateUserDataSuccessAction {
    readonly type: typeof UPDATE_USER_INFO_SUCCESS;
    user: TFormUser
}

export const updateUserDataAction = (): IUpdateUserDataRequestAction => ({
    type: UPDATE_USER_INFO_REQUEST
});

export const  updateUserDataFailedAction = (): IUpdateUserDataFailedAction => ({
    type: UPDATE_USER_INFO_ERROR
});

export const updateUserDataSuccessAction = (
    user: TFormUser
): IUpdateUserDataSuccessAction => ({
    type: UPDATE_USER_INFO_SUCCESS,
    user
});
export const updateUserDataThunk = (email: string, name: string) : AppThunk => (dispatch: AppDispatch) => {
    const token = 'Bearer ' + localStorage.getItem('accessToken');
    const data = {
        email,
        name
    }
    dispatch(updateUserDataAction());
    patchRequestAuth(AUTH_USER_URL, data, token)
        .then(res => {
            if (res && res.success) {
                dispatch(updateUserDataSuccessAction(res.user));
            } else {
                dispatch(updateUserDataFailedAction());
            }})
        .catch((error) => {
            dispatch(updateUserDataFailedAction());
        });
};

/****************************** forgotPassword ******************************/
export interface IForgotPasswordFailedAction {
    readonly type: typeof FORGOT_PASSWORD_ERROR;
}
export interface IForgotPasswordSuccessAction {
    readonly type: typeof FORGOT_PASSWORD_VISITED;
}

export const forgotPasswordFailedAction = (): IForgotPasswordFailedAction => ({
    type: FORGOT_PASSWORD_ERROR
});

export const  forgotPasswordSuccessAction = (): IForgotPasswordSuccessAction => ({
    type: FORGOT_PASSWORD_VISITED
});

export const forgotPasswordThunk = (value: string | undefined) : AppThunk => (dispatch: AppDispatch) => {
    dispatch(userLoginAction());
    postRequest(FORGOT_PASSWORD_URL, {email: value})
        .then(res => {
            if (res && res.success) {
                dispatch(forgotPasswordSuccessAction());
            } else {
                dispatch(forgotPasswordFailedAction());
            }})
        .catch((error) => {
            dispatch(forgotPasswordFailedAction());
        });
};

/****************************** resetPassword ******************************/
export interface IResetPasswordAction {
    readonly type: typeof RESET_PASSWORD;
}
export interface IResetPasswordFailedAction {
    readonly type: typeof RESET_PASSWORD_ERROR;
}

export const resetPasswordAction = (): IResetPasswordAction => ({
    type: RESET_PASSWORD
});

export const  resetPasswordFailedAction = (): IResetPasswordFailedAction => ({
    type: RESET_PASSWORD_ERROR
});

export const resetPasswordThunk = () : AppThunk => (dispatch: AppDispatch) => {
    dispatch(resetPasswordAction());
    postRequest(RASSWORD_RESET_URL, {} )
        .then(res => {
            if (res && res.success) {
                alert('Пароль обновлен!');
            } else {
                dispatch(resetPasswordFailedAction());
            }})
        .catch((error) => {
            dispatch(resetPasswordFailedAction());
        });
};

/****************************** register ******************************/
export interface IRegisterAction {
    readonly type: typeof REGISTER_REQUEST;
}
export interface IRegisterFailedAction {
    readonly type: typeof REGISTER_ERROR;
}

export interface IRegisterSuccessAction {
    readonly type: typeof REGISTER_SUCCESS;
    user: TFormUser;
}

export const registerAction = (): IRegisterAction => ({
    type: REGISTER_REQUEST
});

export const  registerFailedAction = (): IRegisterFailedAction => ({
    type: REGISTER_ERROR
});

export const registerSuccessAction = (
    user: TFormUser
): IRegisterSuccessAction => ({
    type: REGISTER_SUCCESS,
    user
});

export const registerThunk = (values: TFormUser) : AppThunk => (dispatch: AppDispatch) => {
    dispatch(registerAction());
    postRequest(REGISTER_URL, values )
        .then(res => {
            if (res && res.success) {
                dispatch(registerSuccessAction(res.user));
            } else {
                dispatch(registerFailedAction());
            }})
        .catch((error) => {
            dispatch(registerFailedAction());
        });
};

export type TUserActions =  IUserLogoutRequestAction |
    IUserLogoutFailedAction |
    IUserLogoutSuccessAction |
    IUserLoginRequestAction |
    IUserLoginFailedAction |
    IUserLoginSuccessAction |
    IGetUserDataRequestAction |
    IGetUserDataFailedAction |
    IGetUserDataSuccessAction |
    IRefreshTokenRequestAction |
    IRefreshTokenFailedAction |
    IRefreshTokenSuccessAction |
    IUpdateUserDataRequestAction |
    IUpdateUserDataFailedAction |
    IUpdateUserDataSuccessAction |
    IForgotPasswordFailedAction |
    IForgotPasswordSuccessAction |
    IResetPasswordAction |
    IResetPasswordFailedAction |
    IRegisterAction |
    IRegisterFailedAction |
    IRegisterSuccessAction;