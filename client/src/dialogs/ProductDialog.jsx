import React, { useState } from 'react';
import { Modal, Button, Menu, Dropdown } from 'antd';

//REDUX
import { useSelector, useDispatch } from 'react-redux';
import { deleteProduct } from '../redux/actions/products';

const LoginDialog = ({ open, handleClose, item }) => {
    const dispatch = useDispatch();

    const deleteProd = () => {
        dispatch(deleteProduct(item.name));
    };

    const handleOk = () => {
        console.log('OK');
    };

    const menu = (
        <Menu>
            <Menu.Item>Edit</Menu.Item>
            <Menu.Item>Delete</Menu.Item>
        </Menu>
    );

    return (
        <Modal
            title="Product details"
            visible={open}
            onCancel={handleClose}
            footer={[
                <Button key="back" onClick={handleClose}>
                    Close
                </Button>,

                <Button style={{ marginRight: 10 }} key="submit" type="primary">
                    Add to cart
                </Button>,
                <Dropdown overlay={menu} disabled placement="bottomCenter">
                    <Button>Admin</Button>
                </Dropdown>,
            ]}
        >
            <div className="row">
                <div className="col-5">
                    <h6>
                        Item: <b>{item.name}</b>
                    </h6>
                    <h6>
                        Description: <b>{item.description}</b>
                    </h6>
                    <h6>
                        Item quantity: <b>{item.amount}</b>
                    </h6>
                    <h6>
                        Alcohol level: <b>{item.alcoholLevel}</b>
                    </h6>
                    <h6>
                        Price: <b>${item.price}</b>
                    </h6>
                </div>
                <div className="col-6">
                    <img
                        alt="example"
                        src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                    />
                </div>
            </div>
        </Modal>
    );
};

export default LoginDialog;
