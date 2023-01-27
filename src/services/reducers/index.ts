import { combineReducers } from 'redux';
import { listAllIngredientsReducer } from './list-all-ingredients-reducer';
import { listConstructorIngredientsReducer } from './list-constructor-ingredients-reducer';
import {ingredientItemReducer} from "./ingredient-item-reducer";
import {orderReducer} from "./order-reducer";
import {userReducer} from "./user-reducer";
import {orderListReducer} from "./order-list-reducer";
import {orderListUserReducer} from "./order-list-user-reducer";

export const rootReducer = combineReducers({
    listAllIngredients: listAllIngredientsReducer,
    listConstructorIngredients: listConstructorIngredientsReducer,
    ingredientItem: ingredientItemReducer,
    orderInfo: orderReducer,
    userInfo: userReducer,
    orderList: orderListReducer,
    orderListUser: orderListUserReducer,
});