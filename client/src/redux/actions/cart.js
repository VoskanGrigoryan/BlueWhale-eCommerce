import * as api from '../api';

export const newCart = (cart) => async (dispatch) => {
    try {
        const { data } = await api.newCart(cart);
        dispatch({ type: 'CREATE_CART', payload: data });
    } catch (error) {
        console.dir(error);
    }
};

export const getCarts = () => async (dispatch) => {
    try {
        const { data } = await api.getCarts();

        dispatch({ type: 'GET_CARTS', payload: data });
    } catch (error) {
        console.dir(error);
    }
};

export const addItem = () => async (dispatch) => {
    try {
        const { data } = await api.addItem();

        dispatch({ type: 'UPDATE_CART', payload: data });
    } catch (error) {
        console.log({ error });
    }
};

export const deleteItem = (cart) => async (dispatch) => {
    try {
        const { data } = await api.deleteItem(cart);

        dispatch({ type: 'DELETE_PRODUCT', payload: data });
    } catch (error) {
        console.log({ error });
    }
};
