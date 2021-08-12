import express from 'express';
import { registerUser, loginUser, allUsers } from '../controller/user.js';
import {
    newProduct,
    getProducts,
    updateProduct,
    deleteProduct,
} from '../controller/product.js';
import { newCart, getCarts, addItem, deleteItem } from '../controller/cart.js';

const router = express.Router();

//User routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', allUsers);

//Product routes
router.post('/new-product', newProduct);
router.get('/get-products', getProducts);
router.put('/update-product', updateProduct);
router.delete('/delete-product', deleteProduct);

//Cart routes
router.post('/create-cart', newCart);
router.get('/carts', getCarts);
router.post('/add-item', addItem);
//Much easier to use SEND with the cart data and find the product to delete
router.post('/delete-item', deleteItem);

export default router;
