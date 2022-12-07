import React from 'react'
import { useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';
import IngredientInfo from '../ingredient-info/ingredient-info';
import styles from '../pages.module.css';

export default function IngredientCard({background}) {
    const {id} = useParams();
    const ingredients = useSelector(store => store.listAllIngredients.items);

    const ingredient = ingredients.find(elem => elem._id === id);
    
    return (
        <div className={background ?  styles.ingredient_wrapper_modal : styles.ingredient_wrapper}>
        { ingredient &&
            <IngredientInfo ingredient={ingredient} />
        }
    </div>
            
    )
}