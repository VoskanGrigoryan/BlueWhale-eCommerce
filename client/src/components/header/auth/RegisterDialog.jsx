import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { emailError, passwordError, userNameError } from '../../Alerts';
import { Input, Button } from 'antd';

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
        <div
            style={{
                maxWidth: '550px',
                marginLeft: 30,
                marginRight: 30,
                marginTop: 30,
                marginBottom: 20,
            }}
        >
            <div className="text-center">
                <h3 className="mb-4">Register</h3>
            </div>

            <label>Email</label>
            <Input
                onChange={handleChange}
                value={email}
                name="email"
                autoFocus
                id="email"
                label="Email Address"
                type="email"
                fullWidth
            />

            <label>Username</label>
            <Input
                onChange={handleChange}
                value={userName}
                name="userName"
                autoFocus
                autoComplete="false"
                id="userName"
                label="Username"
                type="text"
                fullWidth
            />

            <label>Password</label>
            <Input
                onChange={handleChange}
                value={email}
                name="email"
                autoFocus
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                fullWidth
                style={{ marginBottom: '25px' }}
            />

            <div className="row">
                <div className="col-6" style={{ paddingLeft: '0px' }}>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        type="primary"
                        className="w-100"
                    >
                        Register
                    </Button>
                </div>
                <div className="col-6" style={{ paddingRight: '0px' }}>
                    <Button
                        onClick={resetForm}
                        variant="contained"
                        type="submit"
                        className="w-100"
                    >
                        Cancel
                    </Button>
                </div>
            </div>

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
