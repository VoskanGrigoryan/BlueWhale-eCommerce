import * as api from '../api';

export const createOrder = (order) => async (dispatch) => {
    try {
        const { data } = await api.createOrder(order);
        dispatch({ type: 'CREATE_ORDER', payload: data });
    } catch (error) {
        console.dir(error);
    }
};
