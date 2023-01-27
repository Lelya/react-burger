import {initialState, listAllIngredientsReducer as reducer} from "./list-all-ingredients-reducer";
import {GET_INGREDIENTS_ERROR, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS} from "../actions";
import {constructorInitialState} from "./list-constructor-ingredients-reducer";
import update from "immutability-helper";

describe('Тест редьюсера list-all-ingredients', () => {
    it('should GET_INGREDIENTS_REQUEST', () => {
        expect(reducer(initialState, { type: GET_INGREDIENTS_REQUEST })).toEqual({
            ...initialState,
            isLoading: true
        });
    });

    it("should GET_INGREDIENTS_SUCCESS", () => {
        const payload = {};
        expect(
            reducer(initialState, { type: GET_INGREDIENTS_SUCCESS, payload })
        ).toEqual({
            ...initialState,
            isLoading: false,
            items: payload.items,
            isError: false
        });
    });

    it('should GET_INGREDIENTS_ERROR', () => {
        expect(reducer(initialState, { type: GET_INGREDIENTS_ERROR })).toEqual({
            ...initialState,
            isLoading: false,
            isError: true
        });
    });
})