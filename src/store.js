import { createStore, combineReducers } from 'redux';
import reducerA from './reducers/reducerA';
import reducerAccountInfo from './reducers/reducerAccountInfo';

const store = createStore(combineReducers({reducerA: reducerA, reducerAccountInfo: reducerAccountInfo}));

export default store;

