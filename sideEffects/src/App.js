import React, { useState, useEffect, useContext } from 'react';

import Login from './components/Login/LoginWithInput';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';



function OLDApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => { // runs after everything else is rendered, only if dependencies have changed

    const authStorageInfo = localStorage.getItem('isLoggedIn');

    if (authStorageInfo === '1') { // creates an infinite loop
      setIsLoggedIn(true);
      console.log('went through use effect')
    }
  }, []) // with an empty array of dependencies it runs once (on refresh)

  const loginHandler = (email, password) => {
    
    localStorage.setItem('isLoggedIn', '1');

    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    
      <AuthContext.Provider value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
      }}> {/* wrap the context around all that will need it */}
        <MainHeader/>
        <main>
          {!isLoggedIn && <Login onLogin={loginHandler} />}
          {isLoggedIn && <Home onLogout={logoutHandler} />}
        </main>
      </AuthContext.Provider>
    
  );
}

function App () {

  const ctx = useContext(AuthContext);

  return (
  // in this way, App is wrapped with a Auth Context Provider, and properties / functions, which 
  // are needed here or down the chain, are received through AuthContext;
  // NOT optimized for frequent state changes
  <React.Fragment>
    <MainHeader/>
        <main>
          {!ctx.isLoggedIn && <Login />}
          {ctx.isLoggedIn && <Home />}
        </main>
  </React.Fragment>
  );

  
}

export default App;
