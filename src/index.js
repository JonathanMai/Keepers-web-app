import React from 'react';
import ReactDOM from 'react-dom';
import RoutersList from './components/RoutersList';
import store from './store';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Provider store={store}>
        <RoutersList />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();