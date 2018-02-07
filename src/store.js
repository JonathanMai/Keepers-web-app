import { createStore, combineReducers } from 'redux';
import reducerA from './reducers/reducerA';
import reducerB from './reducers/reducerB';

const store = createStore(combineReducers({reducerA, reducerB}));

export default store;

