import {MiddlewareAPI} from "@reduxjs/toolkit";
import { Middleware } from 'redux';
import {TStore} from "../../utils/types";
import {store} from "../store/store";

type AppDispatch = typeof store.dispatch;

export type WSActions = {
  wsStart: string;
  wsClose: string;
  wsSuccess: string;
  onError: string;
  onMessage: string;
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
      //
      //
      // if (action.type === wsStart && socket === null) {
      //     if (socketId === action.payload.socketId) {
      //       socket = new WebSocket(action.payload.url);
      //
      //       if (socket) {
      //         socket.onopen = event => {
      //             dispatch({ type: wsSuccess });
      //         };
      //
      //         socket.onerror = event => {
      //             dispatch({ type: onError });
      //         };
      //
      //         socket.onmessage = event => {
      //           const {data} = event;
      //           const dataObject = JSON.parse(data);
      //           dispatch({ type: onMessage, payload: dataObject });
      //         };
      //
      //         socket.onclose = event => {
      //           socket = null;
      //         };
      //       }
      //     }
      //   }
      //   if (action.type === wsClose && socket != null) {
      //     console.log('WebSocket closed');
      //     socket.close();
      //   }
      next(action);
    };
  }) as Middleware;
};