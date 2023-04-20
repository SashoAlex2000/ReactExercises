// this is the entrypoint to the HTML, this is the file that is executed
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';

// App will be the entrypoint for other components; component tree
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
