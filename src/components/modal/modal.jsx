import React, {useEffect} from 'react';
import ReactDOM from "react-dom"
import modalStyle from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from "prop-types";

Modal.propTypes = {
    handlerClose: PropTypes.func,
    isOpen: PropTypes.bool,
    children: PropTypes.any
};
export default function Modal ({handleClose, isOpen, children})  {

    useEffect(() => {
        const onCloseModalPressEsc = (e) => {
            if (e.key === 'Escape') {
                handleClose()
            }
        }

        document.addEventListener('keyup', onCloseModalPressEsc)
        return () => {
            document.removeEventListener('keyup', onCloseModalPressEsc)
        }
    }, [handleClose])

    if (!isOpen) {
        return null;
    }

    return ReactDOM.createPortal(
        <>
            <ModalOverlay handleClose={handleClose}/>
            <div className={modalStyle.modal}>
                <button className={`${modalStyle.button} pt-15 pr-10`} type={"button"} onClick={handleClose} >
                    <CloseIcon type="primary"/>
                </button>
                {children}
            </div>
        </>,
        document.getElementById("react-modals")
    );
}
