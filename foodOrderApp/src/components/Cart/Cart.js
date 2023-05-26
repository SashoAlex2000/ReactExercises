import React, { useContext, useState } from "react";
import classes from './Cart.module.css';
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from './CartItem';
import Checkout from "./Checkout";

const Cart = (props) => {

    const [shouldShowCheckout, setShouldShowCheckout] = useState();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [cartHasBeenSubmitted, setCartHasBeenSubmitted] = useState(false);
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
    }];

    const submitOrder = async (userData) => {
        setIsSubmitting(true);
        await fetch('https://react-http-demo-d5f4b-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCTX.items,
            })
        });

        setIsSubmitting(false);
        setCartHasBeenSubmitted(true);
        cartCTX.clearCard();
    }

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
    };

    const cartModalContent = (
        <React.Fragment>
            {cartItems}
            <div className={classes['total']}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {shouldShowCheckout && <Checkout onConfirm={submitOrder} onCancel={props.onCloseCart} />}
            <div className={classes['actions']}>

                {!shouldShowCheckout && <button className={classes['button--alt']} onClick={props.onCloseCart}>Close</button>}
                {hasItems && !shouldShowCheckout && <button className={classes.button} onClick={orderHandler}>Order</button>}
            </div>
        </React.Fragment>
    );
    
    const submittingModalContent = <p>Sending your order!</p>;

    const orderSubmittedSuccess = <p>Your order has been submitted!</p>

    return <Modal onClose={props.onCloseCart}>
        {!isSubmitting && !cartHasBeenSubmitted && cartModalContent}
        {isSubmitting && submittingModalContent}
        {cartHasBeenSubmitted && orderSubmittedSuccess}
    </Modal>
}

export default Cart;
