import * as api from '../api';

export const registerUser = (user) => async (dispatch) => {
    try {
        const { data } = await api.registerUser(user);
        dispatch({ type: 'REGISTER_USER', payload: data });
    } catch (error) {
        console.dir(error);
        console.log(error);
    }
};

export const loginUser = (user) => async (dispatch) => {
    try {
        const { data } = await api.loginUser(user);
        console.log(data);

        dispatch({ type: 'LOGIN_USER', payload: data });
    } catch (error) {
        console.log('Error finding a user: ', error.message);
    }
};
