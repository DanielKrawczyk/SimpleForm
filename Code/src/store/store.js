import { combineReducers, createStore } from 'redux';
import data from './data';
import info from './info';

const connect = combineReducers({
    data,
    info
})

const store = createStore(connect);

export default store;