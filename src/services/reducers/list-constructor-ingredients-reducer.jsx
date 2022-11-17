import { ADD_BUN_INGREDIENT_TO_CONSTRUCTOR, ADD_INGREDIENT_TO_CONSTRUCTOR, DELETE_INGREDIENT_TO_CONSTRUCTOR } from "../actions";

const constructorInitialState = {
    items: [],
    bun: []
}

export const listConstructorIngredientsReducer = (state = constructorInitialState, action ) => {
    switch (action.type) {
        case ADD_INGREDIENT_TO_CONSTRUCTOR: {
            return {...state, items: [...state.items, action.item]  }
        }
        case ADD_BUN_INGREDIENT_TO_CONSTRUCTOR: {
            return {...state, bun: [action.bun]  }
        }
        case DELETE_INGREDIENT_TO_CONSTRUCTOR: {
            debugger;
            const newItems = state.items.filter(elem => elem.uniqId !== action.id);
            return {
                ...state,
                items: newItems,
            }
        }
        default: {
            return state;
        }
    }
}