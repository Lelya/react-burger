import React, {useEffect} from 'react';
import styles from "../profile/profile.module.css";
import stylesProfileOrders from "./profile-orders.module.css";
import {TOrder, useDispatch, useSelector} from "../../utils/types";
import OrderPreview from "../../components/order-preview/order-preview";
import appStyle from "../../components/app/app.module.css";
import ProfileTab from "../../components/profile-tab/profile-tab";
import {wSCloseConnection, wSConnectionStart} from "../../services/actions/web-socket";
import {WSS_USER_ORDERS_URL} from "../../constants/burger-constants";

export default function ProfileOrders ()  {
    const dispatch = useDispatch();

    const orders = useSelector(store => store.orderListUser.orders);
    console.log(JSON.stringify(orders))

    useEffect(() => {
        dispatch(wSConnectionStart(WSS_USER_ORDERS_URL + "?token=" + localStorage.getItem('accessToken')));
        return () => {
            dispatch(wSCloseConnection());
        };
    },[dispatch])

    return (
        <>
            <div className={`${appStyle.wrapper} mt-25`}>
                <div className={stylesProfileOrders.wrapper_profile_tab}>
                    <ProfileTab text={"В этом разделе вы можете просмотреть свою историю заказов"}/>
                </div>
                <div className={`${styles.orderListUserWrapper}`}>
                    <div className={`${styles.orderListUser}`}>
                        {orders.map((order: TOrder) => (
                            <OrderPreview order={order} visibleStatus={true} key={order._id} url={"/profile/orders"}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}