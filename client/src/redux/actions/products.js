import * as api from '../api';

export const createProduct = (product) => async (dispatch) => {
    try {
        const { data } = await api.createProduct(product);
        dispatch({ type: 'CREATE_PRODUCT', payload: data });
    } catch (error) {
        console.dir(error);
    }
};

export const getProducts = () => async (dispatch) => {
    try {
        const { data } = await api.getProducts();

        dispatch({ type: 'GET_PRODUCTS', payload: data });
    } catch (error) {
        console.dir(error);
    }
};

export const updateProduct = () => async (dispatch) => {
    try {
        const { data } = await api.updateProduct();

        dispatch({ type: 'UPDATE_PRODUCT', payload: data });
    } catch (error) {
        console.log({ error });
    }
};

export const deleteProduct = (productId) => async (dispatch) => {
    try {
        const { data } = await api.deleteProduct(productId);

        dispatch({ type: 'DELETE_PRODUCT', payload: data });
    } catch (error) {
        console.log({ error });
    }
};
