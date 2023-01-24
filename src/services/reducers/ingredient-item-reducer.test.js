import {ingredientItemInitialState, ingredientItemReducer as reducer} from "./ingredient-item-reducer";
import {CLOSE_CURRENT_ITEM_DETAILS, OPEN_CURRENT_ITEM_DETAILS} from "../actions";

describe('Тест редьюсера ingredient-item', () => {
    it("should OPEN_CURRENT_ITEM_DETAILS", () => {
        const payload = {};
        expect(
            reducer(ingredientItemInitialState, { type: OPEN_CURRENT_ITEM_DETAILS, payload })
        ).toEqual({
            ...ingredientItemInitialState,
            currentItem: payload.item,
            isOpen: true,
        });
    });

    it('should CLOSE_CURRENT_ITEM_DETAILS', () => {
        expect(reducer(ingredientItemInitialState, { type: CLOSE_CURRENT_ITEM_DETAILS })).toEqual({
            ...ingredientItemInitialState,
            currentItem: {},
            isOpen: false,
        });
    });
})