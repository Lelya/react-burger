import {orderListInitialState, orderListReducer as reducer} from "./order-list-reducer";
import {
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_GET_MESSAGE,
} from "../actions";
describe('Тест редьюсера order-list-user', () => {
    it('should WS_CONNECTION_START', () => {
      expect(reducer(orderListInitialState, { type: WS_CONNECTION_START })).toEqual({
        ...orderListInitialState,
          ordersRequest: true
      });
    });

    it('should WS_CONNECTION_SUCCESS', () => {
        expect(reducer(orderListInitialState, { type: WS_CONNECTION_SUCCESS })).toEqual({
            ...orderListInitialState,
            ordersRequest: false,
            ordersFailed: false
        });
    });

    it('should WS_CONNECTION_ERROR', () => {
        expect(reducer(orderListInitialState, { type: WS_CONNECTION_ERROR })).toEqual({
            ...orderListInitialState,
            ordersFailed: true,
            ordersRequest: false
        });
    });

    it("should WS_GET_MESSAGE", () => {
        const payload = {
            orders: [],
            total: 10,
            totalToday: 0,
            ordersRequest: false,
            ordersFailed: false,
        };
        expect(
            reducer(orderListInitialState, { type: WS_GET_MESSAGE, payload })
        ).toEqual({
            ...orderListInitialState,
            ordersFailed: false,
            orders: payload.orders,
            total: payload.total,
            totalToday: payload.totalToday
        });
    });

})