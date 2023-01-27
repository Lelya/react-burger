import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom';
import styles from '../../pages/pages.module.css';
import {TOrder, useDispatch} from "../../utils/types";
import {useSelectorTS} from "../../utils/types";
import OrderInfo from "../order-info/order-info";
import {WSS_ALL_ORDERS_URL} from "../../constants/burger-constants";
import {WS_CONNECTION_START} from "../../services/actions";

export interface ICardOrder{
    background?: boolean;
}

const OrderCard: React.FC<ICardOrder> = ({background }) => {
    // @ts-ignore
    const {id} = useParams();
    const dispatch = useDispatch();

    const orders = useSelectorTS(store => store.orderList.orders);

    const order = orders.find((elem: TOrder) => elem._id === id);

    useEffect(() => {
        dispatch({
            type: WS_CONNECTION_START,
            payload: {
                url: WSS_ALL_ORDERS_URL,
                socketId: "listOrder"
            },
        });
    }, [dispatch]);

    return (
        <div className={background ?  styles.ingredient_wrapper_modal : styles.ingredient_wrapper}>
            { order &&
                <OrderInfo order={order}
                />
            }
        </div>
    )
}

export default OrderCard;