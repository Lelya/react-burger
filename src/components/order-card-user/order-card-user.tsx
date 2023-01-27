import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom';
import styles from '../../pages/pages.module.css';
import {TOrder, useDispatch} from "../../utils/types";
import {useSelectorTS} from "../../utils/types";
import OrderInfo from "../order-info/order-info";
import {WSS_USER_ORDERS_URL} from "../../constants/burger-constants";
import {WS_USER_CONNECTION_START} from "../../services/actions";

export interface ICardOrder{
    background?: boolean;
}

const OrderCardUser: React.FC<ICardOrder> = ({background }) => {
    // @ts-ignore
    const {id} = useParams();
    const dispatch = useDispatch();

    const orders = useSelectorTS(store => store.orderListUser.orders);

    const order = orders.find((elem: TOrder) => elem._id === id);

    useEffect(() => {
        dispatch({
            type: WS_USER_CONNECTION_START,
            payload: {
                url: WSS_USER_ORDERS_URL + "?token=" + localStorage.getItem('accessToken'),
                socketId: "listUserOrder"
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

export default OrderCardUser;