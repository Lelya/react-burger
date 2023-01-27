import {
    ADD_BUN_INGREDIENT_TO_CONSTRUCTOR,
    ADD_INGREDIENT_TO_CONSTRUCTOR, CLEAR_CONSTRUCTOR,
    DELETE_INGREDIENT_TO_CONSTRUCTOR,
    MOVE_INGREDIENT_IN_CONSTRUCTOR
} from "../actions";
import update from 'immutability-helper';
import {TIngredientActions} from "../actions/ingredient-actions";
import {TIngredientData} from "../../utils/types";

type TConstructorInitialState = {
    items: ReadonlyArray<TIngredientData>,
    bun: ReadonlyArray<TIngredientData>
}

export const constructorInitialState: TConstructorInitialState = {
    items: [],
    bun: []
}

export const listConstructorIngredientsReducer = (state = constructorInitialState, action: TIngredientActions ) => {
    switch (action.type) {
        case ADD_INGREDIENT_TO_CONSTRUCTOR: {
            return {...state, items: [...state.items, action.item]  }
        }
        case ADD_BUN_INGREDIENT_TO_CONSTRUCTOR: {
            return {...state, bun: [action.bun]  }
        }
        case DELETE_INGREDIENT_TO_CONSTRUCTOR: {
            const newItems = state.items.filter(elem => elem.uniqId !== action.id);
            return {
                ...state,
                items: newItems,
            }
        }
        case MOVE_INGREDIENT_IN_CONSTRUCTOR: {
            return {
                ...state,
                items: update(state.items,{
                    $splice: [
                        [action.dragIndex, 1],
                        [action.hoverIndex, 0, state.items[action.dragIndex]],
                    ],
                })
            }
        }
        case CLEAR_CONSTRUCTOR: {
            return { items: [], bun: []  }
        }
        default: {
            return state;
        }
    }
}