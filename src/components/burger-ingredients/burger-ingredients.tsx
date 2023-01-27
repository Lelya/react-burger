import React, {useEffect, useMemo, useRef, useState} from 'react';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyle from './burger-ingredients.module.css';
import * as BurgerConstants from '../../constants/burger-constants';
import BurgerIngredientBlockType from "../burger-ingredient-block-type/burger-ingredient-block-type";
import {TIngredientData, useSelectorTS} from "../../utils/types";

export default function BurgerIngredients ()  {

    const ingredients = useSelectorTS(store => store.listAllIngredients.items);
    const bunData = useMemo(() => ingredients.filter((elem: TIngredientData) => elem.type === BurgerConstants.INGREDIENTS_BUN),[ingredients]);
    const sauceData = useMemo(() => ingredients.filter((elem: TIngredientData) => elem.type === BurgerConstants.INGREDIENTS_SAUCE),[ingredients]);
    const mainData = useMemo(() => ingredients.filter((elem: TIngredientData) => elem.type === BurgerConstants.INGREDIENTS_MAIN),[ingredients]);

    const [current, setCurrent] = useState(BurgerConstants.INGREDIENTS_BUN);

    const bunRef =  useRef<HTMLUListElement>(null);
    const sauceRef = useRef<HTMLUListElement>(null);
    const mainRef = useRef<HTMLUListElement>(null);

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
        if (bunRef.current) observer.observe(bunRef?.current);
        if (sauceRef.current) observer.observe(sauceRef?.current);
        if (mainRef.current) observer.observe(mainRef?.current);
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