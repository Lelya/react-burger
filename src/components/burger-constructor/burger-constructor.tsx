import React, {useMemo, useState} from 'react';
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerConstructorStyle from './burger-constructor.module.css';
import * as BurgerConstants from "../../constants/burger-constants";
import OrderDetails from "../order-details/order-details";
import ErrorModal from "../error-modal/error-modal";
import {useDispatch, useSelector} from "react-redux";
import {postOrder} from "../../services/actions/order-actions";
import {useDrop} from 'react-dnd';
import BurgerConstructorItem from "../burger-constructor-item/burger-constructor-item";
import BurgerConstructorEmpty from "../burger-constructor-empty/burger-constructor-empty";
import { v4 as uuidv4 } from 'uuid';
import {useHistory} from "react-router-dom";
import {
    ADD_BUN_INGREDIENT_TO_CONSTRUCTOR,
    ADD_INGREDIENT_TO_CONSTRUCTOR,
    CLEAR_CONSTRUCTOR, CLOSE_ORDER
} from "../../services/actions";
import {TIngredientData} from "../../utils/types";

const BurgerConstructor: React.FC = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    // @ts-ignore
    const ingredients = useSelector(store => store.listAllIngredients.items);
    // @ts-ignore
    const order = useSelector(store => store.orderInfo.orderId);
    // @ts-ignore
    const error = useSelector(store => store.orderInfo.isError);
    // @ts-ignore
    const userLoggedIn = useSelector(store => store.userInfo.userLoggedIn);

    const [isOpenModal, setIsOpenModal] = useState(false);

    // @ts-ignore
    const isLoading  = useSelector(store => store.orderInfo.isLoading);
    // @ts-ignore
    const bunData = useSelector(store => store.listConstructorIngredients.bun);
    // @ts-ignore
    const sauceAndMainData = useSelector(store => store.listConstructorIngredients.items);

    const totalPrice = useMemo(() => {
            if (bunData.length ) {
                return sauceAndMainData.reduce((l: number, el: TIngredientData) => el.price + l, bunData[0].price * 2);
            }
        },
        [bunData, sauceAndMainData]
    );

    const moveIngredient = (item: any) => {
        const uniqId = {uniqId: uuidv4()};
        let ingredient = ingredients.filter((elem: TIngredientData) => elem._id === item.id)[0];
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
        if (userLoggedIn) {
            let ingredientIds = [];
            ingredientIds.push(bunData[0]._id);
            ingredientIds = ingredientIds.concat(sauceAndMainData.map((item: { _id: string; }) => item._id));
            ingredientIds.push(bunData[0]._id);
            // @ts-ignore
            dispatch(postOrder(ingredientIds));
            setIsOpenModal(true);
        } else {
            history.replace('/login');
        }

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
                            text={bunData[0].name + " (????????)"}
                            price={bunData[0].price}
                            thumbnail={bunData[0].image}
                        />
                    }
                </div>
                <div className={`${burgerConstructorStyle.sauceAndMainData} mt-1`}>
                    { sauceAndMainData.length > 0 &&
                        <ul>
                            { sauceAndMainData.map((item: TIngredientData, index: number) => (
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
                            text={bunData[0].name + " (??????)"}
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
                            ???????????????? ??????????
                        </Button>
                    </div>
                }
                { isLoading &&
                    <div className={`${burgerConstructorStyle.totalSum} mb-10 pt-10 pr-8`}>
                        <h3 className="text text_type_main-default"> ??????????????????, ???????? ???????????????????? ???????????? </h3>
                    </div>
                }
                { isOpenModal && !error && order !== 0 ? (
                    <OrderDetails
                        handlerClose={() => {
                            dispatch({
                                type: CLOSE_ORDER,
                            });
                            setIsOpenModal(false);
                            dispatch({
                                type: CLEAR_CONSTRUCTOR
                            });
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
                        error="???????????????? ?????? ???????????????????? ????????????" isOpenModal={isOpenModal}/>
                )}
            </>
        )}
        </section>
    )
}

export default BurgerConstructor;