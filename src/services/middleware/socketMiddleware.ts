import {MiddlewareAPI} from "@reduxjs/toolkit";
import { Middleware } from 'redux';
import {TStore, TWSSocketInfo} from "../../utils/types";
import {store} from "../store/store";

type AppSocketDispatch = typeof store.dispatch;

export type WSActions = {
  wsStart: string;
  wsClose: string;
  wsSuccess: string;
  onError: string;
  onMessage: string;
};

type TWSAction = {
  type: string;
  payload: TWSSocketInfo;
};

export const socketMiddleware = (
    actions: WSActions,
    socketId: string
): Middleware => {
  return ((store: MiddlewareAPI<AppSocketDispatch, TStore>) => {
    let socket: WebSocket | null = null;
    return (next) => (action: TWSAction) => {
      const { dispatch } = store;
      const { wsStart, wsSuccess, wsClose, onError, onMessage } = actions;

      if (action.type === wsStart && socket === null && socketId === action.payload.socketId) {
        socket = new WebSocket(action.payload.url);

        if (socket) {
          socket.onopen = () => {
            dispatch({ type: wsSuccess });
          };

          socket.onmessage = (event) => {
            dispatch({ type: onMessage, payload: JSON.parse(event.data) });
          };

          socket.onerror = () => {
            dispatch({ type: onError });
          };

          socket.onclose = () => {
            socket = null;
          };
        }
      } else if (action.type === wsClose && socket !== null && socketId === action.payload.socketId && socket?.readyState === 1) {
        console.log('WebSocket closed');
        socket.close();
      }

      next(action);
    };
  }) as Middleware;
};