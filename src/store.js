import { createStore, combineReducers } from 'redux';
import reducerA from './reducers/reducerA';
import reducerAccountInfo from './reducers/reducerAccountInfo';
import dashboardInfo from './reducers/dashboardInfo';

const store = createStore(combineReducers({reducerA: reducerA, reducerAccountInfo: reducerAccountInfo, dashboardInfo: dashboardInfo}));

export default store;

