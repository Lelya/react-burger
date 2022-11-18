import React, {useEffect, useMemo, useRef, useState} from 'react';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerPropTypes } from '../../prop-types/burger-prop-types'
import burgerIngredientsStyle from './burger-ingredients.module.css';
import {arrayOf} from "prop-types";
import * as BurgerConstants from '../../constants/burger-constants';
import { useSelector} from 'react-redux';
import BurgerIngredientBlockType from "../burger-ingredient-block-type/burger-ingredient-block-type";

BurgerIngredients.propTypes = {
    data: arrayOf(BurgerPropTypes)
}

export default function BurgerIngredients ()  {

    const ingredients = useSelector(store => store.listAllIngredients.items);
    const bunData = useMemo(() => ingredients.filter((elem) => elem.type === BurgerConstants.INGREDIENTS_BUN),[ingredients]);
    const sauceData = useMemo(() => ingredients.filter((elem) => elem.type === BurgerConstants.INGREDIENTS_SAUCE),[ingredients]);
    const mainData = useMemo(() => ingredients.filter((elem) => elem.type === BurgerConstants.INGREDIENTS_MAIN),[ingredients]);

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
                <BurgerIngredientBlockType
                    nameBlock={BurgerConstants.INGREDIENTS_BUN_NAME}
                    idBlock={BurgerConstants.INGREDIENTS_BUN}
                    blockRef={bunRef}
                    items={bunData}
                />
                <BurgerIngredientBlockType
                    nameBlock={BurgerConstants.INGREDIENTS_SAUCE_NAME}
                    idBlock={BurgerConstants.INGREDIENTS_SAUCE}
                    blockRef={sauceRef}
                    items={sauceData}
                />
                <BurgerIngredientBlockType
                    nameBlock={BurgerConstants.INGREDIENTS_MAIN_NAME}
                    idBlock={BurgerConstants.INGREDIENTS_MAIN}
                    blockRef={mainRef}
                    items={mainData}
                />
            </div>
        </section>
    )
}