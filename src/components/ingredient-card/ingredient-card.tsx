import React from 'react'
import { useParams } from 'react-router-dom';
import IngredientInfo from '../ingredient-info/ingredient-info';
import styles from '../../pages/pages.module.css';
import {TIngredientData} from "../../utils/types";
import {useSelectorTS} from "../../utils/types";

export interface ICardIngredient {
    background?: boolean;
}

const IngredientCard: React.FC<ICardIngredient> = ({background }) => {
    // @ts-ignore
    const {id} = useParams();
    const ingredients = useSelectorTS(store => store.listAllIngredients.items);

    const ingredientInfo = ingredients.find((elem: TIngredientData) => elem._id === id);

    return (
        <div className={background ?  styles.ingredient_wrapper_modal : styles.ingredient_wrapper}>
            { ingredientInfo &&
                <IngredientInfo ingredient={ingredientInfo}
                />
            }
        </div>
    )
}

export default IngredientCard;