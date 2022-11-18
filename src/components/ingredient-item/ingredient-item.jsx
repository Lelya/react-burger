import React, {useState} from 'react';
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientItemStyle from './ingredient-item.module.css';
import PropTypes from "prop-types";
import IngredientDetails from "../ingredient-details/ingredient-details";

IngredientItem.propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
};

export default function IngredientItem (props)  {

    const [isOpenModal, setIsOpenModal] = useState(false);

    return (
        <>
            <li className={`${ingredientItemStyle.wrapper} mb-8`} key={props._id}
                onClick={() => {
                    setIsOpenModal(true);
                }}
            >
                <div className={ingredientItemStyle.counter}><Counter count={1} size="default"/></div>
                <img className={`mb-4`} src={props.image}  alt={props.image}/>
                <p className={`${ingredientItemStyle.price} mb-4 text text_type_digits-default`}><span>{props.price}</span> <CurrencyIcon type="primary" /></p>
                <p className={`text text_type_main-default`}>{props.name}</p>
            </li>
            {isOpenModal &&
                <IngredientDetails handlerClose={() => setIsOpenModal(false)} isOpenModal={isOpenModal} data={props} />
            }
        </>
    )
}