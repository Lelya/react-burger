import React, {useEffect} from 'react';
import styles from "../profile/profile.module.css";
import stylesProfileOrders from "./profile-orders.module.css";
import {getOrderListUserThunk} from "../../services/actions/order-list-actions";
import {useDispatch, useSelector} from "../../utils/types";
import OrderPreview from "../../components/order-preview/order-preview";
import appStyle from "../../components/app/app.module.css";
import ProfileTab from "../../components/profile-tab/profile-tab";

export default function ProfileOrders ()  {
    const dispatch = useDispatch();

    const orders = useSelector(store => store.orderListUser.orders);

    useEffect(() => {
        dispatch(getOrderListUserThunk());
    },[dispatch])

    return (
        <>
            <div className={`${appStyle.wrapper} mt-25`}>
                <div className={stylesProfileOrders.wrapper_profile_tab}>
                    <ProfileTab text={"В этом разделе вы можете просмотреть свою историю заказов"}/>
                </div>
                <div className={`${styles.orderListUserWrapper}`}>
                    <div className={`${styles.orderListUser}`}>
                        {orders.map(order => (
                            <OrderPreview order={order} visibleStatus={true} key={order._id} url={"/profile/feed"}/>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}