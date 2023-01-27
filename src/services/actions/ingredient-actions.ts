import {
    ADD_BUN_INGREDIENT_TO_CONSTRUCTOR,
    ADD_INGREDIENT_TO_CONSTRUCTOR, CLEAR_CONSTRUCTOR,
    CLOSE_CURRENT_ITEM_DETAILS,
    DELETE_INGREDIENT_TO_CONSTRUCTOR,
    MOVE_INGREDIENT_IN_CONSTRUCTOR,
    OPEN_CURRENT_ITEM_DETAILS
} from "./index";
import {TIngredientData} from "../../utils/types";

export interface IOpenCurrentItemAction {
    readonly type: typeof OPEN_CURRENT_ITEM_DETAILS;
    item: TIngredientData
}
export interface ICloseCurrentItemAction {
    readonly type: typeof CLOSE_CURRENT_ITEM_DETAILS;
}
export type TCurrentIngredientActions = IOpenCurrentItemAction |
    ICloseCurrentItemAction;

export const openCurrentItemAction = (
    item: TIngredientData
): IOpenCurrentItemAction => ({
    type: OPEN_CURRENT_ITEM_DETAILS,
    item
});

export const closeCurrentItemAction = (): ICloseCurrentItemAction => ({
    type: CLOSE_CURRENT_ITEM_DETAILS
});

export interface IAddIngredientToConstructorItemAction {
    readonly type: typeof ADD_INGREDIENT_TO_CONSTRUCTOR;
    item: TIngredientData,
}

export const addIngredientToConstructorItemAction = (
    item: TIngredientData
): IAddIngredientToConstructorItemAction => ({
    type: ADD_INGREDIENT_TO_CONSTRUCTOR,
    item
});

export interface IAddBunToConstructorItemAction {
    readonly type: typeof ADD_BUN_INGREDIENT_TO_CONSTRUCTOR;
    bun: TIngredientData
}

export const addBunToConstructorItemAction = (
    bun: TIngredientData
): IAddBunToConstructorItemAction => ({
    type: ADD_BUN_INGREDIENT_TO_CONSTRUCTOR,
    bun
});

export interface IDeleteIngredientToConstructorItemAction {
    readonly type: typeof DELETE_INGREDIENT_TO_CONSTRUCTOR;
    readonly id: number
}

export const deleteIngredientToConstructorItemAction = (
    id: number
): IDeleteIngredientToConstructorItemAction => ({
    type: DELETE_INGREDIENT_TO_CONSTRUCTOR,
    id
});

export interface IMoveIngredientInConstructorItemAction {
    readonly type: typeof MOVE_INGREDIENT_IN_CONSTRUCTOR;
    readonly dragIndex: number,
    readonly hoverIndex: number,

}

export const moveIngredientInConstructorItemAction = (
    dragIndex: number,
    hoverIndex: number
): IMoveIngredientInConstructorItemAction => ({
    type: MOVE_INGREDIENT_IN_CONSTRUCTOR,
    dragIndex,
    hoverIndex
});

export interface IClearConstructorItemAction {
    readonly type: typeof CLEAR_CONSTRUCTOR;
}

export const clearConstructorItemAction = (): IClearConstructorItemAction => ({
    type: CLEAR_CONSTRUCTOR
});

export type TIngredientActions = IAddIngredientToConstructorItemAction |
    IAddBunToConstructorItemAction |
    IDeleteIngredientToConstructorItemAction |
    IMoveIngredientInConstructorItemAction |
    IClearConstructorItemAction;
