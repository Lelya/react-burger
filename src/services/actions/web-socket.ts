import {
    WS_CLOSE_CONNECTION,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_GET_MESSAGE
} from "./index";

interface IWSConnectionStart {
    readonly type: typeof WS_CONNECTION_START;
    payload?: any;
}
interface IWSConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS;
    payload?: any;
}
interface IWSConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR;
    payload?: any;
}
interface IWSGetMessage {
    readonly type: typeof WS_GET_MESSAGE;
    payload?: any;
}
interface IWSCloseConnection {
    readonly type: typeof WS_CLOSE_CONNECTION;
    payload?: any;
}

export type TWSListOrderActions =
    | IWSConnectionStart
    | IWSConnectionSuccess
    | IWSConnectionError
    | IWSGetMessage
    | IWSCloseConnection;

export const WSActionsListOrder = {
    wsStart: WS_CONNECTION_START,
    wsSuccess: WS_CONNECTION_SUCCESS,
    wsClose: WS_CLOSE_CONNECTION,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE,
};
