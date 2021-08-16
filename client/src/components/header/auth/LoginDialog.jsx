import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { emailError, passwordError, loginError } from '../../Alerts';
import { Input, Button } from 'antd';

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
        <div
            style={{
                maxWidth: '400px',
                marginLeft: 30,
                marginRight: 30,
                marginTop: 30,
                marginBottom: 20,
            }}
        >
            <div className="text-center">
                <h3 className="mb-4">Login</h3>
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

            <label>Password</label>
            <Input
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

            <div className="row mx-0">
                <div className="col-6" style={{ paddingLeft: '0px' }}>
                    <Button
                        variant="contained"
                        type="primary"
                        className="w-100"
                        onClick={handleSubmit}
                    >
                        Login
                    </Button>
                </div>
                <div className="col-6" style={{ padding: 0 }}>
                    <Button
                        variant="contained"
                        type="submit"
                        className="w-100"
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                </div>
            </div>

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
