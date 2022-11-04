import React from 'react';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerPropTypes } from '../../prop-types/burger-prop-types'
import burgerIngredientsStyle from './burger-ingredients.module.css';
import IngredientItem from "../ingredient-item/ingredient-item";
import {arrayOf} from "prop-types";
import * as BurgerConstants from '../../constants/burger-constants';

BurgerIngredients.propTypes = {
    data: arrayOf(BurgerPropTypes)
}

export default function BurgerIngredients (props)  {

    const [current, setCurrent] = React.useState(BurgerConstants.INGREDIENTS_BUN);

    const bunData = props.data.filter( (elem) => elem.type === BurgerConstants.INGREDIENTS_BUN);
    const sauceData = props.data.filter( (elem) => elem.type === BurgerConstants.INGREDIENTS_SAUCE);
    const mainData = props.data.filter( (elem) => elem.type === BurgerConstants.INGREDIENTS_MAIN);

    return (
        <section className={`${burgerIngredientsStyle.burgerIngredients} p-10`}>
            <div className="text text_type_main-large">
                <p className="text text_type_main-large">Соберите бургер</p>
            </div>
            <div style={{ display: 'flex' }} className={'pt-5 pb-10'}>
                <Tab value={BurgerConstants.INGREDIENTS_BUN} active={current === BurgerConstants.INGREDIENTS_BUN} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value={BurgerConstants.INGREDIENTS_SAUCE} active={current === BurgerConstants.INGREDIENTS_SAUCE} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value={BurgerConstants.INGREDIENTS_MAIN} active={current === BurgerConstants.INGREDIENTS_MAIN} onClick={setCurrent}>
                    Начинки
                </Tab>
            </div>
            <div className={burgerIngredientsStyle.ingredients}>
                <p className='text text_type_main-medium'>Булки</p>
                <ul className={burgerIngredientsStyle.ingredientItem}>
                        { bunData.map (item =>(
                            <IngredientItem key={item._id} {...item} />
                        ))}
                </ul>
                <p className='text text_type_main-medium'>Соусы</p>
                <ul className={burgerIngredientsStyle.ingredientItem}>
                        { sauceData.map (item =>(
                            <IngredientItem key={item._id} {...item} />
                        ))}
                </ul>
                <p className='text text_type_main-medium'>Начинки</p>
                <ul className={burgerIngredientsStyle.ingredientItem}>
                        { mainData.map (item =>(
                            <IngredientItem key={item._id} {...item} />
                        ))}
                </ul>
            </div>
        </section>
    )
}