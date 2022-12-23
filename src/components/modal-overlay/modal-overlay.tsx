import React from 'react';
import modalOverlayStyle from './modal-overlay.module.css'
import {IModalOverlay} from "../../utils/types";

const ModalOverlay: React.FC<IModalOverlay> = ({ handlerClose }) => {
    return (
        <div className={modalOverlayStyle.modalOverlay} onClick={handlerClose}/>
    )
}

export default ModalOverlay;

