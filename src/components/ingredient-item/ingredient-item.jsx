import React from 'react';
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientItemStyle from './ingredient-item.module.css';

export default function IngredientItem (props)  {

    const [item] = React.useState(props);

    return (
        <li className={`${ingredientItemStyle.wrapper} mb-8`} key={item._id} >
            <div className={ingredientItemStyle.counter}><Counter count={1} size="default"/></div>
            <img className={`mb-4`} src={item.image}  alt={item.image}/>
            <p className={`${ingredientItemStyle.price} mb-4 text text_type_digits-default`}><span>{item.price}</span> <CurrencyIcon type="primary" /></p>
            <p className={`text text_type_main-default`}>{item.name}</p>
        </li>
    )
}