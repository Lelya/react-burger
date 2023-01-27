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
