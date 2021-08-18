import express from 'express';
import { registerUser, loginUser, allUsers } from '../controller/user.js';
import {
    newProduct,
    getProducts,
    updateProduct,
    deleteProduct,
} from '../controller/product.js';
import { newCart, getCarts, addItem, deleteItem } from '../controller/cart.js';
import { createOrder, confirmOrder } from '../controller/order.js';

const router = express.Router();

//User routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', allUsers);

//Product routes
router.post('/product', newProduct);
router.get('/products', getProducts);
router.put('/update-product', updateProduct);
router.delete('/product', deleteProduct);

//Cart routes
router.post('/cart', newCart);
router.get('/carts', getCarts);
router.post('/cart/add-item', addItem);
//Much easier to use SEND with the cart data and find the product to delete
// router.delete('/delete-item', deleteItem);
router.post('/cart/delete-item', deleteItem);

//Order routes
router.post('/order/create-order', createOrder);
router.post('/order/confirm-order', confirmOrder);

export default router;
