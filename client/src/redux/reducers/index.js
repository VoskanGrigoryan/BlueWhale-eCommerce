import { combineReducers } from 'redux';
import userReducer from './userReducer.js';
import productReducer from './productReducer.js';

export default combineReducers({
    userReducer,
    productReducer,
});
