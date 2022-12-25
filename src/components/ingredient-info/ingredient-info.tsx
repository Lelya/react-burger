import React from 'react';

import styles from "../../pages/pages.module.css";
import stylesInfo from "./ingredient-info.module.css";
import {TIngredientData} from "../../utils/types";

export interface TIngredientInfo {
    ingredient: TIngredientData;
}

const IngredientInfo: React.FC<TIngredientInfo> = ({ingredient}) => {
    return (
        <>
            <p className={`${styles.text_center} text text_type_main-large pt-15 pr-10 pl-10`} >Детали ингредиента</p>
            <span className={stylesInfo.imgModal}>
                <img src={ingredient.image_large} alt={ingredient.name} className="pt-15"/>
            </span>
            <p className="text text_type_main-medium pt-4">
                {ingredient.name}
            </p>
            <div className="pt-8 pb-15 pl-5 pr-5">
                <ul className={stylesInfo.wrapperDescription}>
                    <li>
                        <p className="text text_type_main-default text_color_inactive">Каллории, ккал</p>
                        <p className="text text_type_main-default text_color_inactive">{ingredient.calories}</p>
                    </li>
                    <li>
                        <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                        <p className="text text_type_main-default text_color_inactive">{ingredient.proteins}</p>
                    </li>
                    <li>
                        <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                        <p className="text text_type_main-default text_color_inactive">{ingredient.fat}</p>
                    </li>
                    <li>
                        <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                        <p className="text text_type_main-default text_color_inactive">{ingredient.carbohydrates}</p>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default IngredientInfo;