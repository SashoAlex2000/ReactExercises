import React, { useContext } from 'react';

import classes from './Navigation.module.css';
import AuthContext from '../../store/auth-context';

const Navigation = () => {

  // a little more elegant to use this approach
  const ctx = useContext(AuthContext); // pass a pointer to the context, which you wanna use.

  return (
    // <AuthContext.Consumer>
    //   {(ctx) => {
    //     // you get a function with context, in which you return your JSX code
    //     return (
          <nav className={classes.nav}>
          <ul>  
            {ctx.isLoggedIn && (
              <li>
                <a href="/">Users</a>
              </li>
            )}
            {ctx.isLoggedIn && (
              <li>
                <a href="/">Admin</a>
              </li>
            )}
            {ctx.isLoggedIn && (
              <li>
                <button onClick={ctx.onLogout}>Logout</button>
              </li>
            )}
          </ul>
        </nav>
    //     )
    //   }}

    // </AuthContext.Consumer>
  );
};

export default Navigation;
