import React from 'react';
import Modal from "../modal/modal";
import ingredientDetailStyle from './ingredient-details.module.css';
import IngredientItem from "../ingredient-item/ingredient-item";
import PropTypes from "prop-types";
import { useSelector } from 'react-redux';

IngredientItem.propTypes = {
    handlerClose: PropTypes.func.isRequired,
    isOpenModal: PropTypes.bool.isRequired,
    data: PropTypes.object
};

export default function IngredientDetails (props)  {

    const currentItem = useSelector(store => store.ingredientItem.currentItem);

    return (
        <Modal handleClose={props.handlerClose} isOpen={props.isOpenModal}>
            <p className="text text_type_main-large pt-15 pr-10 pl-10" style={{textAlign:"left"}}>Детали ингредиента</p>
            <span className={ingredientDetailStyle.imgModal}>
                <img src={currentItem.image_large} alt={currentItem.name} className="pt-15"/>
            </span>
            <p className="text text_type_main-medium pt-4">
                {currentItem.name}
            </p>
            <div className="pt-8 pb-15 pl-5 pr-5">
                <ul className={ingredientDetailStyle.wrapperDescription}>
                    <li>
                        <p className="text text_type_main-default text_color_inactive">Каллории, ккал</p>
                        <p className="text text_type_main-default text_color_inactive">{currentItem.calories}</p>
                    </li>
                    <li>
                        <p className="text text_type_main-default text_color_inactive">Белки, г</p>
                        <p className="text text_type_main-default text_color_inactive">{currentItem.proteins}</p>
                    </li>
                    <li>
                        <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
                        <p className="text text_type_main-default text_color_inactive">{currentItem.fat}</p>
                    </li>
                    <li>
                        <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
                        <p className="text text_type_main-default text_color_inactive">{currentItem.carbohydrates}</p>
                    </li>
                </ul>
            </div>
        </Modal>
    );
}
