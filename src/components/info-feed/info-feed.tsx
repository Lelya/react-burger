import React, {FC, useEffect, useMemo} from 'react';
import styles from "./info-feed.module.css";
import {TOrder, useDispatch, useSelector} from "../../utils/types";
import {getOrderListThunk} from "../../services/actions/order-list-actions";

type TOrderStatusListProps = {
    orders: Array<TOrder>,
    name: string
}

const OrderStatusList: FC<TOrderStatusListProps> = ({orders, name}) => {
    return (
        <div className={styles.orderStatusList}>
            <h1 className="text text_type_main-medium pb-6">{name}</h1>
            <div className={styles.orderStatusListNumbers}>
                {orders.map(order => (
                    <div key={order.number} className={styles.orderNumber}>{order.number}</div>
                ))}
            </div>
        </div>
    );
}

export default function InfoFeed ()  {
    const dispatch = useDispatch();

    const orders = useSelector(store => store.orderList.orders);

    const total = useSelector(store => store.orderList.total);
    const totalToday = useSelector(store => store.orderList.totalToday);

    const ordersDone = useMemo(() => orders.filter(order => order.status === 'done'), [orders]);
    const ordersPending = useMemo(() => orders.filter(order => order.status === 'pending'), [orders]);

    useEffect(() => {
        dispatch(getOrderListThunk());
    },[dispatch])


    return (
        <section className={`${styles.infoFeed} mt-25`}>
            <div className={styles.infoContainer}>
                <div className={`${styles.infoFeedContainer} pb-15`}>
                    <OrderStatusList orders={ordersDone} name={'Готовы:'}/>
                    <OrderStatusList orders={ordersPending} name={'В работе:'}/>
                </div>
                <div className="pb-15">
                    <div className="text text_type_main-medium">Выполнено за все время:</div>
                    <div className="text text_type_digits-large">{total}</div>
                </div>
                <div>
                    <div className="text text_type_main-medium">Выполнено за сегодня:</div>
                    <div className="text text_type_digits-large">{totalToday}</div>
                </div>
            </div>
        </section>
    )
}