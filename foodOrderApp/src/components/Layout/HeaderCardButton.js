import React, { useContext, useEffect, useState } from "react";


import classes from './HeaderCardButton.module.css';
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCardButton = props => {

    const [buttonHighlighted, setButtonHighlighted] = useState(false);

    // the headerCardButton will be reevaluated by React each time the 
    // context changes
    const cartCtx = useContext(CartContext);

    // reduce transform an array into a single item
    const numberOfItems = cartCtx.items.reduce((currentNumber, // currNumber is the default value initially(0), 
        item) => {                                              // then it is whatever you return  
        return currentNumber + item.amount;
    }, 0) // 0 is the initial value

    const { items } = cartCtx;

    const buttonClasses = `${classes.button} ${buttonHighlighted ? classes.bump : ''}`;

    useEffect(() => {
        if (items.length === 0) {
            return;
        };
        setButtonHighlighted(true);
        const timer = setTimeout(() => {
            setButtonHighlighted(false);
        }, 300);

        // always a good idea to clear out timers and side effects
        return () => {
            clearTimeout(timer);
        }

    }, [
        items,
    ]);

    return <button className={buttonClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon />
        </span>
        <span>Your Cart</span>
        {/* <span className={classes.badge}>{(Math.random() * 10).toFixed(0)}</span> */}
        <span className={classes.badge}>{numberOfItems}</span>
    </button>
};

export default HeaderCardButton;
