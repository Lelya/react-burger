import H from "history";
import React from "react";

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