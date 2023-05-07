import React from "react";
import classes from './Modal.module.css';
import ReactDOM from "react-dom";

// using props to pass down properties here is the correct choice, since
// using context would make it too specific, and thus not reusable
const Backdrop = props => {
    return <div className={classes.backdrop} onClick={props.onClose}></div>
};

const ModalOverlay = props => {
    return <div className={classes.modal}>
        <div className={classes.content}>
            {props.children}
        </div>
    </div>
};

const portalPlace = document.getElementById('overlays');

const Modal = (props) => {

    return <React.Fragment>
        {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, 
        portalPlace)}
        {ReactDOM.createPortal(<ModalOverlay>
            {props.children}
        </ModalOverlay>, 
        portalPlace)}
    </React.Fragment>

}

export default Modal;
