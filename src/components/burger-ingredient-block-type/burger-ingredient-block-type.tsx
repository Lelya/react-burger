import React from "react";
import burgerIngredientsBlockTypeStyle from './burger-ingredient-block-type.module.css';
import IngredientItem from "../ingredient-item/ingredient-item";
import {TIngredientData} from "../../utils/types";

interface IPropsBurgerIngredientBlockType {
    nameBlock: string;
    idBlock: string,
    blockRef: React.RefObject<HTMLUListElement>,
    items: Array<TIngredientData>,
}

const BurgerIngredientBlockType: React.FC<IPropsBurgerIngredientBlockType> = ({nameBlock, idBlock, blockRef, items}) => {

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

export default BurgerIngredientBlockType