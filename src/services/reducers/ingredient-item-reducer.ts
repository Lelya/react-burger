import {CLOSE_CURRENT_ITEM_DETAILS, OPEN_CURRENT_ITEM_DETAILS} from "../actions";
import {TCurrentIngredientActions} from "../actions/ingredient-actions";

export const ingredientItemInitialState = {
    currentItem: {},
    isOpen: false,
}

export const ingredientItemReducer = (state = ingredientItemInitialState, action: TCurrentIngredientActions) => {
    switch (action.type) {
        case OPEN_CURRENT_ITEM_DETAILS: {
            return {
                ...state,
                currentItem: action.item,
                isOpen: true,
            };
        }
        case CLOSE_CURRENT_ITEM_DETAILS: {
            return {
                ...state,
                currentItem: {},
                isOpen: false,
            };
        }
        default: {
            return state;
        }
    }
}