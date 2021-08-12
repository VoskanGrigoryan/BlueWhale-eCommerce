import { combineReducers } from 'redux';
import userReducer from './userReducer.js';
import productReducer from './productReducer.js';
import cartReducer from './cartReducer.js';

export default combineReducers({
    userReducer,
    productReducer,
    cartReducer,
});
