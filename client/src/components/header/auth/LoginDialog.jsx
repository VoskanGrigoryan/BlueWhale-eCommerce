import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, TextField, Typography } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { emailError, passwordError, loginError } from '../../Alerts';
//REDUX
//-------------------------------------------------------------------/
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../../../redux/actions/user';
//-------------------------------------------------------------------/

const LoginDialog = ({ handleClose, stepLogin }) => {
    const user = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const history = useHistory();

    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });
    const { email, password } = userData;

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (userData.email === '' || userData.email === undefined) {
            return emailError();
        }
        if (
            userData.password === '' ||
            userData.password === undefined ||
            userData.password.length <= 6
        ) {
            return passwordError();
        }

        dispatch(loginUser(userData));

        if (loginUser) {
            resetForm();
            handleClose();
            // history.go(0);
        }

        console.log(user);

        return loginError();
    };

    const resetForm = () => {
        setUserData({
            email: '',
            password: '',
        });
        handleClose();
    };

    return (
        <div className="p-5" style={{ maxWidth: '550px' }}>
            <Typography variant="h4" color="initial">
                Login
            </Typography>

            <hr />

            <TextField
                onChange={handleChange}
                value={email}
                name="email"
                autoFocus
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                className="mt-4"
            />
            <TextField
                onChange={handleChange}
                value={password}
                name="password"
                margin="dense"
                id="password"
                label="Password"
                type="password"
                fullWidth
                style={{ marginBottom: '25px' }}
            />
            <Button
                onClick={handleSubmit}
                fullWidth
                color="primary"
                variant="contained"
                className="mb-1"
            >
                Login
            </Button>
            <Button
                onClick={handleClose}
                fullWidth
                variant="contained"
                color="secondary"
            >
                Cancel
            </Button>

            <hr />

            <p className="mt-3 mb-0 text-center">
                If you don't have an account yet click{' '}
                <b onClick={stepLogin} className="pointer">
                    here
                </b>
            </p>

            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default LoginDialog;
