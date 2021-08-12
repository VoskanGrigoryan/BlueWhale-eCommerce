import { combineReducers } from 'redux';
import userReducer from './userReducer.js';
import productReducer from './productReducer.js';
import cartReducer from './cartReducer.js';
import orderReducer from './orderReducer.js';

export default combineReducers({
    userReducer,
    productReducer,
    cartReducer,
    orderReducer,
});
