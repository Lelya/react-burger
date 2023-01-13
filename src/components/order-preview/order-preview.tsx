import React, {useMemo, useState} from 'react';
import stylesPreview from "./order-preview.module.css";
import {
    statusList,
    THistoryFrom,
    TIngredientData,
    TOrder,
    useDispatch,
    useSelectorTS
} from "../../utils/types";
import {Link, useLocation} from "react-router-dom";
import {closeCurrentItemAction} from "../../services/actions/ingredient-actions";
import {IngredientPreview} from "../ingredient-preview/ingredient-preview";
import { FormattedDate, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "../../pages/pages.module.css";
import Modal from "../modal/modal";
import OrderInfo from "../order-info/order-info";

interface IOrderPreviewItem {
    order: TOrder,
    visibleStatus: boolean,
    url: string
}

const OrderPreview: React.FC<IOrderPreviewItem> = ({order, visibleStatus, url}) => {

    const dispatch = useDispatch();
    const location = useLocation<THistoryFrom>();

    const [isOpenModal, setIsOpenModal] = useState(false);

    const handlerCloseModal = (): void => {
        dispatch(closeCurrentItemAction());
        setIsOpenModal(false)
    };

    const ingredients = useSelectorTS(store => store.listAllIngredients.items);

    const orderIngredients = useMemo(() => {
        return order.ingredients?.map(id => {
            return ingredients.find(ingredient => ingredient._id === id);
        }) ?? [] as Array<TIngredientData>;
    }, [ingredients, order.ingredients]);

    const total = useMemo(() => orderIngredients.map(ingredient => ingredient?.price ?? 0).reduce((a, b) => a + b), [orderIngredients]);
    const otherIngredients = useMemo(() => orderIngredients.splice(6).reverse(), [orderIngredients]);
    const status = useMemo(() => order.status ? statusList.get(order.status) : 'не определен', [order])

    return (
        <>
            <Link
                to={{
                    pathname: `${url}/${order._id}`,
                    state: { background: location },
                }}
                className={stylesPreview.link}
            >
                <li className={`${styles.orderContainer} mb-8 p-6`} key={order._id}
                >
                    <div className={`${styles.headerLine}`}>
                        <div className="text text_type_digits-default">#{order.number}</div>
                        <div className="text text_type_main-default text_color_inactive">
                            <FormattedDate date={new Date(order.updatedAt)} />
                        </div>
                    </div>

                    <div className={styles.orderName}>{order.name}</div>
                    { visibleStatus &&
                        <div className={`${styles.textStatus} text text text_type_main-small pb-10`}>{status}</div>
                    }
                    <div className={styles.headerLine}>
                        <div className={stylesPreview.orderIngredients}>
                            {orderIngredients?.map((ingredient, index) => {
                                return (
                                    ingredient &&
                                    <div className={stylesPreview.ingredientBox} style={{zIndex: (6 - index)}} key={ingredient._id + index}>
                                        <IngredientPreview ingredient={ingredient}
                                                           counter={index === orderIngredients.length - 1 ? otherIngredients.length : 0}/>
                                    </div>
                                )
                            })}
                        </div>
                        <div className={`${styles.price} mb-4 text text_type_digits-default`}>
                            <span>{total}</span><CurrencyIcon type="primary" />
                        </div>
                    </div>
                </li>
            </Link>
            {isOpenModal &&
                <Modal
                    handlerClose={handlerCloseModal}
                    isOpen={isOpenModal}>
                    <OrderInfo order={order} />
                </Modal>
            }
        </>
    )
}

export default OrderPreview;