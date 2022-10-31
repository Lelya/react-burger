import React from 'react';
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyle from './burger-ingredients.module.css';
import IngredientItem from "../ingredient-item/ingredient-item";

export default function BurgerIngredients (props)  {

    const [current, setCurrent] = React.useState('bun')
    const [bunData] = React.useState(props.data.filter( (elem) => elem.type === "bun"));
    const [saucenData] = React.useState(props.data.filter( (elem) => elem.type === "sauce"));
    const [mainData] = React.useState(props.data.filter( (elem) => elem.type === "main"));

    return (
        <section className={`${burgerIngredientsStyle.burgerIngredients} p-10`}>
            <div className="text text_type_main-large">
                <p className="text text_type_main-large">Соберите бургер</p>
            </div>
            <div style={{ display: 'flex' }} className={'pt-5 pb-10'}>
                <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={setCurrent}>
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
                        { saucenData.map (item =>(
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