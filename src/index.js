import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

// Render the main component into the root element
ReactDOM.render(
    <App />,
    document.getElementById('root'));
registerServiceWorker();