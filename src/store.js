import { createStore, combineReducers } from 'redux';
import Modal from './reducers/Modal';
import AccountInfo from './reducers/AccountInfo';
import DashboardInfo from './reducers/DashboardInfo';
import DisplayLanguage from './reducers/DisplayLanguage';

// Create global store for redux
const store = createStore(combineReducers({
    Modal: Modal,
    AccountInfo: AccountInfo,
    DashboardInfo: DashboardInfo,
    DisplayLanguage: DisplayLanguage
}),
{},
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;

