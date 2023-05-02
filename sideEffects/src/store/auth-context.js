//file name is not in PascalCase since we are not storing any components here

import React, { useState, useEffect } from "react";

// just a component wide state
// Object which contains a component
const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogout: () => {}, // dummy function for Itellisence 
    onLogin: (email, password) => {},
});


export const AuthContextProvider = (props) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => { // runs after everything else is rendered, only if dependencies have changed

        const authStorageInfo = localStorage.getItem('isLoggedIn');
    
        if (authStorageInfo === '1') { // creates an infinite loop
          setIsLoggedIn(true);
          console.log('went through use effect')
        }
      }, []) // with an empty array of dependencies it runs once (on refresh)

    const logoutHandler = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
    }

    const loginHandler = () => {
        localStorage.setItem('isLoggedIn', '1');
        setIsLoggedIn(true);
    }

    return <AuthContext.Provider
    value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler, 
    }}>
        {props.children}
    </AuthContext.Provider>
}


export default AuthContext;
