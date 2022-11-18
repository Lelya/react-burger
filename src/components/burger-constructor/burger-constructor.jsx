import React, {useMemo, useState} from 'react';
import {arrayOf} from 'prop-types';
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerPropTypes } from '../../prop-types/burger-prop-types'
import burgerConstructorStyle from './burger-constructor.module.css';
import * as BurgerConstants from "../../constants/burger-constants";
import OrderDetails from "../order-details/order-details";
import ErrorModal from "../error-modal/error-modal";
import {useDispatch, useSelector} from "react-redux";
import {
    ADD_BUN_INGREDIENT_TO_CONSTRUCTOR,
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    CLOSE_ORDER,
    postOrder
} from "../../services/actions";
import {useDrop} from 'react-dnd';
import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item";
import BurgerConstructorEmpty from "../burger-constructor-empty/burger-constructor-empty";
import { v4 as uuidv4 } from 'uuid';

BurgerConstructor.propTypes = {
    data: arrayOf(BurgerPropTypes)
}

export default function BurgerConstructor ()  {

    const dispatch = useDispatch();
    const ingredients = useSelector(store => store.listAllIngredients.items);
    const order = useSelector(store => store.orderInfo.orderId);
    const error = useSelector(store => store.orderInfo.isError);

    const [isOpenModal, setIsOpenModal] = useState(false);

    const bunData = useSelector(store => store.listConstructorIngredients.bun);
    const sauceAndMainData = useSelector(store => store.listConstructorIngredients.items);

    const totalPrice = useMemo(() => {
            if (bunData.length ) {
                return sauceAndMainData.reduce((l, el) => el.price + l, bunData[0].price * 2);
            }
        },
        [bunData, sauceAndMainData]
    );

    const moveIngredient = (item) => {
        const uniqId = {uniqId: uuidv4()};
        let ingredient = ingredients.filter((elem) => elem._id === item.id)[0];
        ingredient = Object.assign(uniqId, ingredient);

        if (ingredient.type === BurgerConstants.INGREDIENTS_BUN) {
            dispatch({
                type: ADD_BUN_INGREDIENT_TO_CONSTRUCTOR,
                bun: ingredient
            });
        } else {
            dispatch({
                type: ADD_INGREDIENT_TO_CONSTRUCTOR,
                item: ingredient
            });
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
        let ingredientIds = [];
        ingredientIds.push(bunData[0]._id);
        ingredientIds = ingredientIds.concat(sauceAndMainData.map(item => item._id));
        ingredientIds.push(bunData[0]._id);
        dispatch(postOrder(ingredientIds));
        setIsOpenModal(true);
     };

    return (
        <section className={`${burgerConstructorStyle.burgerConstructor} mt-25`} ref={dropTarget}>
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
                            { sauceAndMainData.map((item, index) => (
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
                { bunData.length > 0 && sauceAndMainData.length > 0 &&
                    <div className={`${burgerConstructorStyle.totalSum} mb-10 pt-10 pr-8`}>
                        <p className="text text_type_digits-medium pr-10">{totalPrice}<CurrencyIcon type="primary"/></p>
                        <Button type="primary" size="large" htmlType={"button"}
                                onClick={setOrder}>
                            Оформить заказ
                        </Button>
                    </div>
                }
                { isOpenModal && !error && order !== 0 ? (
                    <OrderDetails
                        handlerClose={() => {
                            dispatch({
                                type: CLOSE_ORDER,
                            });
                            setIsOpenModal(false);
                        }}
                        isOpenModal={isOpenModal}/>
                ) : (
                    <ErrorModal
                        handlerClose={() => {
                            dispatch({
                                type: CLOSE_ORDER,
                            });
                            setIsOpenModal(false);
                        }}
                        error="Проблемы при оформлении заказа" isOpenModal={isOpenModal}/>
                )}
            </>
        )}
        </section>
    )
}
