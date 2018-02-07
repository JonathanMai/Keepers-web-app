import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RoutersList from './components/RoutersList';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

const reducerA = (state = {showModal: false}, action) => {
    switch(action.type) {
        case "SET_SHOW_MODAL":
            return {
                ...state, showModal: action.value
            };
        default: 
            return state;
    }
};

const reducerB = (state = {}, action) => {
    return state;
};

const store = createStore(combineReducers({reducerA, reducerB}));

ReactDOM.render(
    <Provider store={store}>
        <RoutersList />
    </Provider>,
    document.getElementById('root'));
registerServiceWorker();
