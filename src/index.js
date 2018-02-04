import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RoutersList from './components/RoutersList';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<RoutersList />, document.getElementById('root'));
registerServiceWorker();
