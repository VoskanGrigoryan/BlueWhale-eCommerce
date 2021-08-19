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
        <div className="min-vh-100 catalog row" style={{ paddingTop: '120px' }}>
            <div className="col-3 text-center">
                <Search
                    placeholder="Search by product name"
                    onSearch={onSearch}
                    enterButton
                />
            </div>
            <div className="col-12 row justify-content-between mx-0">
                {products.map((item, index) => {
                    return <ProdCard key={index} item={item} index={index} />;
                })}
            </div>
        </div>
    );
};

export default Store;
