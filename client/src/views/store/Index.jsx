import React, { useEffect } from 'react';
import { Paper } from '@material-ui/core';
import { Input } from 'antd';

//REDUX
//-------------------------------------------------------------------/
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../redux/actions/products';
//-------------------------------------------------------------------/

import ProdCard from '../../components/ProdCard';

const { Search } = Input;

const Store = () => {
    //IF Only user data return state.userReducer from combine reducers
    const products = useSelector((state) => state.productReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, []);

    const onSearch = (value) => console.log(value);

    return (
        <div className="min-vh-100 catalog row bg-dark" style={{ paddingTop: '120px' }}>
            <Paper elevation={2} className="col-3 p-3 text-center">
                <h2 className="title mb-1">BlueWhale</h2>
                <Search
                    placeholder="Type the name of the item you're looking for"
                    onSearch={onSearch}
                    enterButton
                />
            </Paper>
            <div className="col-12 row justify-content-between mx-0">
                {products.map((item, index) => {
                    return <ProdCard key={index} item={item} index={index} />;
                })}
            </div>
        </div>
    );
};

export default Store;
