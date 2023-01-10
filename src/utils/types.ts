import H from "history";
import React from "react";
import {store} from "../services/store/store";
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import {TIngredientsActions, TSetOrderActions} from "../services/actions/order-actions";
import {TUserActions} from "../services/actions/user-actions";
import {TCurrentIngredientActions, TIngredientActions} from "../services/actions/ingredient-actions";

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
    uniqId?: number
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

export type RootState = ReturnType<typeof store.getState>;
type TApplicationActions = TIngredientsActions |
    TSetOrderActions |
    TUserActions |
    TIngredientActions |
    TCurrentIngredientActions;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
    ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;