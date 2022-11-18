import React, {useEffect, useState} from 'react';
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientItemStyle from './ingredient-item.module.css';
import {useDispatch, useSelector} from 'react-redux';
import IngredientDetails from "../ingredient-details/ingredient-details";
import {OPEN_CURRENT_ITEM_DETAILS, CLOSE_CURRENT_ITEM_DETAILS} from "../../services/actions";
import {useDrag} from "react-dnd";
import {INGREDIENTS_BUN} from "../../constants/burger-constants";
import {BurgerPropTypes} from "../../prop-types/burger-prop-types";

IngredientItem.propTypes = {
    ingredient: BurgerPropTypes
};

export default function IngredientItem ({ingredient})  {

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [counter, setCounter] = useState(0);

    const dispatch = useDispatch();
    const bunData = useSelector(store => store.listConstructorIngredients.bun);
    const sauceAndMainData = useSelector(store => store.listConstructorIngredients.items);

    const id = ingredient._id;

    const [{ isDrag }, dragRef] = useDrag({
        type: 'ingredient',
        item: { id },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        }),
    });

    const calculateCounter = (item) => {
        if (item.type === INGREDIENTS_BUN) {
            setCounter(bunData.filter((elem) => elem._id === item._id).length * 2);
        } else {
            const countItems = sauceAndMainData.filter((elem) => elem._id === item._id).length;
            if (countItems > 0) {
                setCounter(countItems);
            }
        }
    };

    useEffect(() => {
        calculateCounter(ingredient);
    }, );

    return (
        <>
            {!isDrag && (
                <li className={`${ingredientItemStyle.wrapper} mb-8`} key={ingredient._id}
                    onClick={() => {
                        dispatch({
                            type: OPEN_CURRENT_ITEM_DETAILS,
                            item: ingredient,
                        });
                        setIsOpenModal(true);
                    }}
                    ref={dragRef}
                >
                    { counter > 0 &&
                        <div className={ingredientItemStyle.counter}>
                            <Counter count={counter} size="default"/>
                        </div>
                    }
                    <img className={`mb-4`} src={ingredient.image}  alt={ingredient.image}/>
                    <p className={`${ingredientItemStyle.price} mb-4 text text_type_digits-default`}><span>{ingredient.price}</span> <CurrencyIcon type="primary" /></p>
                    <p className={`text text_type_main-default`}>{ingredient.name}</p>
                </li>
            )}
            {isOpenModal &&
                <IngredientDetails
                    handlerClose={() => {
                        dispatch({
                            type: CLOSE_CURRENT_ITEM_DETAILS,
                        });
                        setIsOpenModal(false)
                    }}
                    isOpenModal={isOpenModal} />
            }
        </>
    )
}