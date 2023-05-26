import React from "react";


const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => {

    },
    removeItem: (id) => {

    },
    clearCard: () => {
        // removes all the items from the card once an order has been submitted
    }
});

export default CartContext;
