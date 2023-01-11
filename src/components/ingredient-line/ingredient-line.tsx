import {TIngredientData} from "../../utils/types";
import styles from "./ingredient-line.module.css";
import stylesPage from "../../pages/pages.module.css";
import React, {FC} from "react";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

type IngredientLineProps = {
    ingredient: TIngredientData;
    count: number;
}

export const IngredientLine: FC<IngredientLineProps> = ({ingredient, count}) => {
    return (
        <div className={`${styles.ingredientLineWrapper} pb-4`}>

            <div className={styles.ingredientLineImageBorder}>
                <div className={styles.ingredientLineImageContainer}>
                    <img src={ingredient.image} alt={ingredient.name}
                         className={styles.ingredientImage}/>
                </div>
            </div>
            <div className={`${styles.ingredientName} text text_type_main-default`}>
                {ingredient.name}
            </div>
            <div className={`${stylesPage.price} text text_type_digits-default`}>
                <span>{count}&nbsp;x</span>
                <div className={`${stylesPage.price} text text_type_digits-default`}>
                    <span>{ingredient.price}</span><CurrencyIcon type="primary" />
                </div>
            </div>

        </div>
    )
}