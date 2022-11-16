import React, { useState, useEffect, useCallback } from 'react';
import {arrayOf} from 'prop-types';
import { ConstructorElement, CurrencyIcon, DragIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerPropTypes } from '../../prop-types/burger-prop-types'
import burgerConstructorStyle from './burger-constructor.module.css';
import * as BurgerConstants from "../../constants/burger-constants";
import OrderDetails from "../order-details/order-details";
import ErrorModal from "../error-modal/error-modal";
import {useDispatch, useSelector} from "react-redux";
import { CLOSE_ORDER, postOrder} from "../../services/actions";

BurgerConstructor.propTypes = {
    data: arrayOf(BurgerPropTypes)
}

export default function BurgerConstructor ()  {

    const dispatch = useDispatch();
    const ingredients = useSelector(store => store.listAllIngredients.items);
    const order = useSelector(store => store.orderInfo.orderId);
    const error = useSelector(store => store.orderInfo.isError);

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [randomIngredients, setRandomIngredients] = useState([]);

    const bunData = ingredients.filter( (elem) => elem.type === BurgerConstants.INGREDIENTS_BUN);
    const sauceAndMainData = randomIngredients.filter( (elem) => elem.type !== BurgerConstants.INGREDIENTS_BUN);

    const createRandomIngredients = useCallback(
() => {
            const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));
            if (ingredients.length ) {
                while (randomIngredients.length !== 7) {
                    let index = getRandomInt(ingredients.length);
                    randomIngredients.push(ingredients[index]);
                    setRandomIngredients(randomIngredients.filter((v, i, arr) => arr.indexOf(v) === i));
                }
            }
        },[ingredients, randomIngredients]
    );

    useEffect(() => {
        createRandomIngredients();
    }, [createRandomIngredients])

    useEffect(() => {
        if (bunData.length ) {
            let sumOfPrices = bunData[0].price * 2;
            randomIngredients.forEach((item) => {
                sumOfPrices += item.price;
            });
            setTotalPrice(sumOfPrices);
        }
    }, [bunData, setTotalPrice, randomIngredients])

    const setOrder = () => {
        let ingredientIds = [];
        ingredientIds.push(bunData[0]._id);
        ingredientIds = ingredientIds.concat(randomIngredients.map(item => item._id));
        ingredientIds.push(bunData[0]._id);
        dispatch(postOrder(ingredientIds));
        setIsOpenModal(true);
     };

    return (
        <section className={`${burgerConstructorStyle.burgerConstructor} mt-25`}>
            <div className={"ml-8"}>
                {bunData.length > 0 &&
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
                <ul>
                    { sauceAndMainData.map (item =>(
                        <li key={item._id + Math.random()} className={`${burgerConstructorStyle.blockItem} p-1`}>
                            <span className={"mr-1"}><DragIcon type="primary"/></span>
                            <ConstructorElement
                                text={item.name}
                                price={item.price}
                                thumbnail={item.image}
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <div className={"ml-8 pt-1"}>
                {bunData.length > 0 &&
                    <ConstructorElement
                        type="bottom"
                        isLocked
                        text={bunData[0].name + " (низ)"}
                        price={bunData[0].price}
                        thumbnail={bunData[0].image}
                    />
                }
            </div>
            <div className={`${burgerConstructorStyle.totalSum} mb-10 pt-10 pr-8`}>
                <p className="text text_type_digits-medium pr-10">{ totalPrice }<CurrencyIcon type="primary"/></p>
                <Button type="primary" size="large" htmlType={"button"}
                        onClick={setOrder} >
                    Оформить заказ
                </Button>
            </div>
            {isOpenModal && !error && order !== 0 ? (
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
                    error={error} isOpenModal={isOpenModal}/>
            )}
        </section>
    )
}
