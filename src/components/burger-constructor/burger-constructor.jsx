import React from 'react';
import {ConstructorElement, CurrencyIcon, DragIcon, Button} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyle from './burger-constructor.module.css';

export default function BurgerConstructor (props)  {

    const [bunData] = React.useState(props.data.filter( (elem) => elem.type === "bun"));
    const [sauceAndMainData] = React.useState(props.data.filter( (elem) => elem.type !== "bun"));

    return (
        <section className={`${burgerConstructorStyle.burgerConstructor} mt-25`}>
            <div className={"ml-8"}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
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
                    isLocked={true}
                    text={bunData[0].name}
                    price={bunData[0].price}
                    thumbnail={bunData[0].image}
                />
            </div>
            <div className={`${burgerConstructorStyle.totalSum} mb-10 pt-10 pr-8`}>
                <p className="text text_type_digits-medium pr-10">610<CurrencyIcon type="primary"/></p>
                <Button type="primary" size="large"  htmlType={"button"}>
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}