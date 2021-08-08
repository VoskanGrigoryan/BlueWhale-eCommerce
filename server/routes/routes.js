import express from 'express';
import { registerUser, loginUser, test1 } from '../controller/user.js';
import {
    newProduct,
    getProducts,
    updateProduct,
    deleteProduct,
} from '../controller/product.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/test', test1);

//Product routes
router.post('/new-product', newProduct);
router.get('/get-products', getProducts);
router.put('/update-product', updateProduct);
router.delete('/delete-product', deleteProduct);

export default router;
