import React, {useMemo, useState} from 'react';
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyle from './burger-constructor.module.css';
import * as BurgerConstants from "../../constants/burger-constants";
import OrderDetails from "../order-details/order-details";
import ErrorModal from "../error-modal/error-modal";
import {useDispatch, useSelectorTS} from "../../utils/types";
import {closeOrderAction, postOrderThunk} from "../../services/actions/order-actions";
import {useDrop} from 'react-dnd';
import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item";
import BurgerConstructorEmpty from "../burger-constructor-empty/burger-constructor-empty";
import { v4 as uuidv4 } from 'uuid';
import {useHistory} from "react-router-dom";
import {
    addBunToConstructorItemAction,
    addIngredientToConstructorItemAction, clearConstructorItemAction, deleteIngredientToConstructorItemAction
} from "../../services/actions/ingredient-actions";
import styles from "../../pages/pages.module.css";

const BurgerConstructor: React.FC = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const ingredients = useSelectorTS(store => store.listAllIngredients.items);
    const order = useSelectorTS(store => store.orderInfo.orderId);
    const error = useSelectorTS(store => store.orderInfo.isError);
    const userLoggedIn = useSelectorTS(store => store.userInfo.userLoggedIn);

    const [isOpenModal, setIsOpenModal] = useState(false);

    const isLoading  = useSelectorTS(store => store.orderInfo.isLoading);
    const bunData = useSelectorTS(store => store.listConstructorIngredients.bun);
    const sauceAndMainData = useSelectorTS(store => store.listConstructorIngredients.items);

    const totalPrice = useMemo(() => {
            if (bunData.length > 0 && bunData[0]) {
                return sauceAndMainData.reduce((l, el) => el.price + l, bunData[0].price * 2);
            }
        },
        [bunData, sauceAndMainData]
    );

    const moveIngredient = (item: any) => {
        const uniqId = {uniqId: uuidv4()};
        let ingredient = ingredients.filter(elem => elem._id === item.id)[0];
        ingredient = Object.assign(uniqId, ingredient);

        if (ingredient.type === BurgerConstants.INGREDIENTS_BUN) {
            dispatch(addBunToConstructorItemAction(ingredient));
        } else {
            dispatch(addIngredientToConstructorItemAction(ingredient));
        }

    }

    const [, dropTarget] = useDrop({
        accept: 'ingredient',
        collect: monitor => ({
            isHover: monitor.isOver()
        }),
        drop(item) {
            moveIngredient(item);
        },
    })

    const setOrder = () => {
        if (userLoggedIn) {
            let ingredientIds: Array<string> = [];
            ingredientIds.push(bunData[0]._id);
            ingredientIds = ingredientIds.concat(sauceAndMainData.map(item => item._id));
            ingredientIds.push(bunData[0]._id);
            dispatch(postOrderThunk(ingredientIds));
            setIsOpenModal(true);
        } else {
            history.replace('/login');
        }

     };

    return (
        <section className={`${burgerConstructorStyle.burgerConstructor} mt-25`} ref={dropTarget} data-test="drop-place">
        { bunData.length === 0 && sauceAndMainData.length === 0 ? (
           <BurgerConstructorEmpty/>
        ) : (
            <>
                <div className={"ml-8"}>
                    { bunData.length > 0 &&
                        <ConstructorElement
                            type="top"
                            isLocked
                            text={bunData[0].name + " (верх)"}
                            price={bunData[0].price}
                            thumbnail={bunData[0].image}
                        />
                    }
                </div>
                <div className={`${burgerConstructorStyle.sauceAndMainData} mt-1`}>
                    { sauceAndMainData.length > 0 &&
                        <ul>
                            { sauceAndMainData.map((item, index: number) => (
                                <BurgerConstructorItem key={item.uniqId} ingredient={item} index={index}/>
                            ))}
                        </ul>
                    }
                </div>
                <div className={"ml-8 pt-1"}>
                    { bunData.length > 0 &&
                        <ConstructorElement
                            type="bottom"
                            isLocked
                            text={bunData[0].name + " (низ)"}
                            price={bunData[0].price}
                            thumbnail={bunData[0].image}
                        />
                    }
                </div>
                { bunData.length > 0 && sauceAndMainData.length > 0 && !isLoading &&
                    <div className={`${burgerConstructorStyle.totalSum} mb-10 pt-10 pr-8`}>
                        <p className="text text_type_main-default pr-10">{totalPrice}<CurrencyIcon type="primary"/></p>
                        <Button type="primary" size="large" htmlType={"button"}
                                onClick={setOrder}>
                            Оформить заказ
                        </Button>
                    </div>
                }
                { isLoading &&
                    <div className={`${burgerConstructorStyle.totalSum} mb-10 pt-10 pr-8`}>
                        <h3 className="text text_type_main-default"> Подождите, идет оформление заказа </h3>
                    </div>
                }
                { isOpenModal && !error && order !== 0 ? (
                    <OrderDetails
                        handlerClose={() => {
                            dispatch(closeOrderAction());
                            setIsOpenModal(false);
                            dispatch(clearConstructorItemAction());
                        }}
                        isOpenModal={isOpenModal}/>
                ) : (
                    <ErrorModal
                        handlerClose={() => {
                            dispatch(closeOrderAction());
                            setIsOpenModal(false);
                        }}
                        error="Проблемы при оформлении заказа" isOpenModal={isOpenModal}/>
                )}
            </>
        )}
        </section>
    )
}

export default BurgerConstructor;