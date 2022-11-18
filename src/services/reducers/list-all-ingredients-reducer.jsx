import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_ERROR } from '../actions';

const initialState = {
    items: [],
    isLoading: false,
    isError: false,
};
export const listAllIngredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {...state, isLoading: true};
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {...state, isLoading: false, items: action.items, isError: false};
        }
        case GET_INGREDIENTS_ERROR: {
            return {...state, isLoading: false, isError: true};
        }
        default: {
            return state;
        }
    }
}