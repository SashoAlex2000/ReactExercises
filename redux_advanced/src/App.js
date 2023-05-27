import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useEffect } from 'react';
import { uiActions } from './store/ui-slice';
import { Fragment } from 'react';
import Notification from './components/UI/Notification';
import { fetchCardData, sendCartData } from './store/cart-actions';

let isInitial = true; // outside of the component, will not be re-evaluated

function App() {
    
    const shouldShowCart = useSelector(state => state.ui.cartIsVisible);
    const cart = useSelector(state => state.cart);
    const notification = useSelector(state => state.ui.notification);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCardData());
    }, [
        dispatch,
    ])


    useEffect(() => { 

        if (isInitial) { // prevent inital PUT request from nulling the DB
            isInitial = false;
            return;
        };

        if (cart.changed) {
            dispatch(sendCartData(cart));
        }

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
