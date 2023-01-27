import { constructorInitialState, listConstructorIngredientsReducer as reducer } from "./list-constructor-ingredients-reducer";
import {
    ADD_BUN_INGREDIENT_TO_CONSTRUCTOR,
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    CLEAR_CONSTRUCTOR,
    DELETE_INGREDIENT_TO_CONSTRUCTOR,
    MOVE_INGREDIENT_IN_CONSTRUCTOR,
    WS_CONNECTION_ERROR
} from "../actions";
import update from "immutability-helper";
import {orderListInitialState} from "./order-list-reducer";
describe('Тест редьюсера order-list-user', () => {
    it("should ADD_INGREDIENT_TO_CONSTRUCTOR", () => {
        const payload = {
            items: [],
            bun: []
        };
        expect(
            reducer(constructorInitialState, { type: ADD_INGREDIENT_TO_CONSTRUCTOR, payload })
        ).toEqual({
            ...constructorInitialState,
            items: [...constructorInitialState.items, payload.item]
        });
    });

    it("should ADD_BUN_INGREDIENT_TO_CONSTRUCTOR", () => {
        const payload = {};
        expect(
            reducer(constructorInitialState, { type: ADD_BUN_INGREDIENT_TO_CONSTRUCTOR, payload })
        ).toEqual({
            ...constructorInitialState,
            bun: [...constructorInitialState.items, payload.bun]
        });
    });

    it("should DELETE_INGREDIENT_TO_CONSTRUCTOR", () => {
        const payload = "ingredient";
        expect(
            reducer(constructorInitialState, { type: DELETE_INGREDIENT_TO_CONSTRUCTOR, payload })
        ).toEqual({
            ...constructorInitialState,
            items:  [{ uniqId: "ingredient" }].filter(elem => elem.uniqId !== payload),
        });
    });

    it("should MOVE_INGREDIENT_IN_CONSTRUCTOR", () => {
        const payload = {
            dragIndex: 1,
            hoverIndex: 2
        };
        expect(
            reducer(constructorInitialState, { type: MOVE_INGREDIENT_IN_CONSTRUCTOR, payload })
        ).toEqual({
            ...constructorInitialState,
            items: update(constructorInitialState.items,{
                $splice: [
                    [payload.dragIndex, 1],
                    [payload.hoverIndex, 0, constructorInitialState.items[payload.dragIndex]],
                ],
            })
        });
    });

    it('should CLEAR_CONSTRUCTOR', () => {
        expect(reducer(constructorInitialState, { type: CLEAR_CONSTRUCTOR })).toEqual({
            ...constructorInitialState,
            bun: [],
            items: []
        });
    });
})