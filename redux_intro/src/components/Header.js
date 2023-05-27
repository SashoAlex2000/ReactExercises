import classes from './Header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import UserProfile from './UserProfile';
import { authActions } from '../store';
import { Fragment } from 'react';

const Header = () => {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    const logoutUser = () => {
        dispatch(authActions.logout());
    };

    let linksToRender = isAuthenticated ? (
        <ul>
            <li>
                <a href='/'>My Products</a>
            </li>
            <li>
                <a href='/'>My Sales</a>
            </li>
            <li>
                <button onClick={logoutUser}>Logout</button>
            </li>
        </ul>
    ) : '';

    return (
        <header className={classes.header}>
            <h1>Redux Auth</h1>
            <nav>
                {linksToRender}
            </nav>
        </header>
    );
};

export default Header;
