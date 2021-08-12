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

//Shopping Cart
const newCartUrl = localhost + '/create-cart';
const getCartsUrl = localhost + '/carts';
const addItemUrl = localhost + '/add-item';
const deleteItemUrl = localhost + '/delete-item';

//------------------------------------------------------------------------------------------------------------------//

//User
export const registerUser = (user) => axios.post(registerUserUrl, user);
export const loginUser = (user) => axios.post(loginUserUrl, user);

//Products
export const createProduct = (product) => axios.post(createProdUrl, product);
export const getProducts = () => axios.get(getProductsUrl);
export const updateProduct = (product) => axios.put(updateProductUrl, product);
export const deleteProduct = (productId) =>
    axios.delete(`${deleteProductUrl}?prodId=${productId}`);

//Shopping Cart
export const newCart = (cart) => axios.post(newCartUrl, cart);
export const getCarts = () => axios.get(getCartsUrl);
//------------------------------------------------------------------------------------//
//DELETE & UPDATE is being done as a POST instead, easier to
//deal since Products to modify/delete are inside an array
//inside an object which makes it needlessly hard to get
//------------------------------------------------------------------------------------//
export const addItem = (cart) => axios.post(addItemUrl, cart);
export const deleteItem = (cart) => axios.post(deleteItemUrl, cart);
