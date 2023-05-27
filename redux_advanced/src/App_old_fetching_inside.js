import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useEffect } from 'react';
import { uiActions } from './store/ui-slice';
import { Fragment } from 'react';
import Notification from './components/UI/Notification';

const FIREBASE_URL = 'https://react-http-demo-d5f4b-default-rtdb.europe-west1.firebasedatabase.app/';
let isInitial = true; // outside of the component, will not be re-evaluated

function App() {
    
    const shouldShowCart = useSelector(state => state.ui.cartIsVisible);
    const cart = useSelector(state => state.cart);
    const notification = useSelector(state => state.ui.notification);
    const dispatch = useDispatch();

    // useEffect will be used to montiro for changes in the state
    // and send HTTP requests when necessary
    useEffect(() => { // initial execution will delete all data

        const sendCardData = async () => {
            dispatch(uiActions.showNotification({
                status: 'pending',
                title: 'Sending the data ...',
                message: 'Sending the card data'
            }));
            const response = await fetch(FIREBASE_URL + 'cart.json', {
                method: 'PUT', // PUT request to override the existing data, not add to list
                body: JSON.stringify(cart), // update the whole cart - problem when starting up
            });

            if (!response.ok) {
                throw new Error('Sendint card data failed :( ');
            }

            const resposeData = await response.json();

            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Cart data has been sent successfully!'
            }));

        }

        if (isInitial) { // prevent inital PUT request from nulling the DB
            isInitial = false;
            return;
        }

        sendCardData().catch(error => {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'error :(',
                message: 'Cart data has NOT been sent successfully!'
            }));
        })


    }, [
        cart,
        dispatch,
    ]);

    return (
        <Fragment>
            {notification && <Notification 
                status={notification.status}
                title={notification.title}
                message={notification.message}
            />}
            <Layout>
                {shouldShowCart && <Cart />}
                <Products />
            </Layout>
        </Fragment>
    );
}

export default App;
