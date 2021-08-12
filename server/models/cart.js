import mongoose from 'mongoose';
// import Product from './product.js';

var cartSchema = mongoose.Schema({
    userID: { type: String, required: false },
    active: { type: Boolean, required: false },
    products: [],
    creationDate: { type: String, required: false },
});

const Cart = mongoose.model('carts', cartSchema);

export default Cart;
