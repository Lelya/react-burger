import React, {useEffect, useState} from 'react';
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientItemStyle from './ingredient-item.module.css';
import styles from "../../pages/pages.module.css";
import {useDispatch, useSelectorTS} from "../../utils/types";
import {useDrag} from "react-dnd";
import {INGREDIENTS_BUN} from "../../constants/burger-constants";
import {Link, useLocation} from "react-router-dom";
import IngredientInfo from "../ingredient-info/ingredient-info";
import Modal from "../modal/modal";
import {THistoryFrom, TIngredientData} from "../../utils/types";
import {closeCurrentItemAction} from "../../services/actions/ingredient-actions";

interface IPropsIngredientItem {
    ingredient: TIngredientData
}

const IngredientItem: React.FC<IPropsIngredientItem> = ({ingredient}) => {

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [counter, setCounter] = useState(0);

    const dispatch = useDispatch();
    const bunData = useSelectorTS(store => store.listConstructorIngredients.bun);
    const sauceAndMainData = useSelectorTS(store => store.listConstructorIngredients.items);
    const location = useLocation<THistoryFrom>();

    const id = ingredient._id;

    const [{ isDrag }, dragRef] = useDrag({
        type: 'ingredient',
        item: { id },
        collect: monitor => ({
            isDrag: monitor.isDragging() ? 0.5 : 1,
        })
    })

    const calculateCounter = (item: TIngredientData) => {
        if (item.type === INGREDIENTS_BUN) {
            setCounter(bunData.filter((elem: TIngredientData) => elem._id === item._id).length * 2);
        } else {
            const countItems = sauceAndMainData.filter((elem: TIngredientData) => elem._id === item._id).length;
            setCounter(countItems);
        }
    };

    useEffect(() => {
        calculateCounter(ingredient);
    }, );

    const handlerCloseModal = (): void => {
        dispatch(closeCurrentItemAction());
        setIsOpenModal(false)
    };

    return (
        <>
            {isDrag && (
                <Link
                    to={{
                        pathname: `/ingredients/${ingredient._id}`,
                        state: { background: location },
                    }}
                    className={ingredientItemStyle.link}
                >
                    <li className={`${ingredientItemStyle.wrapper} mb-8`} key={ingredient._id}
                        ref={dragRef}
                        data-test={ingredient.name}
                    >
                        { counter > 0 &&
                            <div className={ingredientItemStyle.counter}>
                                <Counter count={counter} size="default"/>
                            </div>
                        }
                        <img className={`mb-4`} src={ingredient.image}  alt={ingredient.image}/>
                        <p className={`${styles.price} mb-4 text text_type_digits-default`}><span>{ingredient.price}</span> <CurrencyIcon type="primary" /></p>
                        <p className={`text text_type_main-default`}>{ingredient.name}</p>
                    </li>
                </Link>
            )}
            {isOpenModal &&
                <Modal
                    handlerClose={handlerCloseModal}
                    isOpen={isOpenModal}>
                    <IngredientInfo ingredient={ingredient} />
                </Modal>
            }
        </>
    )
}

export default IngredientItem;