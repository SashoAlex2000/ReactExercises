import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import store from './store';



const root = ReactDOM.createRoot(document.getElementById('root'));
// wrap the app with the Provider from react-redux, similiart to React Context previously
// the Provider could be wrapped around lower level components, depending on store usage
root.render(<Provider store={store}> adsads
    <App />
</Provider>);
