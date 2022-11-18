import React from "react";
import burgerIngredientsBlockTypeStyle from './burger-ingredient-block-type.module.css';
import IngredientItem from "../ingredient-item/ingredient-item";

export default function BurgerIngredientBlockType ({nameBlock, idBlock, blockRef, items})  {

    return (
        <>
            <p className='text text_type_main-medium'>{nameBlock}</p>
            <ul ref={blockRef} id={idBlock} className={burgerIngredientsBlockTypeStyle.ingredientItem}>
                { items.map (item =>(
                    <IngredientItem key={item._id} ingredient={item} />
                ))}
            </ul>
        </>
    )
}