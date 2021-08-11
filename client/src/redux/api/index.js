import axios from 'axios';

const localhost = 'http://localhost:4000';

//User
const registerUserUrl = localhost + '/register';
const loginUserUrl = localhost + '/login';

//Products
const createProdUrl = localhost + '/new-product';
const getProductsUrl = localhost + '/get-products';
const updateProductUrl = localhost + '/update-product';
const deleteProductUrl = localhost + '/delete-product';

//------------------------------------------------------------------------------------------------------------------//

//User
export const registerUser = (user) => axios.post(registerUserUrl, user);
export const loginUser = (user) => axios.post(loginUserUrl, user);

//products
export const createProduct = (product) => axios.post(createProdUrl, product);
export const getProducts = () => axios.get(getProductsUrl);
export const updateProduct = (product) => axios.put(updateProductUrl, product);
export const deleteProduct = (product) =>
    axios.delete(deleteProductUrl, product);
