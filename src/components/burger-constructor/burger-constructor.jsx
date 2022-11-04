import React from 'react';
import {arrayOf} from 'prop-types';
import {ConstructorElement, CurrencyIcon, DragIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerPropTypes } from '../../prop-types/burger-prop-types'
import burgerConstructorStyle from './burger-constructor.module.css';
import * as BurgerConstants from "../../constants/burger-constants";
import OrderDetails from "../order-details/order-details";

BurgerConstructor.propTypes = {
    data: arrayOf(BurgerPropTypes)
}

export default function BurgerConstructor (props)  {

    const [isOpenModal, setIsOpenModal] = React.useState(false);

    const bunData = props.data.filter( (elem) => elem.type === BurgerConstants.INGREDIENTS_BUN);
    const sauceAndMainData = props.data.filter( (elem) => elem.type !== BurgerConstants.INGREDIENTS_BUN);

    return (
        <section className={`${burgerConstructorStyle.burgerConstructor} mt-25`}>
            <div className={"ml-8"}>
                <ConstructorElement
                    type="top"
                    isLocked
                    text={bunData[0].name}
                    price={bunData[0].price}
                    thumbnail={bunData[0].image}
                />
            </div>
            <div className={`${burgerConstructorStyle.sauceAndMainData} mt-1`}>
                <ul>
                    { sauceAndMainData.map (item =>(
                        <li key={item._id} className={`${burgerConstructorStyle.blockItem} p-1`}>
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
                <ConstructorElement
                    type="bottom"
                    isLocked
                    text={bunData[0].name}
                    price={bunData[0].price}
                    thumbnail={bunData[0].image}
                />
            </div>
            <div className={`${burgerConstructorStyle.totalSum} mb-10 pt-10 pr-8`}>
                <p className="text text_type_digits-medium pr-10">610<CurrencyIcon type="primary"/></p>
                <Button type="primary" size="large" htmlType={"button"}
                        onClick={() => {
                            setIsOpenModal(true);
                        }} >
                    Оформить заказ
                </Button>
            </div>
            {isOpenModal &&
               <OrderDetails handlerClose={() => setIsOpenModal(false)} isOpenModal={isOpenModal}/>
            }
        </section>
    )
}
