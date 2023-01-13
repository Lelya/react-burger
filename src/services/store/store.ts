import { rootReducer } from '../reducers';
import {socketMiddleware, WSActions} from "../middleware/socketMiddleware";
import {configureStore} from "@reduxjs/toolkit";
import {WSActionsListOrder} from "../actions/web-socket";
import {WSActionsListUserOrder} from "../actions/web-socket-user";

export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(
            socketMiddleware(
                WSActionsListOrder as WSActions,
                "listOrder"
            ),
            socketMiddleware(
                WSActionsListUserOrder as WSActions,
                "listUserOrder"
            )
        ),
});

// export const store = createStore(rootReducer, enhancer);



