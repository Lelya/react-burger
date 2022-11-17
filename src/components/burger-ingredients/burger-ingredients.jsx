import React, {useEffect, useRef, useState} from 'react';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerPropTypes } from '../../prop-types/burger-prop-types'
import burgerIngredientsStyle from './burger-ingredients.module.css';
import IngredientItem from "../ingredient-item/ingredient-item";
import {arrayOf} from "prop-types";
import * as BurgerConstants from '../../constants/burger-constants';
import { useSelector} from 'react-redux';

BurgerIngredients.propTypes = {
    data: arrayOf(BurgerPropTypes)
}

export default function BurgerIngredients ()  {

    const ingredients = useSelector(store => store.listAllIngredients.items);
    const bunData = ingredients.filter((elem) => elem.type === BurgerConstants.INGREDIENTS_BUN);
    const sauceData = ingredients.filter((elem) => elem.type === BurgerConstants.INGREDIENTS_SAUCE);
    const mainData = ingredients.filter((elem) => elem.type === BurgerConstants.INGREDIENTS_MAIN);

    const [current, setCurrent] = useState(BurgerConstants.INGREDIENTS_BUN);

    const bunRef = useRef();
    const sauceRef = useRef();
    const mainRef = useRef();

    useEffect(() => {
        const options = {
            rootMargin: '-50% 0px',
            threshold: [0, 0.2, 0.5, 1]
        };
        let observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting ) {
                    setCurrent(entry.target.id);
                }
            });
        }, options);

        observer.observe(bunRef.current);
        observer.observe(sauceRef.current);
        observer.observe(mainRef.current);
    }, [mainRef, sauceRef, bunRef]);

    return (
        <section className={`${burgerIngredientsStyle.burgerIngredients} p-10`}>
            <div className="text text_type_main-large">
                <p className="text text_type_main-large">Соберите бургер</p>
            </div>
            <div style={{ display: 'flex' }} className={'pt-5 pb-10'}>
                <Tab value={BurgerConstants.INGREDIENTS_BUN} active={current === BurgerConstants.INGREDIENTS_BUN} onClick={setCurrent}>
                    {BurgerConstants.INGREDIENTS_BUN_NAME}
                </Tab>
                <Tab value={BurgerConstants.INGREDIENTS_SAUCE} active={current === BurgerConstants.INGREDIENTS_SAUCE} onClick={setCurrent}>
                    {BurgerConstants.INGREDIENTS_SAUCE_NAME}
                </Tab>
                <Tab value={BurgerConstants.INGREDIENTS_MAIN} active={current === BurgerConstants.INGREDIENTS_MAIN} onClick={setCurrent}>
                    {BurgerConstants.INGREDIENTS_MAIN_NAME}
                </Tab>
            </div>
            <div className={burgerIngredientsStyle.ingredients}>
                <p className='text text_type_main-medium'>Булки</p>
                <ul ref={bunRef} id={BurgerConstants.INGREDIENTS_BUN} className={burgerIngredientsStyle.ingredientItem}>
                        { bunData.map (item =>(
                            <IngredientItem key={item._id} {...item} />
                        ))}
                </ul>
                <p className='text text_type_main-medium'>Соусы</p>
                <ul ref={sauceRef} id={BurgerConstants.INGREDIENTS_SAUCE} className={burgerIngredientsStyle.ingredientItem}>
                        { sauceData.map (item =>(
                            <IngredientItem key={item._id} {...item} />
                        ))}
                </ul>
                <p className='text text_type_main-medium'>Начинки</p>
                <ul  ref={mainRef} id={BurgerConstants.INGREDIENTS_MAIN} className={burgerIngredientsStyle.ingredientItem}>
                        { mainData.map (item =>(
                            <IngredientItem key={item._id} {...item} />
                        ))}
                </ul>
            </div>
        </section>
    )
}