import React, { useReducer } from "react";
import CardContext from "./cart-context";


const defaultCartState = {
    items: [],
    totalAmount: 0,
}

const cartReducer = (state, action) => {

    if (action.type === 'ADD') {
        const newTotalAmount = state.totalAmount + (action.item.price * action.item.amount);
        
        const existingItemIndex = state.items.findIndex(
            item => item.id === action.item.id
        );

        const existingCartItem = state.items[existingItemIndex];
        let updatedItems;

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount,
            }
            updatedItems = [...state.items];
            updatedItems[existingItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }
        

        // intial way - generate a new array
        // const updatedItems = state.items.concat(action.item);
        
        return {
            items: updatedItems,
            totalAmount: newTotalAmount,
        }
    }

    if (action.type === 'REMOVE') {

        const existingItemIndex = state.items.findIndex(
            item => item.id === action.id // check just action.id, since just id is dispatched
        )
        const existingCartItem = state.items[existingItemIndex];
        const updatedTotalAmount = state.totalAmount - existingCartItem.price;

        let updatedItems;

        if (existingCartItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.id);
        } else {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount - 1,
            };

            updatedItems = [...state.items];
            updatedItems[existingItemIndex] = updatedItem;

        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount,
        }

    };

    if (action.type === 'REMOVE_ALL') {
        return defaultCartState;
    }

    return defaultCartState;
};

const CartProvider = props => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const clearAllItemsFromCardHandler = () => {
        dispatchCartAction({
            type: 'REMOVE_ALL',
        })
    }

    const addItemToCartHandler = (item) => {
        dispatchCartAction({
            type: 'ADD',
            item: item,
        });
    };

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({
            type: 'REMOVE',
            id: id,
        });
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCard: clearAllItemsFromCardHandler,
    }

    return <CardContext.Provider value={cartContext}>
        {props.children}
    </CardContext.Provider>

}

export default CartProvider;
