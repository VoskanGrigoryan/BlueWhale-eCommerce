import React, { useEffect } from 'react';
import {
    Paper,
    Typography,
    InputBase,
    IconButton,
    Button,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';

//REDUX
//-------------------------------------------------------------------/
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../redux/actions/products';
//-------------------------------------------------------------------/

import ProdCard from '../../components/ProdCard';

const Store = () => {
    //IF Only user data return state.userReducer from combine reducers
    const products = useSelector((state) => state.productReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts());
    }, []);

    return (
        <div className="min-vh-100 catalog row" style={{ paddingTop: '140px' }}>
            <Paper elevation={5} className="col-4 p-3 row text-center">
                <div className="bg-dark p-1">
                    <Typography variant="h3" color="primary">
                        Catalog
                    </Typography>
                </div>
                <Paper elevation={3} className=" mt-2">
                    <InputBase placeholder="Search products" />
                    <IconButton type="submit">
                        <Search />
                    </IconButton>
                </Paper>
            </Paper>
            <div className="col-12 row mx-0 p-2">
                {products.map((item, index) => {
                    return <ProdCard item={item} />;
                })}
            </div>
        </div>
    );
};

export default Store;
