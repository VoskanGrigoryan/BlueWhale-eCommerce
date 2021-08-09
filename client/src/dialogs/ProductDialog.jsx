import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
} from '@material-ui/core';

//REDUX
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct } from '../redux/actions/products';

const LoginDialog = ({ open, handleClose, item }) => {
    const dispatch = useDispatch();

    const deleteProd = () => {
        dispatch(deleteProduct(item.name));
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                <Typography variant="h4" color="initial">
                    {item.name}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    <h5>
                        <b>Description: </b>
                    </h5>
                    {item.description}
                </DialogContentText>
                <DialogContentText>
                    <b>Amount per item</b>:{item.amount}
                </DialogContentText>
                <DialogContentText>
                    <b>Alcohol level per item</b>: {item.alcoholLevel}
                </DialogContentText>
                <DialogContentText>
                    <b>Price</b>: ${item.price}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Edit
                </Button>
                <Button
                    onClick={handleClose}
                    color="primary"
                    onClick={deleteProd}
                >
                    Delete
                </Button>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default LoginDialog;
