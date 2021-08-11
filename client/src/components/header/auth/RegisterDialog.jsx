import React, { useState } from 'react';
import { Button, TextField, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import { emailError, passwordError, userNameError } from '../../Alerts';

//REDUX
//-------------------------------------------------------------------/
import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from '../../../redux/actions/user';
//-------------------------------------------------------------------/

const RegisterDialog = ({ handleClose, stepRegister }) => {
    const user = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();
    const history = useHistory();

    const [userData, setUserData] = useState({
        email: '',
        userName: '',
        password: '',
    });
    const { email, userName, password } = userData;

    const handleChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        });
    };

    const validateEmail = (email) => {
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email.match(regexEmail)) {
            return true;
        } else {
            return false;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const emailValidation = validateEmail(email);

        //Email requriements
        if (
            userData.email === '' ||
            userData.email === undefined ||
            emailValidation === false
        ) {
            return emailError();
        }
        //Password requirements
        if (
            userData.password === '' ||
            userData.password === undefined ||
            userData.password.length <= 6
        ) {
            return passwordError();
        }

        if (
            userData.userName === '' ||
            userData.userName === undefined ||
            userData.userName.length <= 3
        ) {
            return userNameError();
        }

        dispatch(registerUser(userData));
        console.log(userData);

        handleClose();
        history.go(0);
    };

    const resetForm = () => {
        setUserData({
            email: '',
            userName: '',
            password: '',
        });
        handleClose();
    };

    return (
        <div className="p-5" style={{ maxWidth: '550px' }}>
            <Typography variant="h4" color="initial">
                Register
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
                value={userName}
                name="userName"
                autoFocus
                margin="dense"
                autoComplete="false"
                id="userName"
                label="Username"
                type="text"
                fullWidth
            />
            <TextField
                onChange={handleChange}
                value={password}
                name="password"
                autoFocus
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
                Register
            </Button>
            <Button
                onClick={resetForm}
                color="primary"
                fullWidth
                variant="contained"
                color="secondary"
            >
                Cancel
            </Button>

            <hr />

            <p className="mt-3 mb-0 text-center">
                If you already have an account click{' '}
                <b onClick={stepRegister} className="pointer">
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

export default RegisterDialog;
