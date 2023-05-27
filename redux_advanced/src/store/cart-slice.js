import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        changed: false,
    },
    reducers: {
        replaceCart (state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;

        },
        addItemFromCart(state, action) {

            const currItem = action.payload;
            const existingItem = state.items.find(item => item.id === currItem.id);
            state.totalQuantity++;
            state.changed = true; // to not mess up re-rendering when initlly loading data

            if (!existingItem) {
                state.items.push({
                    id: currItem.id,
                    price: currItem.price,
                    quantity: currItem.quantity,
                    totalPrice: Number(currItem.price),
                    title: currItem.title,

                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice += Number(currItem.price);
            }

        },
        removeItemFromCart(state, action) {

            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            state.totalQuantity--;
            state.changed = true

            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice -= Number(existingItem.price);
            }

        },
    }
});

export const cartActions = cartSlice.actions;
;
export default cartSlice;
