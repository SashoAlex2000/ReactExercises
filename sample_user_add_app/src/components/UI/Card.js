import React from "react";

// has to be imported in this way to work, if it is not regular CSS
import classes from './Card.module.css'; 

const Card = (props) => {
    
    // put the className coming from props into the div's className, to make it work
    // since this is a custom component
    return <div className={`${classes.card} ${props.className}`}> 
        {props.children}
    </div>

};

export default Card;
