import {
    WS_USER_CONNECTION_START,
    WS_USER_CONNECTION_SUCCESS,
    WS_USER_CONNECTION_ERROR,
    WS_USER_GET_MESSAGE,
    WS_USER_CLOSE_CONNECTION,
} from "./index";

interface IWSUserConnectionStart {
    readonly type: typeof WS_USER_CONNECTION_START;
    payload?: any;
}
interface IWSUserConnectionSuccess {
    readonly type: typeof WS_USER_CONNECTION_SUCCESS;
    payload?: any;
}
interface IWSUserConnectionError {
    readonly type: typeof WS_USER_CONNECTION_ERROR;
    payload?: any;
}
interface IWSUserGetMessage {
    readonly type: typeof WS_USER_GET_MESSAGE;
    payload?: any;
}
interface IWSUserCloseConnection {
    readonly type: typeof WS_USER_CLOSE_CONNECTION;
    payload?: any;
}

export const wSUserConnectionStart = (
    payload: any
): IWSUserConnectionStart => ({
    type: WS_USER_CONNECTION_START,
    payload
});

export const wSUserConnectionSuccess = (
    payload: any
): IWSUserConnectionSuccess => ({
    type: WS_USER_CONNECTION_SUCCESS,
    payload
});

export const wSUserConnectionError = (
    payload: any
): IWSUserConnectionError => ({
    type: WS_USER_CONNECTION_ERROR,
    payload
});

export const wSUserGetMessage = (
    payload: any
): IWSUserGetMessage => ({
    type: WS_USER_GET_MESSAGE,
    payload
});

export const wSUserCloseConnection = (): IWSUserCloseConnection => ({
    type: WS_USER_CLOSE_CONNECTION
});

export type TWSListUserOrderActions =
    | IWSUserConnectionStart
    | IWSUserConnectionSuccess
    | IWSUserConnectionError
    | IWSUserGetMessage
    | IWSUserCloseConnection;

export const WSActionsListUserOrder = {
    wsStart: WS_USER_CONNECTION_START,
    wsSuccess: WS_USER_CONNECTION_SUCCESS,
    wsClose: WS_USER_CLOSE_CONNECTION,
    onError: WS_USER_CONNECTION_ERROR,
    onMessage: WS_USER_GET_MESSAGE,
};
