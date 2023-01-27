import React from 'react';
import Modal from "../modal/modal";
import {IModalError} from "../../utils/types";

const ErrorModal: React.FC<IModalError> = ({handlerClose, isOpenModal = false, error}) => {
    return (
        <Modal handlerClose={handlerClose} isOpen={isOpenModal}>
            <p className="text text_type_main-medium p-15" style={{textAlign:"center"}}>{error}</p>
        </Modal>
    );
}

export default ErrorModal;
