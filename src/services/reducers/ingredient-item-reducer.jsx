import { OPEN_CURRENT_ITEM_DETAILS, CLOSE_CURRENT_ITEM_DETAILS } from '../actions';

const ingredientItemInitialState = {
    currentItem: {},
    isOpen: false,
}

export const ingredientItemReducer = (state = ingredientItemInitialState, action) => {
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