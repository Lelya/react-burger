import {orderListUserInitialState, orderListUserReducer as reducer} from "./order-list-user-reducer";
import {
  WS_CONNECTION_START, WS_USER_CONNECTION_ERROR, WS_USER_CONNECTION_SUCCESS, WS_USER_GET_MESSAGE
} from "../actions";
import {orderInitialState} from "./order-reducer";
describe('Тест редьюсера order-list-user', () => {
    it('should WS_CONNECTION_START', () => {
      expect(reducer(orderListUserInitialState, { type: WS_CONNECTION_START })).toEqual({
        ...orderListUserInitialState,
          ordersRequest: false
      });
    });

    it('should WS_USER_CONNECTION_SUCCESS', () => {
        expect(reducer(orderListUserInitialState, { type: WS_USER_CONNECTION_SUCCESS })).toEqual({
            ...orderListUserInitialState,
            ordersRequest: false,
            ordersFailed: false
        });
    });

    it('should WS_USER_CONNECTION_ERROR', () => {
        expect(reducer(orderListUserInitialState, { type: WS_USER_CONNECTION_ERROR })).toEqual({
            ...orderListUserInitialState,
            ordersFailed: true,
            ordersRequest: false
        });
    });

    it("should WS_USER_GET_MESSAGE", () => {
        const payload = {
            orders: [],
            ordersRequest: false,
            ordersFailed: false,
            total: 100,
            totalToday: 10,
        };
        expect(
            reducer(orderInitialState, { type: WS_USER_GET_MESSAGE, payload })
        ).toEqual({
            ...orderInitialState,
            ordersFailed: false,
            ordersRequest: false,
            orders: payload.orders.reverse(),
            total: payload.total,
            totalToday: payload.totalToday
        });
    });

})