import React, {useMemo} from 'react';

import styles from "../../pages/pages.module.css";
import stylesInfo from "./order-info.module.css";
import {statusList, TIngredientData, TOrder, useSelectorTS} from "../../utils/types";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {IngredientLine} from "../ingredient-line/ingredient-line";

export interface TOrderInfo {
    order: TOrder;
}

const OrderInfo: React.FC<TOrderInfo> = ({order}) => {
    const ingredients = useSelectorTS(store => store.listAllIngredients.items);

    const orderIngredients = useMemo(() => {
        return order?.ingredients?.map(id => {
            return ingredients.find(ingredient => ingredient._id === id);
        })
            .reduce((a,b) => {
                const v = a.find(c => c._id === b?._id);
                if (v) { v.count = v.count ? v.count + 1 : 2;}
                else {
                    if (b) { a.push({...b, count: 1}); }
                }
                return a;
            }, [] as Array<TIngredientData>) ?? [] as Array<TIngredientData>;
    }, [ingredients, order]);

    const total = useMemo(() =>
            orderIngredients
                .map(ingredient => ingredient?.price * ingredient?.count ?? 0)
                .reduce((a, b) => a + b, 0)
        , [orderIngredients]);

    const status = useMemo(() => order.status ? statusList.get(order.status) : 'не определен', [order])

    return (
        <>
            <div className={`${styles.orderContainer} mb-8 p-6`} key={order._id}
            >
                <div className="text text_type_digits-default pb-10">#{order.number}</div>

                <div className={`${styles.text_left} text text_type_main-medium`}>{order.name}</div>
                <div className={`${stylesInfo.textStatus} text text text_type_main-small pb-10`}>{status}</div>
                <div className={`${styles.text_left} text text_type_main-medium pb-15`}>Состав:</div>
                <div className={styles.ingredientsContainer}>
                    {orderIngredients.map(ingredient => (
                        ingredient && <IngredientLine ingredient={ingredient} count={ingredient.count ?? 1} key={ingredient._id}/>
                    ))}
                </div>
                <div className={`${styles.headerLine} pt-10`}>
                    <div className="text text_type_main-default text_color_inactive">
                        <FormattedDate date={new Date(order.updatedAt)} />
                    </div>
                    <div className={`${styles.price} mb-4 text text_type_digits-default`}>
                        <span>{total}</span><CurrencyIcon type="primary" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderInfo;