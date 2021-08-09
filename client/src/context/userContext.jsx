import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from '../redux/actions/user';

export const UserContext = React.createContext();

const UserProvider = (props) => {
    const dispatch = useDispatch();
    const [valor, setValor] = useState('hola');

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    return (
        <UserContext.Provider value={{ valor, setValor }}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserProvider;
