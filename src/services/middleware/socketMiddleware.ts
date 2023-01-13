import {MiddlewareAPI} from "@reduxjs/toolkit";
import { Middleware } from 'redux';
import {AppDispatch, TStore} from "../../utils/types";
import {wSConnectionError, wSConnectionSuccess, wSGetMessage} from "../actions/web-socket";
import {wSUserConnectionError, wSUserConnectionSuccess, wSUserGetMessage} from "../actions/web-socket-user";

export type WSActions = {
  wsStart: string;
  wsClose: string;
};

type TWSAction = {
  type: string;
  payload: any;
};

export const socketMiddleware = (
    actions: WSActions,
    socketId: string
): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, TStore>) => {
    let socket: WebSocket | null = null;
    return (next) => (action: TWSAction) => {
      const { dispatch } = store;
      const { wsStart, wsClose } = actions;

      if (action.type === wsStart && socket === null) {
          if (socketId === action.payload.socketId) {
            socket = new WebSocket(action.payload.url);

            if (socket) {
              socket.onopen = event => {
                if (socketId === "listOrder") {
                  dispatch(wSConnectionSuccess(event));
                } else {
                  dispatch(wSUserConnectionSuccess(event));
                }
              };

              socket.onerror = event => {
                if (socketId === "listOrder") {
                  dispatch(wSConnectionError(event));
                } else {
                  dispatch(wSUserConnectionError(event));
                }
              };

              socket.onmessage = event => {
                const {data} = event;
                const dataObject = JSON.parse(data);
                if (socketId === "listOrder") {
                  dispatch(wSGetMessage(dataObject));
                } else {
                  dispatch(wSUserGetMessage(dataObject));
                }
              };

              socket.onclose = event => {
                console.log('WebSocket closed');
                socket = null;
              };
            }
          }
        }
        if (action.type === wsClose && socket != null) {
          socket.close();
        }
      next(action);
    };
  }) as Middleware;
};