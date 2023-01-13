import React, {useEffect} from 'react';
import styles from "../profile/profile.module.css";
import stylesProfileOrders from "./profile-orders.module.css";
import {TOrder, useDispatch, useSelectorTS} from "../../utils/types";
import OrderPreview from "../../components/order-preview/order-preview";
import appStyle from "../../components/app/app.module.css";
import ProfileTab from "../../components/profile-tab/profile-tab";
import {WSS_USER_ORDERS_URL} from "../../constants/burger-constants";
import {wSUserCloseConnection, wSUserConnectionStart} from "../../services/actions/web-socket-user";

export default function ProfileOrders ()  {
    const dispatch = useDispatch();

    const orders = useSelectorTS(store => store.orderListUser.orders);

    useEffect(() => {
        dispatch(wSUserConnectionStart({url: WSS_USER_ORDERS_URL + "?token=" + localStorage.getItem('accessToken'), socketId: "listUserOrder"}));
        return () => {
            dispatch(wSUserCloseConnection());
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