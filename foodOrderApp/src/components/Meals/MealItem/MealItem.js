import React from "react";
import classes from './MealItem.module.css';

const MealItem = (props) => {

    const itemPrice = `$${props.price.toFixed(2)}`;

    return <li className={classes.meal}>
        <div>
            <h3>{props.name}</h3>
            <div className={classes.description}>{props.description}</div>
            <div className={classes.price}>{itemPrice}</div>
        </div>
        <div></div>
    </li>
}

export default MealItem;
