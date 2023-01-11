import {TIngredientData} from "../../utils/types";
import styles from "./ingredient-preview.module.css";
import {FC} from "react";

type IngredientPreviewProps = {
    ingredient: TIngredientData;
    counter: number;
}

export const IngredientPreview: FC<IngredientPreviewProps> = ({ingredient, counter = 0}) => {
    return (
        <div className={styles.ingredientImageBorder}>
            <div className={styles.ingredientImageContainer}>
                <img src={ingredient.image} alt={ingredient.name}
                     className={counter ? styles.ingredientImageLast : styles.ingredientImage}/>
                {counter > 0 &&
                    <div className={styles.ingredientCounter}>+{counter}</div>
                }
            </div>
        </div>
    )
}