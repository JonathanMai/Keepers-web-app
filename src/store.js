import { createStore, combineReducers } from 'redux';
import reducerA from './reducers/reducerA';
import reducerAccountInfo from './reducers/reducerAccountInfo';
import dashboardInfo from './reducers/dashboardInfo';
import language from './reducers/language';

const store = createStore(combineReducers({
    reducerA: reducerA,
    reducerAccountInfo: reducerAccountInfo,
    dashboardInfo: dashboardInfo,
    lang: language
}),
{},
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;

