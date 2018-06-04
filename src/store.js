import { createStore, combineReducers } from 'redux';
import reducerA from './reducers/reducerA';
import reducerAccountInfo from './reducers/reducerAccountInfo';
import dashboardInfo from './reducers/dashboardInfo';

const store = createStore(combineReducers({reducerA: reducerA, reducerAccountInfo: reducerAccountInfo, dashboardInfo: dashboardInfo}),
{},
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;

