import mongoose from 'mongoose';
// import Product from './product.js';

const cartSchema = mongoose.Schema({
    ObjectId: { type: String, required: true },
    userID: { type: String, required: false },
    active: { type: Boolean, required: false },
    products: [],
    creationDate: { type: String, required: false },
});

const Cart = mongoose.model('carts', cartSchema);

export default Cart;
