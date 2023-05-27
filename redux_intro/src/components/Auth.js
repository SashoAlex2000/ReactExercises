import { useDispatch, useSelector } from 'react-redux';
import classes from './Auth.module.css';
import UserProfile from './UserProfile';
import { authActions } from '../store';
import { Fragment } from 'react';

const Auth = () => {

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    const loginUser = (event) => {
        event.preventDefault();
        dispatch(authActions.login());
    }

    let toRender = (
        <main className={classes.auth}>
            <section>
                <form>
                    <div className={classes.control}>
                        <label htmlFor='email'>Email</label>
                        <input type='email' id='email' />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' />
                    </div>
                    <button onClick={loginUser}>Login</button>
                </form>
            </section>
        </main>
    );

    if (isAuthenticated) {
        toRender = <UserProfile/>
    }
    
    return (
        <Fragment>
            {toRender}
        </Fragment>
            
    );
};

export default Auth;
