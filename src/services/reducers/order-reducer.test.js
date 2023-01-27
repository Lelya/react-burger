import {orderInitialState, orderReducer as reducer} from "./order-reducer";
import {
    CLOSE_ORDER,
    SET_ORDER_ERROR,
    SET_ORDER_REQUEST, SET_ORDER_SUCCESS
} from "../actions";
describe('Тест редьюсера order', () => {
    it('should SET_ORDER_REQUEST', () => {
      expect(reducer(orderInitialState, { type: SET_ORDER_REQUEST })).toEqual({
        ...orderInitialState,
          orderId: '',
          isLoading: true,
      });
    });

    it("should SET_ORDER_SUCCESS", () => {
        const orderNumber = "123";
        expect(
            reducer(orderInitialState, { type: SET_ORDER_SUCCESS, orderNumber })
        ).toEqual({
            ...orderInitialState,
            isError: false,
            orderId: orderNumber,
            isLoading: false,
            isOpen: true
        });
    });

    it('should SET_ORDER_ERROR', () => {
        expect(reducer(orderInitialState, { type: SET_ORDER_ERROR })).toEqual({
            ...orderInitialState,
            isError: true,
            isLoading: false
        });
    });

    it('should CLOSE_ORDER', () => {
        expect(reducer(orderInitialState, { type: CLOSE_ORDER })).toEqual({
            ...orderInitialState,
            orderId: '',
            isOpen: false
        });
    });
})