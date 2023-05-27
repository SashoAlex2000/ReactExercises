import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

const FIREBASE_URL = 'https://react-http-demo-d5f4b-default-rtdb.europe-west1.firebasedatabase.app/';

export const fetchCardData = () => {
    return async (dispatch) => {

        const fetchData = async () => {
            const response = await fetch(FIREBASE_URL + 'cart.json');

            if (!response.ok) {
                throw new Error('Could not fetch the data. Try again later!')
            }

            const data = await response.json();
            
            return data;
        };

        try {
            const cardData = await fetchData();
            dispatch(cartActions.replaceCart({ // without this modification, there is a bug:
                items: cardData.items || [], // when there is not data in firebase, there is an error,
                totalQuantity: cardData.totalQuantity, // since items is undefined
            }));
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'error :(',
                message: 'Cart data has NOT been sent successfully!'
            }));
        }

    }
}

export const sendCartData = (cart) => {

    return async (dispatch) => {

        // put any async code before dispathc, so before reaching the reducer
        dispatch(
            uiActions.showNotification({
                status: 'pending',
                title: 'Sending the data ...',
                message: 'Sending the card data'
            })
        );

        const sendRequest = async () => {
            const response = await fetch(FIREBASE_URL + 'cart.json', {
                method: 'PUT', // PUT request to override the existing data, not add to list
                body: JSON.stringify({
                    items: cart.items,
                    totalQuantity: cart.totalQuantity,
                }), // update the whole cart - problem when starting up
            });

            if (!response.ok) {
                throw new Error('Sendint card data failed :( ');
            };
        };

        try {
            await sendRequest();

            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Cart data has been sent successfully!'
            }));

        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'error :(',
                message: 'Cart data has NOT been sent successfully!'
            }));
        }

    }

};
