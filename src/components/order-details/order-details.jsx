import React from 'react';
import Modal from "../modal/modal";
import orderIcon from "../../images/orderIcon.png";
import PropTypes from "prop-types";
import IngredientItem from "../ingredient-item/ingredient-item";
import {useSelector} from "react-redux";

IngredientItem.propTypes = {
    handlerClose: PropTypes.func,
    isOpenModal: PropTypes.bool
};

export default function OrderDetails (props)  {

    const order = useSelector(store => store.orderInfo.orderId);

    return (
        <>
            {order !== '' &&
                <Modal handleClose={props.handlerClose} isOpen={props.isOpenModal}>
                    <p className="text text_type_digits-large pt-30 pr-25 pl-25">{order}</p>
                    <p className="text text_type_main-medium pt-8">
                    Идентификатор заказа
                    </p>
                    <img src={orderIcon} alt="Оформить заказ" className="pt-15"/>
                    <p className="text text_type_main-default pt-8">
                    Ваш заказ начали готовить
                    </p>
                    <p className="text text_type_main-default text_color_inactive  pt-2 pb-30">
                    Дождитесь готовности на орбитальной станции
                    </p>
                </Modal>
            }
        </>
    );
}
