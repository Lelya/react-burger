import H from "history";
import React from "react";
import { ThunkAction } from 'redux-thunk';
import {TIngredientsActions, TSetOrderActions} from "../services/actions/order-actions";
import {TUserActions} from "../services/actions/user-actions";
import {TCurrentIngredientActions, TIngredientActions} from "../services/actions/ingredient-actions";
import { rootReducer } from "../services/reducers";
import type {} from "redux-thunk/extend-redux";
import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook,
} from "react-redux";
import {TWSListOrderActions} from "../services/actions/web-socket";
import {TWSListUserOrderActions} from "../services/actions/web-socket-user";
import {store} from "../services/store/store";

export type THistoryFrom = {
    from: string;
}

export type TModalBackground = {
    background: H.Location | null;
}

export interface IProtectedRouteProps {
    children: JSX.Element,
    onlyAuth: boolean
    rest?: string;
    path: string;
    exact?: boolean;
}

export type TIngredientData = {
    _id: string,
    name: string,
    type: 'bun' | 'sauce' | 'main',
    price: number,
    image: string,
    image_mobile: string,
    image_large: string,
    calories: number,
    proteins: number,
    fat: number,
    carbohydrates: number,
    uniqId?: number,
    count: number
}

export type TFormUser = {
    email?: string;
    password?: string;
    name?: string;
    token?: string;
}

export interface IOrderDetails {
    handlerClose: () => void,
    isOpenModal: boolean
}

export interface IModalOverlay {
    handlerClose: () => void;
}

export interface IModal {
    handlerClose: () => void;
    isOpen: boolean;
    children: React.ReactNode;
}
export interface IModalError {
    handlerClose: () => void;
    isOpenModal: boolean;
    error: string;
}
export type TOrderItem = {
    id: string;
    index?: number;
    ingredient: TIngredientData;
}

export type TOrder = {
    id?: string;
    _id?: string;
    number?: number;
    status?: string;
    name?: string;
    items?: Array<TOrderItem>;
    ingredients?: string[];
    createdAt?: string;
    updatedAt: string | number | Date;
}

export const statusList: Map<string,string> = new Map([
    ['created', 'Создан'],
    ['pending', 'Готовится'],
    ['done', 'Выполнен'],
]);

export type TWSSocketInfo = {
    url: string,
    socketId: string
}

export type RootState = ReturnType<typeof rootReducer>;

type TApplicationActions = TIngredientsActions |
    TSetOrderActions |
    TUserActions |
    TIngredientActions |
    TCurrentIngredientActions |
    TWSListOrderActions |
    TWSListUserOrderActions;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TApplicationActions>;

export type AppDispatch<ReturnType = void> = (action: TApplicationActions | AppThunk<ReturnType>) => ReturnType;

export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelectorTS: TypedUseSelectorHook<RootState> = selectorHook;

export type TStore = ReturnType<typeof store.getState>;