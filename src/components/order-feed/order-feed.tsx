import React, {useEffect} from 'react';
import styles from "./order-feed.module.css";
import {getOrderListThunk} from "../../services/actions/order-list-actions";
import {useDispatch, useSelector} from "../../utils/types";
import OrderPreview from "../order-preview/order-preview";

export default function OrderFeed ()  {
    const dispatch = useDispatch();

    const orders = useSelector(store => store.orderList.orders);

    useEffect(() => {
        dispatch(getOrderListThunk());
    },[dispatch])

    return (
        <section className={`${styles.orderFeed} p-10`}>
            <div className="text text_type_main-large">
                <p className="text text_type_main-large pb-6">Лента заказов</p>
            </div>
            <div className={`${styles.ingredients}`}>
                {orders.map(order => (
                    <OrderPreview order={order} visibleStatus={false} key={order._id}/>
                ))}
            </div>
        </section>
    )
}