import React, {useEffect} from 'react'
import { useParams } from 'react-router-dom';
import styles from '../../pages/pages.module.css';
import {TOrder, useDispatch} from "../../utils/types";
import {useSelector} from "../../utils/types";
import OrderInfo from "../order-info/order-info";
import {wSConnectionStart} from "../../services/actions/web-socket";
import {WSS_USER_ORDERS_URL} from "../../constants/burger-constants";

export interface ICardOrder{
    background?: boolean;
}

const OrderCardUser: React.FC<ICardOrder> = ({background }) => {
    // @ts-ignore
    const {id} = useParams();
    const dispatch = useDispatch();

    const orders = useSelector(store => store.orderListUser.orders);

    const order = orders.find((elem: TOrder) => elem._id === id);

    useEffect(() => {
        dispatch(wSConnectionStart(WSS_USER_ORDERS_URL + "?token=" + localStorage.getItem('accessToken')));
    },[dispatch])

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