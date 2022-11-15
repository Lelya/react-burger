import { combineReducers } from 'redux';
import { listAllIngredientsReducer } from './list-all-ingredients-reducer';
import { listConstructorIngredientsReducer } from './list-constructor-ingredients-reducer';

export const rootReducer = combineReducers({
    listAllIngredients: listAllIngredientsReducer,
    listConstructorIngredients: listConstructorIngredientsReducer,
});