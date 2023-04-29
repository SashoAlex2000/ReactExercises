import React from "react";
import Card from "./Card";
import Button from "./Button";
import classes from './ErrorModal.module.css';
import ReactDOM from 'react-dom';

const Backdrop  = props => {
    return <div className={classes.backdrop} onClick={props.onConfirm}></div>
}

const ModalOverlay = props => {
    return (
    <Card className={classes.modal}>
        <header className={classes.header}>
            <h2>{props.title}</h2>
        </header>
        <div className={classes.content}> 
            <p>{props.message}</p>
        </div>
        <footer className={classes.actions}>
            <Button onClick={props.onConfirm}>
                Okay
            </Button>
        </footer>
    </Card>
    );
}


// The modal shouldn't be rendered nested to others
// Logically, it should be above them - direct child of <body> - > Portals
const ErrorModal = (props) => {

    // React DOM brings react to the DOM (browser);
    return (
    <React.Fragment>
        {ReactDOM.createPortal(<Backdrop 
        onConfirm={props.onConfirm} 
        />, 
        document.getElementById('backdrop-root'))
        }
        
        {ReactDOM.createPortal(<ModalOverlay 
        title={props.title} 
        message={props.message}
        onConfirm={props.onConfirm}
        />,
        document.getElementById('overlay-root'))
        }
    </React.Fragment>
    )

};

export default ErrorModal;
