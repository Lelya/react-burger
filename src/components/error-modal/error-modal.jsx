import React from 'react';
import Modal from "../modal/modal";
import PropTypes from "prop-types";

ErrorModal.propTypes = {
    handlerClose: PropTypes.func,
    isOpenModal: PropTypes.bool,
    error: PropTypes.string
};

export default function ErrorModal (props)  {
    return (
        <Modal handleClose={props.handlerClose} isOpen={props.isOpenModal}>
            <p className="text text_type_main-medium p-15" style={{textAlign:"center"}}>{props.error}</p>
        </Modal>
    );
}
