import {MiddlewareAPI} from "@reduxjs/toolkit";
import { Middleware } from 'redux';
import {AppDispatch, RootState} from "../../utils/types";
import {
  WS_CLOSE_CONNECTION,
  WS_CONNECTION_START
} from "../actions";
import {TWSActions, wSConnectionError, wSConnectionSuccess, wSGetMessage} from "../actions/web-socket";

export const socketMiddleware = (): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: TWSActions) => {
      const { dispatch } = store;
      const { type, payload } = action;

      if (type === WS_CONNECTION_START) {
        socket = new WebSocket(payload);
      }

      if (type === WS_CLOSE_CONNECTION) {
        if (socket !== null && socket.readyState === 1) {
          socket.close();
        }
      }

      if (socket) {
        socket.onopen = event => {
          dispatch(wSConnectionSuccess(event));
        };

        socket.onerror = event => {
          dispatch(wSConnectionError(event));
        };

        socket.onmessage = event => {
          const { data } = event;
          const dataObject = JSON.parse(data);
          dispatch(wSGetMessage(dataObject));
        };

        socket.onclose = event => {
          console.log('WebSocket closed');
        };

      }

      next(action);
    };
  }) as Middleware;
};