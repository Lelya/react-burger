import React, {useEffect, useMemo} from 'react'
import { useParams } from 'react-router-dom';
import styles from '../../pages/pages.module.css';
import {statusList, TOrder, useDispatch} from "../../utils/types";
import {useSelector} from "../../utils/types";
import OrderInfo from "../order-info/order-info";
import {getOrderListThunk} from "../../services/actions/order-list-actions";

export interface ICardIngredient {
    background?: boolean;
}

const OrderCard: React.FC<ICardIngredient> = ({background }) => {
    // @ts-ignore
    const {id} = useParams();
    const dispatch = useDispatch();

    const orders = useSelector(store => store.orderList.orders);

    const order = orders.find((elem: TOrder) => elem._id === id);

    useEffect(() => {
        dispatch(getOrderListThunk());
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

export default OrderCard;