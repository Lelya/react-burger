import modalOverlayStyle from './modal-overlay.module.css'
import PropTypes from "prop-types";

ModalOverlay.propTypes = {
    handleClose: PropTypes.func
};

export default function ModalOverlay(props) {

    return (
        <div className={modalOverlayStyle.modalOverlay} onClick={props.handleClose}/>
    )
}


