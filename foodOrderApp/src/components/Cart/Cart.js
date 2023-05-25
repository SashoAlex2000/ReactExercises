import React, { useContext, useState } from "react";
import classes from './Cart.module.css';
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from './CartItem';
import Checkout from "./Checkout";

const Cart = (props) => {

    const [shouldShowCheckout, setShouldShowCheckout] = useState();
    const cartCTX = useContext(CartContext); 

    const totalAmount = `$${cartCTX.totalAmount.toFixed(2)}`;
    const hasItems = cartCTX.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartCTX.removeItem(id);
    };

    const cartItemAddHandler = (item) => {
        cartCTX.addItem({
            ...item,
            amount: 1,
        })
    };

    const DUMMY_ARRAY = [{
        id: 'm1',
        name: 'Banitsa',
        description: 'Perfect breakfast',
        price: 2.99,
    }]

    const cartItems = <ul className={classes['cart-items']}>{
        cartCTX.items.map((item) => <CartItem 
        key={item.id}
        name={item.name}
        amount={item.amount}
        price={item.price}
        onRemove={cartItemRemoveHandler.bind(null, item.id)} // bind preconfigures the function for execution
        onAdd={cartItemAddHandler.bind(null, item)}          // added here to ensure the child component 
        />)                                                  // calls it with correct data   
    }</ul>;

    const orderHandler = () => {
        setShouldShowCheckout(true);
    };

    const cancelOrderHandler = () => {
        setShouldShowCheckout(false);
    }

    return <Modal onClose={props.onCloseCart}>
        {cartItems}
        <div className={classes['total']}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {shouldShowCheckout && <Checkout onCancel={cancelOrderHandler} />}
        <div className={classes['actions']}>
            
            {!shouldShowCheckout && <button className={classes['button--alt']} onClick={props.onCloseCart}>Close</button>}
            {hasItems && !shouldShowCheckout && <button className={classes.button} onClick={orderHandler}>Order</button>}
        </div>
    </Modal>
}

export default Cart;
