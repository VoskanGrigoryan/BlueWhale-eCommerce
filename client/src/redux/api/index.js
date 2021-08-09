import axios from 'axios';

//User
const registerUserUrl = 'http://localhost:4000/register';
const loginUserUrl = 'http://localhost:4000/login';

//Products
const createProdUrl = 'http://localhost:4000/new-product';
const getProductsUrl = 'http://localhost:4000/get-products';
const updateProductUrl = 'http://localhost:4000/update-product';
const deleteProductUrl = 'http://localhost:4000/delete-product';

//------------------------------------------------------------------------------------------------------------------//

//User
export const registerUser = (user) => axios.post(registerUserUrl, user);
export const loginUser = (user) => axios.post(loginUserUrl, user);

//products
export const createProduct = (product) => axios.post(createProdUrl, product);
export const getProducts = () => axios.get(getProductsUrl);
export const updateProduct = (product) => axios.put(updateProductUrl, product);
export const deleteProduct = (product) => axios.put(deleteProductUrl, product);
