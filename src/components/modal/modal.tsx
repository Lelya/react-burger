import React, {useEffect} from 'react';
import ReactDOM from "react-dom"
import modalStyle from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import {IModal} from "../../utils/types";

const Modal: React.FC<IModal> = ({handlerClose, isOpen = true, children}) => {

    useEffect(() => {
        const onCloseModalPressEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                handlerClose()
            }
        }

        document.addEventListener('keyup', onCloseModalPressEsc)
        return () => {
            document.removeEventListener('keyup', onCloseModalPressEsc)
        }
    }, [handlerClose])

    if (!isOpen) {
        return null;
    }

    const reactModals = document.getElementById("react-modals")!;

    return ReactDOM.createPortal(
        <>
            <ModalOverlay handlerClose={handlerClose}/>
            <div className={modalStyle.modal}>
                <button className={`${modalStyle.button} pt-15 pr-10`} type={"button"} onClick={handlerClose} >
                    <CloseIcon type="primary"/>
                </button>
                {children}
            </div>
        </>,
        reactModals
    );
}

export default Modal;