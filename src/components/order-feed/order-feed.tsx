import React, {useEffect} from 'react';
import styles from "./order-feed.module.css";
import {TOrder, useDispatch, useSelectorTS} from "../../utils/types";
import OrderPreview from "../order-preview/order-preview";
import {wSCloseConnection, wSConnectionStart} from "../../services/actions/web-socket";
import {WSS_ALL_ORDERS_URL} from "../../constants/burger-constants";

export default function OrderFeed ()  {
    const dispatch = useDispatch();

    const orders = useSelectorTS(store => store.orderList.orders);

    useEffect(() => {
        dispatch(wSConnectionStart({url: WSS_ALL_ORDERS_URL, socketId: "listOrder"}));
        return () => {
            dispatch(wSCloseConnection());
        };
    },[dispatch])

    return (
        <section className={`${styles.orderFeed} p-10`}>
            <div className="text text_type_main-large">
                <p className="text text_type_main-large pb-6">Лента заказов</p>
            </div>
            <div className={`${styles.ingredients}`}>
                {orders.map((order: TOrder) => (
                    <OrderPreview order={order} visibleStatus={false} key={order._id} url={"/feed"}/>
                ))}
            </div>
        </section>
    )
}